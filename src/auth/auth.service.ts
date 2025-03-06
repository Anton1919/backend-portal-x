import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { UserService } from '../user/user.service'
import { AuthMethod, User } from '../../prisma/__generated__'
import { Request } from 'express'

const emailIsAlreadyExistMessage =
  'Пользователь с таким email уже есть. Пожалуйста, используйте другой email или войдите в систему'

const serverErrorExceptionMessage =
  'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии'

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async register(req: Request, dto: RegisterDto) {
    const isAlreadyExists = await this.userService.findByEmail(dto.email)

    if (isAlreadyExists) {
      throw new ConflictException(emailIsAlreadyExistMessage)
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      '',
      AuthMethod.CREDENTIALS,
      false,
    )

    return this.saveSession(req, newUser)
  }

  public async login() {}

  public async logout() {}

  // для redis
  private async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      // обрати внимание что session.userid доступен благодаря файлу express.session
      req.session.userId = user.id

      req.session.save((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(serverErrorExceptionMessage),
          )
        }

        resolve({ user })
      })
    })
  }
}

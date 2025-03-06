import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { UserService } from '../user/user.service'
import { AuthMethod, User } from '../../prisma/__generated__'
import { Request, Response } from 'express'
import { LoginDto } from './dto/login.dto'
import { verify } from 'argon2'
import { ConfigService } from '@nestjs/config'
import {
  EMAIL_EXISTS_MESSAGE,
  LOGIN_NOT_FOUND_MESSAGE,
  LOGIN_INVALID_PASSWORD_MESSAGE,
  LOGOUT_FAILED_MESSAGE,
  SESSION_SAVE_MESSAGE,
} from './consts/auth.errors'

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService, // он позволит нам, как минимум, брать данные из файла .env
  ) {}

  public async register(req: Request, dto: RegisterDto) {
    const isAlreadyExists = await this.userService.findByEmail(dto.email)

    if (isAlreadyExists) {
      throw new ConflictException(EMAIL_EXISTS_MESSAGE)
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

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email)

    // проверка !user.password нужна в случае если пользователь авторизовался через соц сети
    if (!user || !user.password) {
      throw new NotFoundException(LOGIN_NOT_FOUND_MESSAGE)
    }

    const isValidPassword = await verify(user.password, dto.password) // пароли из базы данных, и из параметров

    if (!isValidPassword) {
      throw new UnauthorizedException(LOGIN_INVALID_PASSWORD_MESSAGE)
    }

    return this.saveSession(req, user)
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException(LOGOUT_FAILED_MESSAGE))
        }
        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))
        resolve()
      })
    })
  }

  // для redis
  private async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      // обрати внимание что session.userid доступен благодаря файлу express.session
      req.session.userId = user.id

      req.session.save((err) => {
        if (err) {
          return reject(new InternalServerErrorException(SESSION_SAVE_MESSAGE))
        }

        resolve({ user })
      })
    })
  }
}

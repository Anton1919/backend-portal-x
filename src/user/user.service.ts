import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AuthMethod } from '../../prisma/__generated__'
import { hash } from 'argon2'

const userNotFoundMessage =
  'Пользователь не найден. Пожалуйста, проверьте введенные данные'

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    // this.prismaService.user - это таблица из нашей схемы
    // findUnique - метод Prisma для поиска одной записи
    const user = await this.prismaService.user.findUnique({
      // where = условия поиска (фильтрация)
      where: {
        id,
      },
      include: {
        accounts: true, // accounts: true значит "загрузи также все связанные аккаунты этого пользователя"
      },
    })

    if (!user) {
      throw new NotFoundException(userNotFoundMessage) // 404 ошибка
    }

    return user
  }

  public async findByEmail(email: string) {
    const user = this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    })

    return user
  }

  public async create(
    email: string,
    password: string,
    displayName: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean,
  ) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        displayName,
        picture,
        method,
        isVerified,
      },
      include: {
        accounts: true,
      },
    })

    return user
  }
}

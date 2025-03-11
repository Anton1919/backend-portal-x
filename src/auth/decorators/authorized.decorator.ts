import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '../../../prisma/__generated__'

// ExecutionContext - это обертка, которая может содержать разные типы запросов:
// HTTP запросы
// WebSocket сообщения
// gRPC вызовы
export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() // это способ получить объект HTTP запроса в NestJS
    // Теперь у нас есть доступ к:
    // request.headers     // заголовки
    // request.body       // тело запроса
    // request.query      // query параметры
    // request.params     // route параметры
    // request.user       // информация о пользователе
    // request.session    // сессия
    const user = request.user

    // Если data указана - вернуть конкретное поле, напрмер id
    // Если нет - вернуть весь объект user
    return data ? user[data] : user
  },
)

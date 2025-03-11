import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { UserRole } from '../../../prisma/__generated__'
import { NOT_ENOUGH_RIGHTS_MESSAGE } from '../consts/auth.errors'

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(), // получим метаданные от метода контроллера
      context.getClass(), // получим метаданные от класса контроллера
    ])
    const request = context.switchToHttp().getRequest()

    if (!roles) return true

    if (!roles.includes(request.user.role)) {
      throw new ForbiddenException(NOT_ENOUGH_RIGHTS_MESSAGE)
    }

    return true
  }
}

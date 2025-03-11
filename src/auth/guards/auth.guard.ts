import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { UNAUTHORIZED_ERROR_MESSAGE } from '../consts/auth.errors'

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // ExecutionContext подробно описан в auth.decorator.ts
    const request = context.switchToHttp().getRequest()

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException(UNAUTHORIZED_ERROR_MESSAGE)
    }

    const user = await this.userService.findById(request.session.userId)

    request.user = user

    return true
  }
}

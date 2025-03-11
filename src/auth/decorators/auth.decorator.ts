import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from './roles.decorator'
import { UserRole } from '../../../prisma/__generated__'

// этот декоратор будет объединять функциональность двух Guard - AuthGuard, RolesGuard
// если будут переданы роли, то будет добавляться RolesGuard иначе будем возвращать AuthGuard для проверки
export function Authorization(...roles: UserRole[]) {
  if (roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
  }

  return applyDecorators(UseGuards(AuthGuard))
}

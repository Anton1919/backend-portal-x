import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.types';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  getUser(): User {
    return this.userService.getUser();
  }

  @Mutation('updateUser')
  updateUser(@Args('input') input: User) {
    return this.userService.updateUser(input);
  }

  @Mutation('updateUserAvatar')
  updateUserAvatar(@Args('avatar') avatar: string): User {
    return this.userService.updateUserAvatar(avatar);
  }

  @Mutation('deleteUser')
  deleteUser(@Args('id') id: number): boolean {
    return this.userService.deleteUser(id);
  }
}

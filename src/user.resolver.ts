import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { UpdateUserInput } from './user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  findUser() {
    return this.userService.getAll();
  }

  // @Mutation(() => User)
  // updateUser(@Args('input') input: UpdateUserInput) {
  //   return this.userService.updateUser(input);
  // }
  //
  // @Mutation(() => User)
  // updateUserAvatar(@Args('avatar') avatar: string) {
  //   return this.userService.updateUserAvatar(avatar);
  // }
  //
  // @Mutation(() => Boolean)
  // deleteUser(@Args('id') id: number) {
  //   return this.userService.deleteUser(id);
  // }
}

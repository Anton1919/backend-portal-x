import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { AuthResponse } from './dto/auth-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput.username, signInInput.password);
  }
}

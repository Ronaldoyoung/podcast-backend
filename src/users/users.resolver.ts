import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login-dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateAccountOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }
}

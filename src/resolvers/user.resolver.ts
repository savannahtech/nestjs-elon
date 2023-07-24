import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginResponse, User, UserInput } from 'src/models/user.model';
import { UserService } from 'src/services/user/user.service';
import { SystemRole } from 'src/models/role.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args('user', { type: () => UserInput }) user: UserInput,
  ): Promise<User> {
    return this.userService.createUser(user);
  }

  @Mutation(() => SystemRole)
  async createRole(@Args('role') role: SystemRole): Promise<SystemRole> {
    return this.userService.createRole(role);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<LoginResponse> {
    return this.userService.login(username, password);
  }
}

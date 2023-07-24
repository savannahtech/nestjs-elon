import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { SystemRole } from './role.model';

@ObjectType()
export class User {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => [SystemRole], { nullable: true })
  roles: SystemRole[];
}

@InputType()
export class UserInput {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => [String], { nullable: true })
  roles: string[];
}

@ObjectType()
export class LoginResponse {
  @Field({ nullable: false })
  token: string;

  //   @Field({ nullable: false })
  //   user: User;
}

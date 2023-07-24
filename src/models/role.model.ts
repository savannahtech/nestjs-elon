import { ObjectType, InputType, Field } from '@nestjs/graphql';

@ObjectType()
@InputType('SystemRoleInput')
export class SystemRole {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  role: string;
}

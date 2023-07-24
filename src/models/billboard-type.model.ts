import { ObjectType, InputType, Field } from '@nestjs/graphql';

@ObjectType()
@InputType('BillboardTypeInput')
export class BillboardType {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name: string;
}

import { ObjectType, InputType, Float, Field } from '@nestjs/graphql';

@ObjectType()
@InputType('AddressInput')
export class Address {
  @Field(() => Float, { nullable: true })
  latitude: number;

  @Field(() => Float, { nullable: true })
  longitude: number;

  @Field({ nullable: true })
  formattedAddress: string;

  @Field({ nullable: true })
  neighborhood: string;
}

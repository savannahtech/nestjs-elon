import { ObjectType, InputType, Field } from '@nestjs/graphql';

@ObjectType()
@InputType('CityInput')
export class City {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Number, { nullable: true })
  population: number;

  @Field(() => Number, { nullable: true })
  men: number;

  @Field(() => Number, { nullable: true })
  women: number;

  @Field(() => String, { nullable: true })
  area: string;

  @Field(() => String, { nullable: true })
  socio_economy: string;

  @Field(() => [String], { nullable: true })
  license_holders: string[];
}

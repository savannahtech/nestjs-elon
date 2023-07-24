import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { SupplierContact } from './supplier-contact.model';

@ObjectType()
@InputType('SupplierInput')
export class Supplier {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  vatNumber: string;

  @Field(() => [SupplierContact], { nullable: true })
  contacts: SupplierContact[];

  @Field(() => [String], { nullable: true })
  billboardTypes: string[];
}

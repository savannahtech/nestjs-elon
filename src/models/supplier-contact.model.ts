import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { SupplierContactRole } from './supplier-contact-role.model';

@ObjectType()
@InputType('SupplierContactInput')
export class SupplierContact {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => [SupplierContactRole], { nullable: true })
  role?: SupplierContactRole[];

  @Field(() => String, { nullable: true })
  phone: string;
}

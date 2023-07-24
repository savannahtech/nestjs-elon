import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { BillboardType } from './billboard-type.model';
import { Supplier } from './supplier.model';
import { City } from './city.model';
import { Address } from './address.model';
import { File } from './file.model';

@ObjectType()
export class Billboard {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Address, { nullable: true })
  address: Address;

  @Field(() => Number, { nullable: true })
  billboardNumber: number;

  @Field(() => BillboardType, { nullable: true })
  type: BillboardType;

  @Field(() => Number, { nullable: true })
  totalSize: number;

  @Field(() => Supplier, { nullable: true })
  supplier: Supplier;

  @Field(() => City, { nullable: true })
  city: City;

  @Field(() => Number, { nullable: true })
  width: number;

  @Field(() => Number, { nullable: true })
  height: number;

  @Field(() => String, { nullable: true })
  subType: string;

  @Field(() => String, { nullable: true })
  side: string;

  @Field(() => String, { nullable: true })
  premiumDescription: string;

  @Field(() => String, { nullable: true })
  orientation: string;

  @Field(() => Boolean, { nullable: true })
  isActive: boolean;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => Number, { nullable: true })
  views: number;

  @Field(() => Number, { nullable: true })
  rotation: number;

  @Field(() => [File], { nullable: true })
  images: File[];
}

@ObjectType()
@InputType('BillboardInput')
export class BillboardInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Address, { nullable: true })
  address: Address;

  @Field(() => Number, { nullable: true })
  billboardNumber: number;

  @Field(() => String, { nullable: true })
  type: string;

  @Field(() => Number, { nullable: true })
  totalSize: number;

  @Field(() => String, { nullable: true })
  supplier: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => Number, { nullable: true })
  width: number;

  @Field(() => Number, { nullable: true })
  height: number;

  @Field(() => String, { nullable: true })
  subType: string;

  @Field(() => String, { nullable: true })
  side: string;

  @Field(() => String, { nullable: true })
  premiumDescription: string;

  @Field(() => String, { nullable: true })
  orientation: string;

  @Field(() => Boolean, { nullable: true })
  isActive: boolean;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => Number, { nullable: true })
  views: number;

  @Field(() => Number, { nullable: true })
  rotation: number;

  @Field(() => [File], { nullable: true })
  images: File[];
}

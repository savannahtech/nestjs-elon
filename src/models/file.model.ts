import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType('FileInput')
export class File {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  fieldname: string;

  @Field({ nullable: true })
  originalname: string;

  @Field({ nullable: true })
  encoding: string;

  @Field({ nullable: true })
  mimetype: string;

  @Field({ nullable: true })
  destination: string;

  @Field({ nullable: true })
  filename: string;

  @Field({ nullable: true })
  path: string;

  @Field({ nullable: true })
  size: number;
}

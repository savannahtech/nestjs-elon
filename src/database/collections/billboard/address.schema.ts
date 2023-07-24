import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'addresses',
})
export class Address extends Document {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  formattedAddress: string;

  @Prop({ required: false })
  neighborhood: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

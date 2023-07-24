import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SupplierContact } from './supplier-contact.schema';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'suppliers',
})
export class Supplier extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  vatNumber: string;

  @Prop({ required: true })
  contacts: SupplierContact[];

  @Prop({ required: true })
  billboardTypes: string[]; // TODO: Change to array of billboard types
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);

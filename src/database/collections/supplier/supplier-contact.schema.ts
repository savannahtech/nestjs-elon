import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SupplierContactRole } from './supplier-contact-role.schema';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'suppliercontacts',
})
export class SupplierContact extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  role: SupplierContactRole[];

  @Prop({ required: true })
  phone: string;
}

export const SupplierContactSchema =
  SchemaFactory.createForClass(SupplierContact);

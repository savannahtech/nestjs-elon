import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'suppliercontactroles',
})
export class SupplierContactRole extends Document {
  @Prop({ required: true })
  role: string;
}

export const SupplierContactRoleSchema =
  SchemaFactory.createForClass(SupplierContactRole);

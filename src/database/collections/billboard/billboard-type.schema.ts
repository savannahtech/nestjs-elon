import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'billboardtypes',
})
export class BillboardType extends Document {
  @Prop({ required: true, unique: true })
  name: string;
}

export const BillboardTypeSchema = SchemaFactory.createForClass(BillboardType);

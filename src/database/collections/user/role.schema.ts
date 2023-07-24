import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'systemroles',
})
export class SystemRole extends Document {
  @Prop({ required: true })
  role: string;
}

export const SystemRoleSchema = SchemaFactory.createForClass(SystemRole);

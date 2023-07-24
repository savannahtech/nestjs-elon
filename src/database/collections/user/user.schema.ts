import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SystemRole } from './role.schema';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'suppliercontactroles',
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: SystemRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);

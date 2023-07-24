import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: false,
  autoCreate: true,
  collection: 'cities',
})
export class City extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  population: number;

  @Prop({ required: false })
  men: number;

  @Prop({ required: false })
  women: number;

  @Prop({ required: false })
  area: string;

  @Prop({ required: false })
  socio_economy: string;

  @Prop({ required: false })
  license_holders: string[];
}

export const CitySchema = SchemaFactory.createForClass(City);

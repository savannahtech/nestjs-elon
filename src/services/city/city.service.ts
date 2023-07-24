import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from 'src/database/collections/cities/city.schema';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name)
    private cityModel: Model<City>,
  ) {}

  async getCities() {
    return this.cityModel.find();
  }

  async createCity(city: City) {
    return this.cityModel.create(city);
  }

  async updateCity(city: City) {
    return this.cityModel.updateOne({ _id: city.id }, city);
  }

  async deleteCity(id: string) {
    return this.cityModel.deleteOne({ _id: id });
  }
}

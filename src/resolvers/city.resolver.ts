import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CityService } from 'src/services/city/city.service';
import { City as CitySchema } from 'src/database/collections/cities/city.schema';
import { City } from 'src/models/city.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard.gql';

@Resolver(() => City)
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [City])
  @UseGuards(AuthGuard)
  async getCities(): Promise<City[]> {
    return this.cityService.getCities();
  }

  @Mutation(() => City)
  @UseGuards(AuthGuard)
  async createCity(
    @Args('city', { type: () => City }) city: CitySchema,
  ): Promise<City> {
    return this.cityService.createCity(city);
  }

  @Mutation(() => City)
  @UseGuards(AuthGuard)
  async updateCity(
    @Args('city', { type: () => City }) city: CitySchema,
  ): Promise<any> {
    return this.cityService.updateCity(city);
  }

  @Mutation(() => City)
  @UseGuards(AuthGuard)
  async deleteCity(
    @Args('id', { type: () => String }) id: string,
  ): Promise<any> {
    return this.cityService.deleteCity(id);
  }
}

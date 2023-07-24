import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Billboard, BillboardInput } from 'src/models/billboard.model';
import { BillboardService } from 'src/services/billboard/billboard.service';
import { Billboard as BillboardSchema } from 'src/database/collections/billboard/billboard.schema';
import { BillboardType as BillboardTypeSchema } from 'src/database/collections/billboard/billboard-type.schema';
import { BillboardType } from 'src/models/billboard-type.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard.gql';

@Resolver(() => Billboard)
export class BillboardResolver {
  constructor(private readonly billboardService: BillboardService) {}

  @Query(() => [Billboard])
  @UseGuards(AuthGuard)
  async getBillboards(): Promise<Billboard[]> {
    return this.billboardService.getBillboards();
  }

  @Mutation(() => Billboard)
  @UseGuards(AuthGuard)
  async createBillboard(
    @Args('billboard', { type: () => BillboardInput })
    billboard: BillboardInput,
  ): Promise<Billboard> {
    return this.billboardService.createBillboard(billboard);
  }

  @Mutation(() => Billboard)
  @UseGuards(AuthGuard)
  async updateBillboard(
    @Args('billboard', { type: () => BillboardInput })
    billboard: BillboardSchema,
  ): Promise<any> {
    return this.billboardService.updateBillboard(billboard);
  }

  @Mutation(() => Billboard)
  @UseGuards(AuthGuard)
  async deleteBillboard(
    @Args('id', { type: () => String }) id: string,
  ): Promise<any> {
    return this.billboardService.deleteBillboard(id);
  }

  /* BillboardType */
  @Mutation(() => BillboardType)
  @UseGuards(AuthGuard)
  async createBillboardType(
    @Args('billboardType', { type: () => BillboardType })
    billboardType: BillboardTypeSchema,
  ): Promise<BillboardType> {
    return this.billboardService.createBillboardType(billboardType);
  }

  @Query(() => [BillboardType])
  @UseGuards(AuthGuard)
  async getBillboardTypes(): Promise<BillboardType[]> {
    return this.billboardService.getBillboardTypes();
  }

  @Query(() => BillboardType)
  @UseGuards(AuthGuard)
  async getBillboardType(
    @Args('id', { type: () => String }) id: string,
  ): Promise<BillboardType> {
    return this.billboardService.getBillboardType(id);
  }

  @Mutation(() => BillboardType)
  @UseGuards(AuthGuard)
  async updateBillboardType(
    @Args('billboardType', { type: () => BillboardType })
    billboardType: BillboardTypeSchema,
  ): Promise<any> {
    return this.billboardService.updateBillboardType(billboardType);
  }

  @Mutation(() => BillboardType)
  @UseGuards(AuthGuard)
  async deleteBillboardType(
    @Args('id', { type: () => String }) id: string,
  ): Promise<any> {
    return this.billboardService.deleteBillboardType(id);
  }
}

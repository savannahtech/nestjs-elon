import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Supplier } from 'src/models/supplier.model';
import { SupplierService } from 'src/services/supplier/supplier.service';
import { Supplier as SupplierSchema } from 'src/database/collections/supplier/supplier.schema';
import { SupplierContactRole } from 'src/models/supplier-contact-role.model';
import { SupplierContactRole as SupplierContactRoleSchema } from 'src/database/collections/supplier/supplier-contact-role.schema';
import { SupplierContact } from 'src/models/supplier-contact.model';
import { SupplierContact as SupplierContactSchema } from 'src/database/collections/supplier/supplier-contact.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard.gql';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Query(() => [Supplier])
  @UseGuards(AuthGuard)
  async getSuppliers(): Promise<Supplier[]> {
    return this.supplierService.getSuppliers();
  }

  @Mutation(() => Supplier)
  @UseGuards(AuthGuard)
  async createSupplier(
    @Args('supplier', { type: () => Supplier }) supplier: SupplierSchema,
  ): Promise<Supplier> {
    return this.supplierService.createSupplier(supplier);
  }

  @Mutation(() => Supplier)
  @UseGuards(AuthGuard)
  async updateSupplier(
    @Args('supplier', { type: () => Supplier }) supplier: SupplierSchema,
  ): Promise<any> {
    return this.supplierService.updateSupplier(supplier);
  }

  @Mutation(() => Supplier)
  @UseGuards(AuthGuard)
  async deleteSupplier(
    @Args('id', { type: () => String }) id: string,
  ): Promise<any> {
    return this.supplierService.deleteSupplier(id);
  }

  @Query(() => Supplier)
  @UseGuards(AuthGuard)
  async getSupplierById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Supplier> {
    return this.supplierService.getSupplier(id);
  }

  /* Supplier Contact Role */
  @Query(() => [SupplierContactRole])
  @UseGuards(AuthGuard)
  async getSupplierContactRoles(): Promise<SupplierContactRole[]> {
    return this.supplierService.getSupplierContactRoles();
  }

  @Mutation(() => SupplierContactRole)
  @UseGuards(AuthGuard)
  async createSupplierContactRole(
    @Args('supplierContactRole', { type: () => SupplierContactRole })
    supplierContactRole: SupplierContactRoleSchema,
  ): Promise<SupplierContactRole> {
    return this.supplierService.createSupplierContactRole(supplierContactRole);
  }

  @Mutation(() => SupplierContactRole)
  @UseGuards(AuthGuard)
  async updateSupplierContactRole(
    @Args('supplierContactRole', { type: () => SupplierContactRole })
    supplierContactRole: SupplierContactRoleSchema,
  ): Promise<any> {
    return this.supplierService.updateSupplierContactRole(supplierContactRole);
  }

  @Mutation(() => SupplierContactRole)
  @UseGuards(AuthGuard)
  async deleteSupplierContactRole(
    @Args('id', { type: () => String }) id: string,
  ): Promise<any> {
    return this.supplierService.deleteSupplierContactRole(id);
  }

  /* Supplier Contact */
  @Query(() => [SupplierContact])
  @UseGuards(AuthGuard)
  async getSupplierContacts(
    @Args('supplierId', { type: () => String }) supplierId: string,
  ): Promise<SupplierContact[]> {
    return this.supplierService.getSupplierContactsBySupplierId(supplierId);
  }

  @Mutation(() => SupplierContact)
  @UseGuards(AuthGuard)
  async createSupplierContact(
    @Args('supplierContact', { type: () => SupplierContact })
    supplierContact: SupplierContactSchema,
    @Args('supplierId', { type: () => String }) supplierId: string,
    @Args('supplierContactRoleIds', { type: () => [String] })
    supplierContactRoleIds: string[],
  ): Promise<SupplierContact> {
    return this.supplierService.createSupplierContact(
      supplierContact,
      supplierId,
      supplierContactRoleIds,
    );
  }

  @Mutation(() => SupplierContact)
  @UseGuards(AuthGuard)
  async updateSupplierContact(
    @Args('supplierContact', { type: () => SupplierContact })
    supplierContact: SupplierContactSchema,
  ): Promise<any> {
    return this.supplierService.updateSupplierContact(supplierContact);
  }

  @Mutation(() => SupplierContact)
  @UseGuards(AuthGuard)
  async deleteSupplierContact(
    @Args('id', { type: () => String }) id: string,
  ): Promise<any> {
    return this.supplierService.deleteSupplierContact(id);
  }
}

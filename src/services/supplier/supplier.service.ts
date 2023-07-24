import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SupplierContactRole } from 'src/database/collections/supplier/supplier-contact-role.schema';
import { SupplierContact } from 'src/database/collections/supplier/supplier-contact.schema';
import { Supplier } from 'src/database/collections/supplier/supplier.schema';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<Supplier>,
    @InjectModel(SupplierContactRole.name)
    private readonly supplierContactRoleModel: Model<SupplierContactRole>,
    @InjectModel(SupplierContact.name)
    private readonly supplierContactModel: Model<SupplierContact>,
  ) {}

  async getSuppliers() {
    return this.supplierModel.find();
  }

  async createSupplier(supplier: Supplier) {
    return this.supplierModel.create(supplier);
  }

  async updateSupplier(supplier: Supplier) {
    const updatedSupplier = await this.supplierModel.updateOne(
      { _id: supplier.id },
      supplier,
    );

    if (updatedSupplier.modifiedCount > 0) {
      return await this.supplierModel.findById(supplier.id);
    }

    return updatedSupplier;
  }

  async deleteSupplier(id: string) {
    const foundSupplier = await this.supplierModel.findById(id);
    const deletedSupplier = await this.supplierModel.deleteOne({ _id: id });

    if (deletedSupplier.deletedCount > 0) {
      return foundSupplier;
    } else {
      return deletedSupplier;
    }
  }

  async getSupplier(id: string) {
    return this.supplierModel.findById(id);
  }

  async getSupplierContactsBySupplierId(supplierId: string) {
    return (await this.supplierModel.findById(supplierId)).contacts;
  }

  /* Supplier Contact Role */
  async getSupplierContactRoles() {
    return this.supplierContactRoleModel.find();
  }

  async createSupplierContactRole(supplierContactRole: SupplierContactRole) {
    return this.supplierContactRoleModel.create(supplierContactRole);
  }

  async updateSupplierContactRole(supplierContactRole: SupplierContactRole) {
    return await this.supplierContactRoleModel.updateOne(
      { _id: supplierContactRole.id },
      supplierContactRole,
    );
  }

  async deleteSupplierContactRole(id: string) {
    return await this.supplierContactRoleModel.deleteOne({ _id: id });
  }

  /* Supplier Contact */
  async getSupplierContacts() {
    return await this.supplierContactModel.find();
  }

  async createSupplierContact(
    supplierContact: SupplierContact,
    userId: string,
    supplierContactRoleIds: string[],
  ) {
    supplierContact.role = [];
    for (let i = 0; i < supplierContactRoleIds.length; i++) {
      const id = supplierContactRoleIds[i];
      const supplierContactRole = await this.supplierContactRoleModel.findById(
        id,
      );
      supplierContact.role.push(supplierContactRole);
    }

    const createdSupplierContact = await this.supplierContactModel.create(
      supplierContact,
    );

    await this.supplierModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { contacts: createdSupplierContact } },
    );

    return createdSupplierContact;
  }

  async updateSupplierContact(supplierContact: SupplierContact) {
    const updatedSupplierContact = await this.supplierContactModel.updateOne(
      { _id: supplierContact._id },
      supplierContact,
    );

    if (updatedSupplierContact.modifiedCount > 0) {
      return await this.supplierContactModel.findById(supplierContact.id);
    }

    return updatedSupplierContact;
  }

  async deleteSupplierContact(id: string) {
    const supplierContact = await this.supplierContactModel.findById(id);

    const deletedSupplierContact = await this.supplierContactModel.deleteOne({
      _id: id,
    });

    if (deletedSupplierContact.deletedCount > 0) {
      // TODO: Remove supplier contact from supplier
      await this.supplierModel.updateMany(
        { 'contacts._id': id },
        { $pull: { contacts: { _id: id } } },
      );
      return supplierContact;
    } else {
      return deletedSupplierContact;
    }
  }
}

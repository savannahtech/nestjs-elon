// @Schema({
//     timestamps: true,
//     strict: false,
//     autoCreate: true,
//     collection: 'clients',
//   })
//   export class Client extends Document {
//     @Prop({ required: true })
//     companyName: string;

//     @Prop({ required: true, unique: true })
//     address: string;

//     @Prop({ required: true })
//     vatNumber: string;

//     @Prop({ required: true })
//     contacts: SupplierContact[];

//     @Prop({ required: true })
//     campaigns: string; // TODO: Change to array of campaign types
//   }

//   export const ClientSchema = SchemaFactory.createForClass(Client);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { File } from './database/collections/files/file.schema';
import { Model } from 'mongoose';

import * as csvParser from 'csv-parse';
import axios from 'axios';
import { Address } from './database/collections/billboard/address.schema';
import { City } from './database/collections/cities/city.schema';
import { BillboardType } from './database/collections/billboard/billboard-type.schema';
import { Billboard } from './database/collections/billboard/billboard.schema';
import * as path from 'path';
import { Response } from 'express';
import * as mime from 'mime';

export enum MimeType {
  PDF = 'application/pdf',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  GIF = 'image/gif',
  CSV = 'text/csv',
}

@Injectable()
export class AppService {
  private readonly uploadFolder = 'uploads';

  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<File>,
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>,
    @InjectModel(City.name)
    private readonly cityModel: Model<City>,
    @InjectModel(BillboardType.name)
    private readonly billboardTypeModel: Model<BillboardType>,
    @InjectModel(Billboard.name)
    private readonly billboardModel: Model<Billboard>,
  ) {}

  handleFileUpload(file: Express.Multer.File) {
    const fileExtension = this.getFileExtension(file.mimetype as MimeType);
    const createdFileWithExt = fs.readFile(
      './uploads/' + file.filename,
      (err, data) => {
        if (err) throw err;
        console.log(data);
        fs.writeFile(
          './uploads/' + file.filename + '.' + fileExtension,
          data,
          (err) => {
            if (err) throw err;
            csvParser.parse(data, {}, (err, output: any[][]) => {
              const [headings, ...rows] = output;
              const addressIndex = headings.indexOf('address');
              const cityIndex = headings.indexOf('city');
              const billboardTypeIndex = headings.indexOf('type');
              const heightIndex = headings.indexOf('height');
              const widthIndex = headings.indexOf('width');
              const sideIndex = headings.indexOf('side');
              const isActive = headings.indexOf('isActive');
              const billboardNumberIndex = headings.indexOf('ID');
              const subTypeIndex = headings.indexOf('subType');
              const premiumDescriptionIndex =
                headings.indexOf('premiumDescription');
              const orientationIndex = headings.indexOf('orientation');
              const priceIndex = headings.indexOf('price');
              const viewsIndex = headings.indexOf('views');
              const rotationIndex = headings.indexOf('rotation');
              const image1Index = headings.indexOf('image1');
              const image2Index = headings.indexOf('image2');
              const image3Index = headings.indexOf('image3');
              const image4Index = headings.indexOf('image4');
              const image5Index = headings.indexOf('image5');
              const image6Index = headings.indexOf('image6');
              const image7Index = headings.indexOf('image7');
              const image8Index = headings.indexOf('image8');

              // loop through CSV rows and search for address on google maps API
              rows.forEach((row) => {
                console.log(row);
                const address = row[addressIndex];
                this.googleMapsAPI(address).then(async (res) => {
                  let createdAddress: any;
                  if (!res.data.results.length) {
                    createdAddress = null;
                  } else {
                    console.log(res.data);
                    createdAddress = new this.addressModel({
                      latitude: res.data.results[0].geometry.location.lat,
                      longitude: res.data.results[0].geometry.location.lng,
                      formattedAddress: res.data.results[0].formatted_address,
                      neighborhood: res.data.results[0].vicinity,
                    });
                  }

                  const newCity = new this.cityModel({
                    name: row[cityIndex],
                  });

                  const createdCity = await this.cityModel.create(newCity);

                  const newBillboardType = new this.billboardTypeModel({
                    name: row[billboardTypeIndex],
                  });

                  const createdBillboardType =
                    await this.billboardTypeModel.create(newBillboardType);

                  const newBillboard = new this.billboardModel({
                    address: createdAddress,
                    city: createdCity,
                    type: createdBillboardType,
                    height: row[heightIndex],
                    width: row[widthIndex],
                    side: row[sideIndex],
                    isActive: row[isActive] === 'yes' ? true : false,
                    billboardNumber: row[billboardNumberIndex],
                    subType: row[subTypeIndex],
                    premiumDescription: row[premiumDescriptionIndex],
                    orientation: row[orientationIndex],
                    price: row[priceIndex],
                    views: row[viewsIndex],
                    rotation: row[rotationIndex],
                    image1: row[image1Index],
                    image2: row[image2Index],
                    image3: row[image3Index],
                    image4: row[image4Index],
                    image5: row[image5Index],
                    image6: row[image6Index],
                    image7: row[image7Index],
                    image8: row[image8Index],
                  });

                  await this.billboardModel.create(newBillboard);
                });
              });

              // delete file from uploads folder
              fs.unlink('./uploads/' + file.filename, (err) => {
                if (err) throw err;
                console.log('File deleted!');
              });

              // delete file from uploads folder
              fs.unlink(
                './uploads/' + file.filename + '.' + fileExtension,
                (err) => {
                  if (err) throw err;
                  console.log('File deleted!');
                },
              );
            });
            console.log('File saved!');
          },
        );
      },
    );

    return createdFileWithExt;
  }

  getFileExtension(mimeType: MimeType) {
    const mimeTypeToExtension = {
      [MimeType.PDF]: 'pdf',
      [MimeType.PNG]: 'png',
      [MimeType.JPEG]: 'jpeg',
      [MimeType.JPG]: 'jpg',
      [MimeType.GIF]: 'gif',
      [MimeType.CSV]: 'csv',
    };

    return mimeTypeToExtension[mimeType];
  }

  async googleMapsAPI(address: string) {
    return await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&radius=1000&key=${process.env.GOOGLE_MAPS_API_KEY}&language=iw`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  }

  async handleBulkUpload(files: Express.Multer.File[]) {
    const promises = files.map((file) => this.fileModel.create(file));
    return await Promise.all(promises);
  }

  async getFile(fileId: string, res: Response) {
    const file = await this.fileModel.findOne({
      filename: fileId,
    });

    const filePath = path.join(this.uploadFolder, fileId);

    if (!fs.existsSync(filePath) || !file) {
      res.status(404).send({
        message: 'File not found',
      });
      return;
    }

    // Fetch the stored MIME type from the database using your service or repository
    const mimeType = file.mimetype;
    const fileExtension = mime.getExtension(mimeType);

    // If you want to force the browser to download the file, uncomment the following line:
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileId}.${fileExtension}`,
    );

    // res.setHeader('Content-Type', mimeType);
    res.sendFile(filePath, { root: '.' });
  }
}

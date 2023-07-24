import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { SupplierResolver } from './resolvers/supplier.resolver';
import { SupplierService } from './services/supplier/supplier.service';
import { BillboardResolver } from './resolvers/billboard.resolver';
import { BillboardService } from './services/billboard/billboard.service';
import { CityResolver } from './resolvers/city.resolver';
import { CityService } from './services/city/city.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth/auth.guard';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const url = `mongodb://${process.env.DB_HOST}:27017/billboardz_db`;
        return {
          uri: url,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    FileUploadModule,
    ConfigModule.forRoot(),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  controllers: [],
  providers: [
    AppService,
    SupplierResolver,
    SupplierService,
    BillboardResolver,
    BillboardService,
    CityResolver,
    CityService,
    AuthGuard,
    UserResolver,
    UserService,
  ],
})
export class AppModule {}

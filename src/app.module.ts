import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClinicsModule } from './clinics/clinics.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicServicesModule } from './clinic-services/clinic-services.module';
import { ClinicFacilitiesModule } from './clinic-facilities/clinic-facilities.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    UsersModule,
    ClinicsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
        database: configService.get<string>('DATABASE_NAME'),
      }),
    }),

    ClinicServicesModule,

    ClinicFacilitiesModule,

    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

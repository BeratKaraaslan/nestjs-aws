import { Module } from '@nestjs/common';
import { LocationService } from './service/location.service';
import { LocationController } from './controller/location.controller';
import { DbService } from 'app/core/db/db.service';

@Module({
    controllers: [LocationController],
    providers: [LocationService, DbService],
  })
export class LocationModule {
}

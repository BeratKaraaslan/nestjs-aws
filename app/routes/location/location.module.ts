import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { DbService } from 'app/core/db/db.service';

@Module({
    controllers: [LocationController],
    providers: [LocationService, DbService],
  })
export class LocationModule {
}

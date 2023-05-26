import { Module } from '@nestjs/common';
import { InterestController } from './controller/interest.controller';
import { InterestService } from './service/interest.service';
import { DbService } from 'app/core/db/db.service';

@Module({
  controllers: [InterestController],
  providers: [InterestService, DbService]
})
export class InterestModule { }

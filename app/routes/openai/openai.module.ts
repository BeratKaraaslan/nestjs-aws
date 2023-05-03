import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { DbService } from 'app/core/db/db.service';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, DbService]
})
export class OpenaiModule {}

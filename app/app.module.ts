import { Module } from '@nestjs/common';
import { LocationModule } from './routes/location/location.module';
import { OpenaiController } from './routes/openai/openai.controller';
import { OpenaiModule } from './routes/openai/openai.module';

@Module({
  imports: [LocationModule, OpenaiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
=======
import { LocationModule } from './routes/location/location.module';

@Module({
  imports: [LocationModule],
  controllers: [],
  providers: [],
>>>>>>> test
})
export class AppModule {}

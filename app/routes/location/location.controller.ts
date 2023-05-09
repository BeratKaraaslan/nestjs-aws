import { Body, Controller } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateCity, GetCity } from './location.decorator';
import { CreateCityDto } from './models/location-dto';
import { CompletedDto } from 'app/core/models/default-dto';

@Controller('location')
export class LocationController {
    constructor(
        private service: LocationService
    ) { }

    @CreateCity()
    async createCity(@Body() body: CreateCityDto): Promise<CompletedDto> {
        return await this.service.createCity(body);
    }

    @GetCity()
    async getCitys(){
        return await this.service.get_users();
    }
}

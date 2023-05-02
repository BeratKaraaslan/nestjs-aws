import { Injectable } from '@nestjs/common';
import { DbService } from 'app/core/db/db.service';
import { CreateCityDto } from './models/location-dto';
import { CompletedDto } from 'app/core/models/default-dto';

@Injectable()
export class LocationService {
    constructor(
        private db: DbService
    ) { }

    async createCity(body: CreateCityDto):Promise<CompletedDto> {

        await this.db.city.create({ data: body });
        return { completed: true };
    }

    async getCity() {
        const list = await this.db.city.findMany()
        return list;
    }
}

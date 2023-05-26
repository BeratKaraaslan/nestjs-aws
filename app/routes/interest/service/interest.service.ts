import { Injectable } from '@nestjs/common';
import { DbService } from 'app/core/db/db.service';

@Injectable()
export class InterestService {
    constructor(
        private db: DbService
    ) { }

    async createHobby() {
        
    }
}

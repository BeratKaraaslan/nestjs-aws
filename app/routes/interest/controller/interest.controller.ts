import { Controller } from '@nestjs/common';
import { InterestService } from '../service/interest.service';

@Controller('interest')
export class InterestController {
    constructor(
        private interestService: InterestService
    ){}

    async createInterest() {
        
    }
}

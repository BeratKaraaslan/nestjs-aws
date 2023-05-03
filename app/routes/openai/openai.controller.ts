import { Controller } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenAI } from './openai.decorator';

@Controller('openai')
export class OpenaiController {
    constructor(
        private service: OpenaiService
    ) { }

    @OpenAI()
    async getPrompt(){
        return await this.service.openai();
    }
}

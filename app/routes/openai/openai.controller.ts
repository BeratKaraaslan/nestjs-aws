import { Body, Controller, Get, Query } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenAI } from './openai.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { PromptDto } from './models/openai-dto';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) { }

    @OpenAI()
    async getText(@Body() body: PromptDto, @Query('name') name: string): Promise<string> {
        return this.openaiService.generateText(body.prompt.toString(), name);
    }
}

import { ApiProperty } from "@nestjs/swagger";

export class PromptDto {

    @ApiProperty({ type: String })
    prompt: string;
}
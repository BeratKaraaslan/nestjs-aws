import { ApiProperty } from "@nestjs/swagger";

export class HobbyDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'Hobi ismi',
        example: 'Havuz',
    })
    name: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Hobi Kodu',
        example: 'POOL',
    })
    code: string
}
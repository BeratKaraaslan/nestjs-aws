import { ApiProperty } from "@nestjs/swagger";

export class CreateCityDto {
    @ApiProperty({
      type: String,
      required: true,
      description: 'Şehir İsmi',
      example: "İstanbul",
    })
    name: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Plaka kodu',
        example: 34,
      })
      no: number;
  }
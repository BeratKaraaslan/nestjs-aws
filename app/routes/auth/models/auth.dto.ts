import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class AuthDto {
    @IsEmail()
    @ApiProperty({ type: String, required: true, description: 'Email', example: "berat@gmail.com" })
    email: string;

    @ApiProperty({ type: String, required: true, description: 'İsim Soyisim', example: "Berat Karaaslan" })
    name: string;

    @ApiProperty({ type: String, required: true, description: 'Şifre', example: "password123" })
    password: string;
}

export class AuthSignin {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Email', example: "berat@gmail.com" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Şifre', example: "password123" })
    password: string;
}

export class PasswordOtpValidate {
    @ApiProperty({
        type: String,
        required: true,
        description: 'Forget aşamasında aldığınız transaction_id',
        minimum: 30,
        maximum: 120,
        default: '',
    })
    @IsNotEmpty({ message: 'Transaction Id boş olamaz' })
    @Length(32, 180, { message: 'Transaction Id yazmadınız' })
    transaction_id: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Sms doğrulama kodu',
        minimum: 6,
        maximum: 8,
        default: '123456',
    })
    @IsNotEmpty({ message: 'Otp doğrulama kodu boş olamaz' })
    @Length(6, 8, { message: 'Doğrulama kodu 6 Karakter olmalıdır.' })
    otp_code: string;
}
import { Controller, Post, Body, HttpCode, HttpStatus, Param, Query, ParseIntPipe, HttpException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { AuthDto, AuthSignin, PasswordOtpValidate } from "../models/auth.dto";
import { GetUsers, SignIn, SignUp, VerifyUser } from "./auth.decorator";
import { MailService } from "app/core/middlewares/mail.service";
import { generateSmsCode } from "app/core/helper/helper.functions";
import { HashService } from "app/core/settings/hash.service";
import { CompletedDto } from "app/core/models/default-dto";



@ApiTags("Auth")
@Controller('/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly mailService: MailService,
        private hashService: HashService
    ) { }

    @SignUp()
    async signup(@Body() dto: AuthDto) {
        const user = await this.authService.signup(dto);

        const newCode = generateSmsCode();
        await this.mailService.sendOtp(user.user.name, user.user.email, newCode)
        const transaction_id = await this.hashService.to(
            `${user.user.email}|${user.user.id}|${newCode}`,
            'USER_SIGNUP',
        );
        return {
            transaction_id: transaction_id,
            token: user.token
        }
    }

    @VerifyUser()
    async verifyUser(
        @Param('userid', ParseIntPipe) userid: number,
        @Body() item: PasswordOtpValidate,
    ): Promise<CompletedDto> {
        try {
            await this.hashService.from(
                item.transaction_id,
                'USER_SIGNUP',
            );
        } catch (error) {
            console.debug(error)
        }
        const transaction_id = await this.hashService.from(
            item.transaction_id,
            'USER_SIGNUP',
        );
        console.debug(transaction_id)
        if (!transaction_id || !transaction_id[1])
            throw new HttpException(
                { error_code: 'BAD_REQUEST', message: 'TransactionId Hatalı' },
                404,
            );

        if (transaction_id[2] != item.otp_code)
            throw new HttpException(
                { error_code: 'VALIDATION_ERROR', message: 'Doğrulama kodu hatalı' },
                422,
            );

        const getUser = await this.authService.userDetail(userid);

        if (!getUser)
            throw new HttpException(
                { error_code: 'NOT_FOUND', message: 'Kullanıcı bulunamadı' },
                404,
            );

        if (getUser.status == true && getUser.role_code != 'BASIC_USER')
            throw new HttpException(
                {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Kullanıcı hesabı daha önceden aktif edilmiştir.',
                },
                422,
            );

        await this.mailService.sendCompleted(getUser.name, getUser.email);

        return await this.authService.userActive(getUser.id);
    }

    @SignIn()
    async signin(@Body() dto: AuthSignin) {
        return this.authService.signin(dto);
    }
    @GetUsers()
    async getUsers() {
        const res = await this.authService.get_users;
        return res
    }
}
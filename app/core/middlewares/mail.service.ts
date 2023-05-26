import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import configurations from '../settings/configurations';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MailService {

    private config: ReturnType<typeof configurations>;

    constructor(
        private readonly mailerService: MailerService,
        configService: ConfigService
    ) {
        this.config = configurations(configService);
    }

    public sendOtp(name: string, to: string, otp: string): void {
        this
            .mailerService
            .sendMail({
                to: to,
                from: `"Tour-Guide-App" <${this.config.userEmail}>`,
                subject: 'Tour Guide APP Verify Account',
                template: 'email',
                context: {
                    name: name,
                    otp: otp
                }
            })
            .then((success) => {
                console.log(success)
            })
            .catch((err) => {
                console.log("Error Message:", err)
            });
    }

    public sendCompleted(name: string, to: string): void {
        this
            .mailerService
            .sendMail({
                to: to,
                from: `"Tour-Guide-App" <${this.config.userEmail}>`,
                subject: 'Tour Guide APP Account Verified',
                template: 'verified',
                context: {
                    name: name,
                }
            })
            .then((success) => {
                console.log(success)
            })
            .catch((err) => {
                console.log("Error Message:", err)
            });
    }
}
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    public sendOtp(name: string, to: string, otp: string): void {
        this
            .mailerService
            .sendMail({
                to: to,
                from: `"Tour-Guide-App" <${process.env.EMAIL_USER}>`,
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
                from: `"Tour-Guide-App" <${process.env.EMAIL_USER}>`,
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
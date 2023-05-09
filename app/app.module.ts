import { Module } from '@nestjs/common';
import { LocationModule } from './routes/location/location.module';
import { AuthModule } from './routes/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';


@Module({
  imports: [LocationModule, AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            type: "OAuth2",
            accessToken: process.env.ACCESS_TOKEN,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            user: process.env.EMAIL_USER
          },
        },
        defaults: {
          from: `"Tour-Guide-App" <${process.env.EMAIL_USER}>`,
        },
        template: {
          dir: join(__dirname, '../app/routes/auth/models/templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
})
export class AppModule { }

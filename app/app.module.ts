import { Module } from '@nestjs/common';
import { LocationModule } from './routes/location/location.module';
import { AuthModule } from './routes/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { InterestModule } from './routes/interest/interest.module';
import configurations from './core/settings/configurations';


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
            accessToken: configurations().accessToken,
            clientId: configurations().clientId,
            clientSecret: configurations().clientSecret,
            refreshToken: configurations().refreshToken,
            user: configurations().user,
          },
        },
        defaults: {
          from: `"Tour-Guide-App" <${configurations().userEmail}>`,
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
    InterestModule,
  ],
})
export class AppModule { }

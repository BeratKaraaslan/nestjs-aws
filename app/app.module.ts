import { Module } from '@nestjs/common';
import { LocationModule } from './routes/location/location.module';
import { AuthModule } from './routes/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { InterestModule } from './routes/interest/interest.module';
import configurations from './core/settings/configurations';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    LocationModule, 
    AuthModule, 
    ConfigModule.forRoot(), // set up ConfigModule with forRoot
    MailerModule.forRootAsync({
      imports: [ConfigModule], // import ConfigModule here
      useFactory: (configService: ConfigService) => { // inject ConfigService here
        const config = configurations(configService);
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              type: "OAuth2",
              accessToken: config.accessToken,
              clientId: config.clientId,
              clientSecret: config.clientSecret,
              refreshToken: config.refreshToken,
              user: config.user,
            },
          },
          defaults: {
            from: `"Tour-Guide-App" <${config.userEmail}>`,
          },
          template: {
            dir: join(__dirname, '../app/routes/auth/models/templates'),
            adapter: new HandlebarsAdapter(), 
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService], // make ConfigService available for injection
    }),
    InterestModule,
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from 'app/core/auth/jwt.strategy';
import { DbService } from 'app/core/db/db.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'app/core/middlewares/mail.service';
import { HashService } from 'app/core/settings/hash.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, DbService, ConfigService, MailService, HashService],
})
export class AuthModule { }

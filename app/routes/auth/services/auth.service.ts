import {
    ForbiddenException,
    HttpException,
    Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DbService } from 'app/core/db/db.service';
import { AuthDto, AuthSignin } from '../models/auth.dto';
import configurations from 'app/core/settings/configurations';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CompletedDto } from 'app/core/models/default-dto';

@Injectable()
export class AuthService {
    constructor(
        private dbService: DbService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signup(user_data: AuthDto) {
        // generate the password hash

        const hash = await argon.hash(user_data.password);

        try {
            const user = await this.dbService.user.create({
                data: {
                    name: user_data.name,
                    email: user_data.email,
                    password: hash,
                    role_code: 'BASIC_USER'
                }
            });
            return {
                token: await this.signToken(user.id, user.email),
                user: user
            };
        } catch (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    );
                }
            }
            throw error;
        }

    }

    async signin(dto: AuthSignin) {
        // find the user by email
        const user =
            await this.dbService.user.findUnique({
                where: {
                    email: dto.email,
                },
            });

        // if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        }

        // compare password
        const pwMatches = await argon.verify(
            user.password,
            dto.password,
        );

        // if password incorrect throw exception
        if (!pwMatches) {
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        }
        try {

            const token = await this.signToken(user.id, user.email);
            return token;
        } catch (error) {
            console.debug(error, "-------> returning error");
        }
    }

    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string, email: string }> {
        try {
            const payload = {
                sub: userId,
                email,
            };
            const secret = process.env.JWT_SECRET;

            const token = await this.jwt.signAsync(
                payload,
                {
                    expiresIn: '24h',
                    secret: secret,
                },
            );

            return {
                email: email,
                access_token: token,
            };
        } catch (error) {
            console.debug("error message:", error)
        }
    }

    async get_users() {
        const users = await this.dbService.user.findMany({ where: { status: false } });
        return users
    }

    async userDetail(user_id: number) {
        const res = await this.dbService.user.findUnique({
            where: {
                id: user_id,
            },
        });
        if (!res)
            throw new HttpException(
                { error_code: 'NOT_FOUND', message: 'Kullanıcı bulunamadı' },
                404,
            );

        return res;
    }

    async userActive(id: number): Promise<CompletedDto> {
        const user = await this.dbService.user.findUnique({
            where: {
                id: id
            }
        });
        if (!user)
            throw new HttpException(
                { error_code: 'NOT_FOUND', message: 'Kullanıcı bulunamadı' },
                404,
            );

        await this.dbService.user.update({
            data: {
                role_code: 'VERIFIED_USER',
                status: true
            },
            where: {
                id: id
            }
        });
        return { completed: true }
    }
}
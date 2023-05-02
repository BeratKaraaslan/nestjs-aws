import {
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DbService } from 'app/core/db/db.service';

@Injectable()
export class AuthService {
    constructor(
        private dbService: DbService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    // async signup() {
    //     // generate the password hash
    //     const hash = await argon.hash(dto.password);
    //     // save the new user in the db
    //     try {
    //         const user = await this.dbService.user.create({
    //             data: {
    //                 firstName: dto.firstName,
    //                 lastName: dto.lastName,
    //                 email: dto.email,
    //                 hash,
    //             },
    //         });

    //         return this.signToken(user.id, user.email);
    //     } catch (error) {
    //         if (
    //             error instanceof
    //             PrismaClientKnownRequestError
    //         ) {
    //             if (error.code === 'P2002') {
    //                 throw new ForbiddenException(
    //                     'Credentials taken',
    //                 );
    //             }
    //         }
    //         throw error;
    //     }
    // }

    // async signin(dto: AuthSignin) {
    //     // find the user by email
    //     const user =
    //         await this.dbService.user.findUnique({
    //             where: {
    //                 email: dto.email,
    //             },
    //         });
    //     // if user does not exist throw exception
    //     if (!user)
    //         throw new ForbiddenException(
    //             'Credentials incorrect',
    //         );

    //     // compare password
    //     const pwMatches = await argon.verify(
    //         user.hash,
    //         dto.password,
    //     );
    //     // if password incorrect throw exception
    //     if (!pwMatches)
    //         throw new ForbiddenException(
    //             'Credentials incorrect',
    //         );
    //     return this.signToken(user.id, user.email);
    // }

    // async signToken(
    //     userId: number,
    //     email: string,
    // ): Promise<{ access_token: string, email: string }> {
    //     const payload = {
    //         sub: userId,
    //         email,
    //     };
    //     const secret = this.config.get('JWT_SECRET');

    //     const token = await this.jwt.signAsync(
    //         payload,
    //         {
    //             expiresIn: '120m',
    //             secret: secret,
    //         },
    //     );

    //     return {
    //         email: email,
    //         access_token: token,
    //     };
    // }
}
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import configurations from '../settings/configurations';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		console.log(configurations().secret);
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configurations().secret,
		});
	}

	async validate(payload: any) {
		return payload;
	}
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

/*
Header ile gelen token içindeki model
 */
export class JwtUser {
	id: number
	email: string
	password: string
	name: string
	createdAt: Date
	updatedAt: Date
	rating: Decimal | null
	status: boolean
	role_code: string
}




export const AuthUser = createParamDecorator(
	(data: string, ctx: ExecutionContext): User => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);

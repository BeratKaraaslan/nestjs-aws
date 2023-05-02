import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/*
Header ile gelen token içindeki model
 */
export class JwtUser {
	user_id: number;
	user_title: string;
	user_role: string;
	user_dealer_id: number;
	dealer_id: number;
	client_point: string;
	session_id: string;
	expires: any;
	user_type: any;
}

export class JwtDealerUser {
	user_id: number;
	user_title: string;
	user_role: any;
	user_dealer_id: number;
	dealer_id: number;
	client_point: string;
	session_id: string;
	user_type: string;
	main_brand_id: number;
	expires: any;
}

export const AuthUser = createParamDecorator(
	(data: string, ctx: ExecutionContext): JwtUser => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);

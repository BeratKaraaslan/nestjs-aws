import { ConfigService } from '@nestjs/config';

export default (configService: ConfigService) => ({
	db: configService.get<string>('DATABASE_URL'),
	secret: configService.get<string>('JWT_SECRET'),
	open_api_title: 'Tour Guide App',
	open_api_version: '1',
	swagger_path: 'tour-guide-app',
	port: configService.get<string>('PORT') || 8080,
	accessToken: configService.get<string>('ACCESS_TOKEN'),
	clientId: configService.get<string>('CLIENT_ID'),
	clientSecret: configService.get<string>('CLIENT_SECRET'),
	refreshToken: configService.get<string>('REFRESH_TOKEN'),
	user: configService.get<string>('EMAIL_USER'),
	userEmail: configService.get<string>('EMAIL_USER'),
});
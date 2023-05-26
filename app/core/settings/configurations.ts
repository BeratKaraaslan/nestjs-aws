export default () => ({
	db: process.env.DATABASE_URL,
	secret: process.env.JWT_SECRET,
	open_api_title: 'Tour Guide App',
	open_api_version: '1',
	swagger_path: 'tour-guide-app',
	port: process.env.PORT || 8080,
	accessToken: process.env.ACCESS_TOKEN,
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	refreshToken: process.env.REFRESH_TOKEN,
	user: process.env.EMAIL_USER,
	userEmail: process.env.EMAIL_USER,
});

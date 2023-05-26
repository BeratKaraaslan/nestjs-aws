export default () => ({
	db: process.env.DATABASE_URL,
	secret: process.env.JWT_SECRET,
	open_api_title: 'Tour Guide App',
	open_api_version: '1',
	swagger_path: 'tour-guide-app',
	port: process.env.PORT || 8080,
});

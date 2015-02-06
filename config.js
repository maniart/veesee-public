/*
	@module config
*/
var config = {
	MONGODB_URL: 'mongodb://localhost/veesee',
	port: 3000,
    sessionSecret: 'bb-login-secret',
    cookieSecret: 'bb-login-secret',
    cookieMaxAge: (1000 * 60 * 60 * 24 * 365)
};
 
module.exports = config;
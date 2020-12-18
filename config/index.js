require('dotenv').config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    DB_NAME: process.env.DB_NAME,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    ENV: process.env.ENV,
    SECRET: process.env.SECRET,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
}
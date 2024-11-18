const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    doApiToken: process.env.DO_API_TOKEN,
    appPort: process.env.PORT,
    doImage: process.env.DO_IMAGE,
    dbPort: process.env.DB_PORT,
    dbUsername: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_PORT,
    jwtSecretKey: process.env.JWT_SECRET,
    bucketSpaceName: process.env.BUCKET_SPACE_NAME,
    bucketRegion: process.env.BUCKET_REGION,
    bucketAccessKey: process.env.BUCKET_ACCESS_KEY,
    bucketSecretKey: process.env.BUCKET_SECRET_KEY
};
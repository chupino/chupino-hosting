const AWS = require('aws-sdk');
const {bucketSpaceName, bucketRegion,bucketAccessKey,bucketSecretKey} = require('../../config/config_dotenv')

const uploadFile = async (name,fileContent, path) => {
    const spacesEndpoint = new AWS.Endpoint(`${bucketRegion}.digitaloceanspaces.com/${path}`);
    const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretKey,
    });
    const params = {
        Bucket: bucketSpaceName,
        Key: name,
        Body: fileContent,
        ContentType: 'text/plain',
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (error) {
        throw error
    }
}

module.exports = {
    uploadFile
}
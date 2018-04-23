const uploadToS3 = file => {
  return new Promise((resolve, reject) => {
    let s3bucket = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      Bucket: process.env.AWS_BUCKET_NAME
    });
    let fileFormat = file.name.split('.');
    fileFormat = fileFormat[fileFormat.length - 1];
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: Date.now().toString() + '.' + fileFormat,
      Body: file.data
    };
    s3bucket.upload(params, function (err, data) {
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = uploadToS3;

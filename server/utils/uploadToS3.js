const uploadToS3 = file => {
  return new Promise((resolve, reject) => {
    let s3bucket = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      Bucket: process.env.AWS_BUCKET_NAME
    });
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: Date.now().toString(),
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

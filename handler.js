'use strict';

const { v4 } = require("uuid")
const AWS = require("aws-sdk");
const Avatar = require("./avatar");

if (process.env.NODE_ENV === "development") {
  const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
  AWS.config.credentials = credentials;
}

const s3 = new AWS.S3();

module.exports.main = async (event) => {
  const body = JSON.parse(event.body)
  const buffer = new Avatar().generate(body.avatar)
  const params = {
    Bucket: process.env.BUCKET,
    Key: `${v4()}.svg`,
    Body: buffer,
    ContentType: "image/svg+xml",
    ACL: "public-read"
  };

  const data = await s3.upload(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      avatar: data.Location
    })
  };
};

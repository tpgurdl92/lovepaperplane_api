import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-1",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "clonegram",
    acl: "public-read",
    metadata: function (req, file, cb) {
      console.log("im here");
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function (req, file, cb) {
      console.log("im here 2");
      cb(null, Date.now().toString());
    },
  }),
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  console.log("upload");
  console.log(req.file);
  const {
    file: {
      location
    },
  } = req;
  //defy same-origin-policy
  //res.set({ "access-control-allow-origin": "*" });
  res.json({
    location
  });
};
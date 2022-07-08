// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import COS from 'cos-nodejs-sdk-v5'
import { SecretId, SecretKey, Bucket, Region } from '../../utils/config'

var cos = new COS({
  SecretId,
  SecretKey
});

type Data = {
  name: string
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  var data = req.body.url.replace(/^data:image\/\w+;base64,/, "");
  var buf = Buffer.from(data, 'base64');

  cos.putObject({
    Bucket, /* 必须 */
    Region,    /* 必须 */
    Key: `${req.body.folder}/${req.body.key}`, /* 必须 */
    Body: buf, // 上传文件对象
    onProgress: function (progressData) {
      console.log(JSON.stringify(progressData));
      res.setHeader('Content-Type', 'application/json')
        .status(200)
        .json({ name: 'upload ok' })
    }
  }, function (err, data) {
    console.log(err || data);
    res.status(503).json({ name: 'upload fail' })
  });

}

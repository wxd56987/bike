// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import COS from 'cos-nodejs-sdk-v5'
import { SecretId, SecretKey, Bucket, Region } from '../../utils/config'
import { Rodemap, RoadmapItemType } from '../../utils/types'
import { UrlStart } from '../../utils/config'

var cos = new COS({
  SecretId,
  SecretKey
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Rodemap>
) {

  cos.getBucket({
    Bucket, /* 填入您自己的存储桶，必须字段 */
    Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
    Prefix: '',           /* Prefix表示列出的object的key以prefix开始，非必须 */
  }, function (err, data) {
    console.log(err || data.Contents);

    let arr: RoadmapItemType[] = []
    data.Contents.forEach((item) => {
      arr.push({
        name: item.Key,
        img: UrlStart + item.Key
      })
    })

    let d: Rodemap = {
      v: arr
    }

    res.setHeader('Content-Type', 'application/json')
      .status(200)
      .json(d)
  });

}

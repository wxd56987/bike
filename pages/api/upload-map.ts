// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from '../../utils/config'
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE
});
connection.connect();

type Data = {
  name: any
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  var addSql = 'INSERT INTO bike_map(map_id,title,star,start,end,img,distance,decs) VALUES(0,?,?,?,?,?,?,?)';

  var addSqlParams = [req.body.title, req.body.star, req.body.start, req.body.end, req.body.img, req.body.distance, req.body.dec];

  connection.query(addSql, addSqlParams, function (err: any, result: any) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      res.setHeader('Content-Type', 'application/json')
        .status(503)
        .json({ name: 'err' })
      return;
    }
    res.setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ name: 'ok' })
  });

  connection.end();
}

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
  map: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  var sql = `SELECT * FROM bike_map`;

  connection.query(sql, function (err: any, result: any) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);

      res.setHeader('Content-Type', 'application/json')
        .status(503)
        .json({ map: 'fail' })
      return;
    }
    console.log(result)
    res.setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ map: result })
  });



}

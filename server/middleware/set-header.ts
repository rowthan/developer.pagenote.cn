import {VercelResponse} from "@vercel/node";
import {BasicRequest} from "../typing/Request";
import response from '../utils/response'

export default function setAllowOrigin(req:BasicRequest, res:VercelResponse, next:()=>void) {
  res.setHeader("Access-Control-Allow-Origin", '*')
  res.setHeader("Access-Control-Allow-Headers", "*");

  // option 请求直接响应
  if(req.method === 'OPTIONS'){
    return response(res,null,)
  }

  next();
}

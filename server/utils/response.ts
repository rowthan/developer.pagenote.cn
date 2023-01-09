import {VercelResponse} from "@vercel/node";

export default function (res:VercelResponse,data:any,code=200,httpCode=200) {
  const responseCode = code!==200?code:200
  if(![200,401].includes(code)){
    console.error(data)
  }

  // @ts-ignore
  if(res._responsed){
    return
  }
  // @ts-ignore
  res._responsed = true
  const success = responseCode===200;
  res.status(httpCode).json({
    error: success ? undefined : data,
    data: success ? data : undefined,
    success: success,
  })
}

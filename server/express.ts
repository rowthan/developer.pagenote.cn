import {BasicRequest} from "./typing/Request";
import connectToDatabase from './database';
import setHeader from './middleware/set-header'
import {VercelResponse} from "@vercel/node";

interface Middleware {
  (req: BasicRequest,res:VercelResponse,next?:()=>void):void
}

function express(useDatabase=false) {
  if(useDatabase){
    connectToDatabase();
  }
  let funcs = [setHeader]; // 待执行的函数数组

  const app = async function (req:BasicRequest, res:VercelResponse) {
    function resolve(i:number) {
      const task = funcs[i];  // 取出函数数组里的下一个函数
      if (!task) {    // 如果函数不存在,return
        return;
      }
      const nextIndex = i + 1;
      task(req, res, function () {
        resolve(nextIndex)
      });
    }

    resolve(0);
  }

  /**
   * use方法就是把函数添加到函数数组中
   * @param task
   */
  app.use = function (arg:Middleware,...funs:Middleware[]) {
    funcs = funcs.concat(arg,...funs);
  }

  return app;    // 返回实例
}

export default express



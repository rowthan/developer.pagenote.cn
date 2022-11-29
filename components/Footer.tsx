import React from "react";
import BiliSvg from '../assets/svg/bilibili.svg'
import WechatSvg from '../assets/svg/wechat.svg'
import EmailSvg from '../assets/svg/email.svg'
import GithubSvg from '../assets/svg/github.svg'

export default function Footer() {
  return (
      <>
          {/*<footer className="footer p-4 bg-base-200 text-base-content mt-10">*/}
          {/*    <div>*/}
          {/*        <span className="footer-title">服务</span>*/}
          {/*        <a className="link link-hover">Branding</a>*/}
          {/*        <a className="link link-hover">Design</a>*/}
          {/*        <a className="link link-hover">Marketing</a>*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*        <span className="footer-title">开发者</span>*/}
          {/*        <a className="link link-hover" href='https://github.com/pagenote'>GitHub</a>*/}
          {/*        <a className="link link-hover">项目</a>*/}
          {/*        <a className="link link-hover" href='https://pagenote.cn/release'>发布记录</a>*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*        <span className="footer-title">Legal</span>*/}
          {/*        <a className="link link-hover">Terms of use</a>*/}
          {/*        <a className="link link-hover">隐私协议</a>*/}
          {/*    </div>*/}
          {/*</footer>*/}
          <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300 mt-10">
              <div className="items-center grid-flow-col">
                  <h2>PAGENOTE</h2>
                  <img src="https://pagenote.cn/favicon.ico" width={24} height={24}/>
                  <p>小而美的网页标记工具.<br/>Providing reliable tech since 2022</p>
              </div>
              <div className="md:place-self-center md:justify-self-end">
                  <div className="grid grid-flow-col gap-4">
                      <div className="dropdown dropdown-hover dropdown-top">
                          <label tabIndex={0} className="">
                              <WechatSvg width={24} height={24} />
                          </label>
                          <div tabIndex={0} className="dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
                              <img src="https://pagenote.cn/img/wechat.jpg" alt="微信公众号：pagenote"/>
                          </div>
                      </div>
                      <a href='https://space.bilibili.com/2089824747'>
                          <BiliSvg width={24} height={24} />
                      </a>

                      <a href='mailto:pagenote@126.com'>
                          <EmailSvg width={24} height={24}/>
                      </a>
                      <a href='https://github.com/rowthan/developer.pagenote.cn'>
                          <GithubSvg width={24} height={24} />
                      </a>
                  </div>
              </div>
          </footer>
      </>


  );
}

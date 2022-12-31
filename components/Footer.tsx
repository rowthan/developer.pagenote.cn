import React from "react";
import BiliSvg from '../assets/svg/bilibili.svg'
import WechatSvg from '../assets/svg/wechat.svg'
import GithubSvg from '../assets/svg/github.svg'
import StateSvg from '../assets/svg/state.svg'
import useWhoAmi from "../hooks/useWhoAmi";

export default function Footer() {
    const [whoAmI] = useWhoAmi();
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
          <footer className="footer gap-y-1 px-4 py-4 border-t bg-base-200 text-base-content border-base-300 mt-10 flex md:justify-center">
              <div className="items-center grid-flow-col">
                  <h2>PAGENOTE</h2>
                  <img src="/images/light-64.png" width={24} height={24}/>
                  <p className='hidden md:block'>小而美的网页标记工具.</p>
                  <a className={'link link-info badge badge-outline badge-sm'} href={'https://pagenote.cn/release'} target={'_blank'}>{whoAmI?.version || '未安装'}</a>
              </div>
              <div className="md:place-self-center md:justify-self-end">
                  <div className="grid grid-flow-col gap-4">
                      <div className="dropdown dropdown-hover dropdown-top">
                          <label tabIndex={0} className="">
                              <WechatSvg width={24} height={24} />
                          </label>
                          <div tabIndex={0} className="dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
                              <img src="/images/wechat.jpg" alt="微信公众号：pagenote"/>
                          </div>
                      </div>
                      <a href='https://space.bilibili.com/2089824747' target='_blank'>
                          <BiliSvg width={24} height={24} />
                      </a>
                      <a href='https://github.com/rowthan/developer.pagenote.cn' target='_blank'>
                          <GithubSvg width={24} height={24} />
                      </a>
                  </div>
              </div>
          </footer>
      </>


  );
}

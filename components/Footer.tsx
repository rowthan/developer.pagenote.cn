import Link from 'next/link';
import React, {ReactElement} from "react";


const ExternalLink = ({ href, children }: {href: string, children: ReactElement}) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-600 transition"
          >
            首页
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://github.com/pagenote">
            <span>GitHub</span>
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="https://pagenote.cn/release"
            className="text-gray-500 hover:text-gray-600 transition"
          >
            发布记录
          </Link>
        </div>
      </div>
    </footer>
  );
}

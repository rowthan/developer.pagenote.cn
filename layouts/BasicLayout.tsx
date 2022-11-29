import {PropsWithChildren} from "react";
import Head from "next/head";
import {useTheme} from "next-themes";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

// 给普通用户访问的页面，基础layout
export default function BasicLayout(props: PropsWithChildren<{title?: string,description?: string}>) {
    const { resolvedTheme, setTheme } = useTheme();
    const { children, ...customMeta } = props;
    const meta = {
        title: 'PAGENOTE',
        description: `一页一记 pagenote，开发者中心.`,
        type: 'website',
        ...customMeta
    };

    return(
        // bg-gray-50 dark:bg-gray-900
        <div className='min-h-screen mx-auto w-3/4'>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="PAGENOTE" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <link rel="shortcut icon" href="https://pagenote.cn/favicon.ico" type="image/x-icon" />
            </Head>
            <nav>
                <Breadcrumbs />
            </nav>
            <main className='min-w-min mx-auto min-h-3/4'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

import {PropsWithChildren} from "react";
import Head from "next/head";
import {useTheme} from "next-themes";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

// 给普通用户访问的页面，基础layout
export default function BasicLayout(props: PropsWithChildren<{nav?:boolean, footer?: boolean,title?: string,description?: string, full?: boolean}>) {
    const { resolvedTheme, setTheme } = useTheme();
    const { children,nav=true,footer=true,full=false, ...customMeta } = props;
    const meta = {
        title: customMeta.title || '小而美的网页标记工具',
        description: customMeta.description || `一页一记 pagenote，开发者中心.`,
        type: 'website',
    };

    return(
        // bg-gray-50 dark:bg-gray-900
        <div className={`mx-auto ${full? '' : 'w-3/4'}`}>
            <Head>
                <title>{meta.title} - PAGENOTE</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="PAGENOTE" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <link rel="shortcut icon" href="https://pagenote.cn/favicon.ico" type="image/x-icon" />
            </Head>
            {
                nav &&
                <nav>
                    <Breadcrumbs />
                </nav>
            }
            <main className='min-w-min mx-auto min-h-screen'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

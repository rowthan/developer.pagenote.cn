import Footer from "../components/Footer";
import {useRouter} from "next/router";
import {useEffect} from "react";

const redirectMap: Record<string, string> = {
    '/log': '/developer/log',
    '/projects': '/developer/project',
    '/feedback': '/contact/feedback',
    '/debug': '',
    '/demo': '/developer/demo',
    '/trash': '/manage/trash',
    '/page': '/manage/page',
    '/light': '/manage/light',
    '/manage/pages': '/manage/page',
    '/questions': '/question',
}

export default function Custom404() {
    const router = useRouter();

    useEffect(function () {
        const redirectUrl = redirectMap[router.asPath];
        if(redirectUrl){
            router.replace(redirectUrl)
        }else{
            if(router.asPath.indexOf('.html')){
                const path = router.asPath.replace('.html','');
                router.replace(path)
            }
        }
    },[router.asPath])

    return (
        <div>
            <div className='max-w-4xl m-auto '>
                <h1>404 - Page Not Found</h1>
            </div>
            <Footer />
        </div>
    )
}

import NextLink from 'next/link';
import {Fragment, useMemo} from "react";
import {useRouter} from "next/router";

export interface RouteInfo {
    id: string,
    name: string,
    path: string,
    disable?: boolean
    children?: RouteInfo[],
}

const routesMap: RouteInfo = {
    id: 'home',
    name: '首页',
    path: '',
    children: [{
        name: '管理',
        path: '/manage',
        id: 'manage',
        disable: true,
        children: [
            {
                id: 'trash',
                name: '回收站',
                path: '/manage/trash',
            },
            {
                id: "pages",
                name: '网页',
                path: '/manage/pages',
            }
        ]
    }, {
        name: '开发者',
        path: '/',
        id: 'developer',
        children: [
            {
                id: 'demo',
                name: '示例',
                path: '/demo',
            },
            {
                id: "web",
                name: '网页',
                path: '/pages',
            }
        ]
    }]
}


export default function (props: { id: string }) {
    const {id = ''} = props;
    // const routes = id?.split('.');
    const {asPath} = useRouter();

    // const currentPathArray = asPath.split('/')


    // const routesArray = routes.map(function (key, index) {
    //     const pathKey = routes.slice(0, index + 1).join('.');
    //     const routeInfo = get(routesMap, pathKey);
    //     console.log('route', routeInfo)
    //     return routeInfo
    // }).filter(function (item) {
    //     return !!item;
    // })

    return (
        <div className="text-sm breadcrumbs overflow-visible">
            {
                useMemo(() => (
                    <ul>
                        {/*{*/}
                        {/*    [routesMap].map(function (item) {*/}
                        {/*        return <NextLink key={item.name} href={item.path}>{item.name}</NextLink>*/}
                        {/*    })*/}
                        {/*}*/}
                        <RenderRouteGroup routeArray={[routesMap]} level={0}/>
                    </ul>
                ), [asPath])
            }
        </div>
    )
}

function RenderLink(props: { route: RouteInfo }) {
    const {route} = props;
    return (
        (route.disable || !route.path) ?
            <span>
                {route.name}
            </span> :
            <NextLink href={route.path || '/'}>
                {route.name}
            </NextLink>
    )
}

function RenderRouteGroup(props: { routeArray: RouteInfo[], level: number }) {
    const {asPath} = useRouter();
    const {level} = props;
    console.log('---', asPath)
    const {routeArray = []} = props
    const currentPathArray = asPath.split('/');

    function checkRouteMatched(route: RouteInfo) {
        return route.path === currentPathArray.slice(0, level + 1).join('/')
    }

    return (
        <Fragment>
            {
                routeArray.map((route) => {
                    const currentMatched = checkRouteMatched(route)
                    return <Fragment key={route.name}>
                        {
                            currentMatched &&
                            <li key={route.name}>
                                {
                                    <div>
                                        <div className="dropdown dropdown-hover">
                                            <label tabIndex={0} className="">
                                                <RenderLink route={route}/>
                                            </label>
                                            {
                                                <ul tabIndex={0}  className="dropdown-content py-1 shadow bg-base-100 min-w-10">
                                                    {
                                                        // 同级菜单
                                                        routeArray.map(function (item) {
                                                            return (
                                                                checkRouteMatched(item) ?
                                                                <Fragment key={item.path}></Fragment> :
                                                                <li key={item.path}>
                                                                    <RenderLink route={item}/>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            }
                                        </div>
                                    </div>

                                }
                            </li>
                        }
                        {route.children?.length && <RenderRouteGroup routeArray={route.children} level={level + 1}/>}
                    </Fragment>
                })
            }
        </Fragment>
    )
}

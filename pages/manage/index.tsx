import {useEffect, useState} from "react";
import {WebPage} from "@pagenote/shared/lib/@types/data";
import extApi from "@pagenote/shared/lib/generateApi";
import dayjs from 'dayjs';
import BlogLayout from "../../layouts/blog";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function () {

    return(
        <BlogLayout post={{excerpt: '与PAGENOTE通信',title: '开发你自己的数据管理页面'}}>
            <Breadcrumbs id={''} />
        </BlogLayout>
    )
}

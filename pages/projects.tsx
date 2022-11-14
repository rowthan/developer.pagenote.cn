import React, {ReactElement} from "react";
import dayjs from "dayjs";
import BlogLayout from "../layouts/blog";
import Tag from "../components/Tag";
import Star from "../components/Star";

const projects: {
    github: string;
    name: string;
    description: string;
    skills: string[];
    score: number;
    recommend: boolean
}[] = [{
    github: "https://github.com/rowthan/whats-element",
    name: "whats-element",
    description: "此库的主要作用是，为每一个HTML dom 节点，计算出它在 DOM 结构中的唯一标识符，是标记定位的最基础核心的能力库。是一个很有趣的项目，锻炼逻辑能力。强烈建议参与维护。",
    skills: ["JavaScript"],
    recommend: true,
    score: 1
}, {
    github: "https://github.com/pagenote/pagenote",
    name: "pagenote sdk",
    description: "这是在 whats-element 上构建的标注SDK，插件最核心的项目，实现在任意网页标记、批注的能力。此项目正在重新重构修改，当下不建议参与维护。",
    skills: ["TypeScript", "Sevlte","WebComponent"],
    recommend: false,
    score: 5
}, {
    github: "https://github.com/rowthan/developer.pagenote.cn",
    name: "pagenote web",
    description: "pagenote 标记管理 Web 应用。强烈建议参与维护。这里所有的内容都希望大家来参与，目前刚重新启动的项目。",
    skills: ["TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    recommend: true,
    score: 2
}, {
    github: "",
    name: "pagenote extension",
    description: "",
    skills: ["TypeScript", "Chrome extension",],
    recommend: false,
    score: 4
},
    // {
    // github: "",
    // name: "pagenote API",
    // description: "pagenote 的数据同步解决方案，用户可以自行部署此服务。",
    // skills: ["TypeScript", "Node.js","MongoDB"],
    // recommend: false,
    // score: 3
    // }
]

const InstallBar: React.FC = function () {


    return (
        <BlogLayout post={{
            title: 'PAGENOTE 插件所有项目',
            excerpt: 'PAGENOTE 由多个组件项目组成，你可以根据兴趣和掌握技能参与某个或多个项目的维护'
        }}>
            {
                projects.map(function (item) {
                    return (
                        <div key={item.name} className={`p-2 mb-3 border border-blue-200 rounded ${item.recommend ? '' : ''}`}>
                            <code>
                                <a href={item.github}>{item.name}</a>
                            </code>
                            {item.github ? '' : <span className={'text-sm text-gray'}>待开放</span>}
                             <div>
                            <span className='text-sm text-gray-500'>
                                {item.description}
                            </span>
                                <div>
                                    技术栈： {
                                    item.skills.map(function (item) {
                                        return <Tag tag={item} key={item}/>
                                    })
                                }
                                </div>
                                <div>
                                    上手难度：<Star score={item.score}></Star>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </BlogLayout>
    )
}

export default InstallBar

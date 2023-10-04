## PAGENOTE 开发者中心

* [开发者管理页面](https://pagenote.cn)

## 启动

```shell
# 安装依赖, 推荐使用 pnpm 
pnpm install
```

```shell
# 开发模式
npm run dev
# 打包全站
npm run build
# 仅打包插件内页面
npm run build-ext
```

注意： 仅 localhost 或 127.0.0.1 主域可以与 PAGENOTE 插件进行通信。
[开发访问： http://localhost:3000](http://localhost:3000)

## 相关物料

> 为了保证组件的简单、通用，请尽量使用以下 css 套件完成样式绘制，组件推荐 shadcn。

* [tailwind css ](https://www.tailwindcss.cn/docs/preflight)
* [shadcn](https://ui.shadcn.com/)

## todo

[-] 所有页面内存占用控制在 120MB以内 

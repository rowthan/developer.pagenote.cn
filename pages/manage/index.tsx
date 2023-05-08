import BlogLayout from '../../layouts/blog'
import Breadcrumbs from '../../components/Breadcrumbs'

export default function ManagePage() {
  return (
    <BlogLayout
      post={{ excerpt: '与PAGENOTE通信', title: '开发你自己的数据管理页面' }}
    >
      <Breadcrumbs />
    </BlogLayout>
  )
}

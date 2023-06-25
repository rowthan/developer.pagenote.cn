import PageManage from '../../components/manage/page/PageManage'
import ExtLayout from 'layouts/ExtLayout'

export default function Pagenote() {
  return (
    // 所有子节点用div包裹
    <ExtLayout title="我的PAGENOTE网页笔记">
      <PageManage />
      {/* 服务端渲染下，不支持客户端路由模式 */}
      {/* <Router>
                <Routes>
                    <Route path='/page' element={<PageManage />}/>
                    <Route path='*' element={<PageManage />}/>
                </Routes>
            </Router> */}
    </ExtLayout>
  )
}

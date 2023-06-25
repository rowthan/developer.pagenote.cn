import ActionItem from '../../list/ActionItem'
import { TbDatabaseExport } from 'react-icons/tb'
import { MdDeleteSweep } from 'react-icons/md'
import { RxReset } from 'react-icons/rx'
import { batchUpdate, batchExportByPageKeys } from 'service/ext'
import { toast } from '../../../utils/toast'

interface Props {
  pageKeys: string[] // 基于 page key 的批量操作
  onChange: () => void
}

export default function Actions(props: Props) {
  const { pageKeys = [], onChange } = props

  function backup() {
    batchExportByPageKeys(pageKeys).then(function (res) {
      if (res?.data?.filename) {
        toast('备份保存至：' + res.data.filename)
        onChange()
      } else {
        toast('备份失败', 'error')
      }
    })
  }

  function toggleDelete(deleted: boolean) {
    batchUpdate(pageKeys, {
      deleted: deleted,
    }).then(function (result) {
      console.log(result, 'remove result')
      if (result.data === pageKeys.length) {
        toast(deleted ? '已删除' : '已恢复')
      } else {
        toast('操作异常', 'error')
      }
      onChange()
    })
  }

  return (
    <div>
      <div>
        <ActionItem
          name={'备份导出'}
          icon={<TbDatabaseExport />}
          onClick={backup}
        ></ActionItem>
        {/*<ActionItem name={'添加标签'} icon={<AiFillTags />}>*/}
        {/*  <input type="text" placeholder={'批量添加标签'} />*/}
        {/*  <button>保存</button>*/}
        {/*</ActionItem>*/}
        <ActionItem
          name={'批量删除'}
          icon={<MdDeleteSweep />}
          onClick={() => {
            toggleDelete(true)
          }}
        ></ActionItem>
        <ActionItem
          name={'批量恢复'}
          icon={<RxReset />}
          onClick={() => {
            toggleDelete(false)
          }}
        ></ActionItem>
      </div>
    </div>
  )
}

Actions.defaultProps = {}

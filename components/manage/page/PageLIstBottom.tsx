import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { context } from '../../../store/ContextProvider'
import Modal from '../../Modal'
import Actions from '../batch/Actions'
import usePageList from '../../../hooks/store/usePageList'
import usePageGroup from '../../../hooks/store/usePageGroup'
import useWebpage from '../../../hooks/useWebpage'

interface Props {
  children?: ReactNode
}

export default function PageLIstBottom(props: Props) {
  const { children } = props
  const allCheckRef = useRef<HTMLInputElement>(null)
  const { selectedPageKey, batchSelected = new Set<string>() } =
    useContextSelector(context, (v) => v[0])
  const setState = useContextSelector(context, (v) => v[1])
  const [showModal, setModal] = useState(false)
  const selectedCnt = batchSelected?.size || 0
  const [pageList = [], refreshPages] = usePageList()
  const [_groups, refreshGroup] = usePageGroup()
  const { mutate } = useWebpage(selectedPageKey)

  function toggleAll() {
    if (batchSelected?.size) {
      setState({
        batchSelected: new Set(),
      })
    } else {
      const newSet: Set<string> = new Set()
      pageList.forEach(function (page) {
        if (page.key) {
          newSet.add(page.key)
        }
      })
      setState({
        batchSelected: newSet,
      })
    }
  }

  function refreshPage() {
    refreshPages()
    refreshGroup()
    mutate()
    setModal(false)
    setState({
      batchSelected: new Set(),
    })
  }

  useEffect(
    function () {
      if (!allCheckRef.current) {
        return
      }
      if (selectedCnt > 0 && selectedCnt !== pageList.length) {
        allCheckRef.current.indeterminate = true
      } else {
        // @ts-ignore
        allCheckRef.current.indeterminate = undefined
      }
    },
    [selectedCnt]
  )

  return (
    <div className="w-full text-sm text-color-300 px-4 flex items-center justify-between">
      <label className="flex items-center">
        <input
          onChange={toggleAll}
          ref={allCheckRef}
          checked={selectedCnt > 0}
          type="checkbox"
          className="checkbox mx-1"
        />
        {selectedCnt > 0 && <span>{selectedCnt} / </span>}
        <span>{pageList.length} pages</span>
      </label>
      <button
        className="btn btn-xs"
        disabled={selectedCnt < 1}
        onClick={() => {
          setModal(true)
        }}
      >
        批量操作
      </button>
      <Modal toggleOpen={setModal} open={showModal}>
        <Actions pageKeys={Array.from(batchSelected)} onChange={refreshPage} />
      </Modal>
    </div>
  )
}

PageLIstBottom.defaultProps = {}

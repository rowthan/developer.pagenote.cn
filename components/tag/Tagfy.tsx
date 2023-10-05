import * as React from 'react'
import { type ReactNode, useEffect, useState } from 'react'
import ButtonIcon from 'components/button/IconButton'
import { PiHashStraightDuotone as TagIcon } from 'react-icons/pi'
import Tag from './Tag'
import { TagsInput } from 'react-tag-input-component'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import useWebpage from '../../hooks/useWebpage'
import useTabPagenoteState from '../../hooks/useTabPagenoteState'
import Keywords from '../Keywords'

interface Props {
  children?: ReactNode
  pageKey: string
}

interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
}

function TagItem(props: TagProps) {
  const { color, ...left } = props
  return (
    <ButtonIcon className={'text-xs'} {...left}>
      <TagIcon />
    </ButtonIcon>
  )
}

export default function Tagfy(props: Props) {
  const { pageKey } = props
  const { data, updateServer } = useWebpage(pageKey)
  const [open, setOpen] = useState(false)
  const tags: string[] = data?.categories || [] // ['red','green','yellow'];
  const [content] = useTabPagenoteState()
  // @ts-ignore todo
  const keywords: string[] = content?.keywords || []
  const set = new Set(tags)

  useEffect(
    function () {
      // setSelected(tags)
    },
    [tags]
  )

  function updateTags(tags: string[]) {
    // setSelected(tags);
    updateServer({
      categories: tags,
    })
  }

  function addTag(tag: string) {
    set.add(tag)
    updateTags(Array.from(set))
  }

  function search(value: string) {
    console.log(value)
  }

  return (
    <>
      <div
        onClick={() => {
          setOpen(true)
        }}
        className={
          ' py-2 relative w-full min-h-4 flex gap-1 items-center group hover:bg-card'
        }
      >
        {tags.length === 0 && <TagItem />}
        {tags.map((color, index) => (
          <Tag key={color}>#{color}</Tag>
        ))}
        {/*<IconButton  className={' text-xs text-muted-foreground hidden group-hover:flex'}>*/}
        {/*    <PlusCircledIcon className={'inline-block'} />*/}
        {/*    */}
        {/*</IconButton>*/}
        <span
          className={' text-xs text-muted-foreground hidden group-hover:flex'}
        >
          点击管理标签
        </span>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger></SheetTrigger>
        <SheetContent side={'top'}>
          <SheetHeader>
            <SheetTitle>添加标签</SheetTitle>
            <SheetDescription>
              添加标签，有利于你系统的管理网页、快速的搜索分类。
            </SheetDescription>
          </SheetHeader>
          <div className={'py-6'}>
            <TagsInput
              value={tags}
              onChange={updateTags}
              name="categories"
              placeHolder="请添加标签"
              classNames={{
                tag: 'text-blue-400 text-sm',
              }}
              // @ts-ignore
              onKeyUp={(e) => search(e.target?.value)}
            />
            <div className={'mt-2'}>
              <h3>推荐标签</h3>
              {keywords.map((word, index) =>
                set.has(word) ? null : (
                  <Keywords
                    onClick={() => {
                      addTag(word)
                    }}
                    key={word}
                  >
                    {word}
                  </Keywords>
                )
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

Tagfy.defaultProps = {}

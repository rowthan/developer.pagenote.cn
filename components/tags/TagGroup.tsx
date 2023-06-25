import { useEffect, useRef, useState } from 'react'

import TagItem from './TagItem'
import Tag3 from 'assets/svg/Tag3.svg'
import { IoMdAddCircleOutline } from 'react-icons/io'

interface Props {
  tags: string[]
  onSave: Function
}

export default function TagGroup({ tags: innerTags = [], onSave }: Props) {
  const [editing, setEditing] = useState(false)
  const [focus, setFocus] = useState(false)
  const inputRef = useRef(null)

  useEffect(
    function () {
      let timer = setTimeout(function () {
        if (!focus) {
          setEditing(false)
        }
      }, 6 * 1000)
      return function () {
        timer && clearTimeout(timer)
      }
    },
    [editing, focus]
  )

  function onDelete(index: number) {
    innerTags.splice(index, 1)
    onSave(innerTags)
  }

  function submitNewTag() {
    // @ts-ignore
    const currentInput = inputRef?.current || {
      value: '',
      focus: function () {},
    }
    const value = currentInput?.value
    if (!value) {
      return
    }
    const newTags = [...innerTags, value]
    currentInput.value = ''
    currentInput?.focus()
    onSave(newTags)
  }

  function onFocus() {
    setEditing(true)
    setTimeout(function () {
      // @ts-ignore
      inputRef?.current?.focus()
    }, 200)
  }

  function onkeyup(e: React.KeyboardEvent) {
    // const tempFocus = focus;
    // setFocus(true);
    // setTimeout(function () {
    //     setFocus(tempFocus && focus);
    // },6*1000)
    console.log(e.key)
    if (e.key === 'Enter') {
      submitNewTag()
    } else if (e.key === 'Escape') {
      setEditing(false)
    }
  }

  return (
    <div
      className={'flex items-center overflow-hidden'}
      onDoubleClick={onFocus}
      onMouseEnter={() => {
        console.log('en')
        setFocus(true)
      }}
      onMouseLeave={() => {
        console.log('out')
        setFocus(false)
      }}
    >
      <span className={'setting'} onClick={onFocus}>
        <Tag3 />
      </span>
      {innerTags.map((category: string, index: number) => (
        <button
          onClick={() => {
            if (!editing) {
              setEditing(true)
            }
          }}
          key={category}
        >
          <TagItem
            onDelete={() => {
              onDelete(index)
            }}
            editing={editing}
          >
            <span>{category}</span>
          </TagItem>
        </button>
      ))}
      {editing && (
        <div className={'flex mx-2 overflow-hidden'}>
          <input
            ref={inputRef}
            type="text"
            className={'text-sm indent-1'}
            placeholder={'添加标签'}
            max={20}
            onKeyUp={onkeyup}
          />
          <button onClick={submitNewTag}>
            <IoMdAddCircleOutline width={14} height={14} />
          </button>
        </div>
      )}
    </div>
  )
}

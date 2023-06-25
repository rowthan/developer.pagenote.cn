// @ts-nocheck
import { type ReactNode, useCallback } from 'react'
import React, { useMemo } from 'react'
import { Editor, createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Step } from '@pagenote/shared/lib/@types/data'
import {
  htmlToSlate,
  slateToHtml,
  payloadSlateToDomConfig,
} from 'slate-serializers'
import extApi from '@pagenote/shared/lib/pagenote-api'
import { debounce } from 'lodash'
import BasicEditor from 'components/editor/BasicEditor'

interface Props {
  children?: ReactNode
  steps?: Step[]
}

const LightBlock = (props: {
  attributes: any
  children?: any
  element: { data: Step }
}) => {
  const light = props.element.data
  const { children, attributes } = props
  console.log(props)
  return (
    <div
      {...attributes}
      contentEditable={false}
      className={'hover:bg-gray-100 p-1'}
    >
      {/*<div contentEditable={false}>*/}
      {/*    /!*<span>{props.element.data.pre}</span>*!/*/}
      {/*    <b className={'border-b border-dashed'} style={{borderColor: light.bg}}>*/}
      {/*        {light.text}*/}
      {/*    </b>*/}
      {/*    /!*<span>{props.element.data.suffix}</span>*!/*/}
      {/*</div>*/}
      {/*<b className={'border-b border-dashed'} style={{borderColor: light.bg}}>*/}
      {/*    {light.text}*/}
      {/*</b>*/}
      {/*<div>*/}
      {/*    {light.text}*/}
      {/*</div>*/}

      <div
        className={'border-l-4 pl-2 border-solid '}
        style={{ borderColor: light.bg }}
      >
        {light?.text}
      </div>
      {/*<div data-tip={light.lightId} className={'text-gray-400 text-sm mb-2'}>*/}
      {/*   */}
      {/*</div>*/}

      <div className={'ml-3'}>
        <BasicEditor />
      </div>
      {children}
    </div>
  )
}

const HtmlBlock = (props: { children?: any; element: { html: string } }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: props.element.html }} />
    </div>
  )
}

const defaultEmptyNode = [
  {
    children: [{ text: '---' }],
  },
]

const withEmbeds = (editor: Editor) => {
  const { isVoid } = editor
  editor.isVoid = (element: { type: string }) =>
    element.type === 'light-block' ? true : isVoid(element)
  return editor
}

export default function SlateEditor(props: Props) {
  const { children, steps = [] } = props
  const editor = useMemo(() => withEmbeds(withReact(createEditor())), [])

  const initialValue: (Descendant & { type: string })[] = steps?.map((item) => {
    const slate = htmlToSlate(item.tip || '')
    console.log(slate, '--slate', item.tip)
    const children =
      slate.length > 0
        ? slate
        : [
            {
              text: 'Try it out! This editor is built to handle Vimeo embeds, but you could handle any type.',
            },
          ] // 这里一层，会导致回车 新增一个 light-block 节点
    return {
      type: 'light-block',
      data: item,
      children: children,
    }
  })

  console.log(initialValue, 'initialValue')

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'light-block':
        return <LightBlock {...props} />
      default:
        return (
          <p {...props.attributes} data-block={'default'}>
            {props.children}
          </p>
        )
    }
  }, [])

  function updateLight(lightId: string, data: Partial<Step>) {
    console.log(lightId, data, 'updateLight')
    extApi.light
      .update({
        query: {
          lightId: lightId,
        },
        data: data,
      })
      .then((res) => {
        console.log(res, 'updateLight', data)
      })
  }

  const onchange = debounce((value: any[]) => {
    console.log(value, 'value', editor, editor.selection)
    const path = editor.selection?.focus.path
    if (path) {
      const node = Editor.node(editor, path)
      console.log(node, 'node')
    }
    value.forEach((item) => {
      const html = slateToHtml(item.children, {
        ...payloadSlateToDomConfig,
        encodeEntities: false,
      })

      // console.log('before update',item.data,html)
      // updateLight(item.data.lightId,{
      //     tip: html
      // })
    })
  }, 1000)

  return (
    <div className="">
      <Slate editor={editor} value={initialValue} onChange={onchange}>
        <Editable
          renderElement={renderElement}
          placeholder="留下一些笔记..."
          renderPlaceholder={({ children, attributes }) => (
            <div {...attributes}>
              <p>{children}</p>
              <pre className={''}>
                笔记需要依托于一个标记之上；当标记删除时，笔记也会一并删除。
              </pre>
            </div>
          )}
        />
      </Slate>
    </div>
  )
}

SlateEditor.defaultProps = {}

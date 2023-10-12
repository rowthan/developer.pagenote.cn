import { Color } from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
// import {EditorOptions} from "@tiptap/core/src/types";

const extensions = [
  Link.configure(),
  Image.configure(),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // @ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Placeholder.configure({
    placeholder: () => {
      return '在此网页上留下关联备忘录'
    },
  }),
]

export interface EditorChangeContent {
    htmlContent: string,
    jsonContent?: Object,
}

export interface EditorProps {
    htmlContent: string,
    jsonContent?: Object,
    onUpdate: (content: EditorChangeContent) => void
}

function Editor(props: EditorProps) {
  const onUpdate = function (data: {
    editor: { getHTML: () => any; getJSON: () => any }
  }) {
    props.onUpdate({
      htmlContent: data.editor.getHTML(),
      jsonContent: data.editor.getJSON(),
    })
    console.log(data, data.editor.getJSON())
    return undefined
  }

  return (
    // @ts-ignore
    <EditorProvider
      autofocus={true}
      onUpdate={onUpdate}
      extensions={extensions}
      content={props.htmlContent}
    >
      <div className={'children'}></div>
    </EditorProvider>
  )
}

export default Editor

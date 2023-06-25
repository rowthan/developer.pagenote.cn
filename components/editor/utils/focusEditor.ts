import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react'

// https://zhuanlan.zhihu.com/p/366744192
// https://stackoverflow.com/questions/62870859/moving-cursor-in-react-slate-editor

export default function focusEditor(editor:ReactEditor,end: boolean = true) {
    if(!editor) return;
    console.log(editor.selection,'selection')
    const editorEl = ReactEditor.toDOMNode(editor, editor)

  if (editor.selection) {
    const domRange = ReactEditor.toDOMRange(editor, editor.selection)
    const domSelection = window.getSelection()
    if(domSelection) {
        domSelection.removeAllRanges()
        domSelection.addRange(domRange)
    }
    editorEl.focus()
  } else {
    ReactEditor.focus(editor);
    if(end){
        Transforms.select(editor, Editor.end(editor, []));
    }
  }
}

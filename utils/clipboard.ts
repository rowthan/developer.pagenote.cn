export function writeTextToClipboard(text: string) {
  try {
    return navigator.clipboard.writeText(text)
  } catch (e) {
    const textarea = document.createElement('textarea')
    textarea.textContent = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('Copy', false, '')
    document.body.removeChild(textarea)
    return Promise.resolve()
  }
}

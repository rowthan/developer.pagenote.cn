export function getMb(kb: number) {
  return (kb / 1024 / 1024).toFixed(1) + 'Mb'
}

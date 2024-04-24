export interface FileChunk {
  file: Blob
  cur?: number
  index: number
  hash: string
  binary: string
}
export interface IProps {
  useWebsocket?: boolean
  waitSliceMerge?: boolean
}

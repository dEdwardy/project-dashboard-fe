export interface IProps<T> {
  estimatedHeight?: number
  dataSource: T[]
  loading?: boolean
  maxCount?: number
}
export interface IEstimatedListProps<T> {
  estimatedHeight: number
  dataSource: T[]
  loading?: boolean
  maxCount?: number
}
interface DefaultSlotProps {
  item: any
}
export interface ISlot {
  default: (props: DefaultSlotProps) => any
}
export interface IPostions {
  index: number
  top: number
  bottom: number
  height: number
  dHeight: number
  over?: boolean
}
export interface IPosInfo {
  index: number
  top: number
  bottom: number
  height: number
  dHeight: number
}

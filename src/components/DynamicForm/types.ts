import type { Component, Slots } from 'vue'
import type { ComponentString } from './ComponentMaps'

export type FormItemType = 'list' | 'group'
export type DynamicFormSchema = IFormItem[]
export type DynamicFormProps = IFormProps

export interface ColProps {
  span: number
  offset: number
}
export interface IFormProps {
  schema: DynamicFormSchema
  model: any
  rules?: any
  submitHidden?: boolean
  labelColProps?: any
  wrapperColProps?: any
  disabled?: boolean
  size?: 'mini' | 'small' | 'medium' | 'large'
}
type IFormatFn = ({ data }: { data: Record<string, any> }) => any
export interface IFormItem {
  label?: string
  labelWidth?: string | number
  labelPosition?: string
  key?: string // 对应表单提交key
  format?: IFormatFn // TODO 表单组件数据结构调整
  component?: Component | ComponentString
  slots?: Slots
  componentProps?: Record<string, any>
  rules?: Get<any[], ICallWithArgs>
  required?: Get<boolean, ICallWithArgs>
  children?: DynamicFormSchema
  type?: FormItemType
  show?: Get<boolean, ICallWithArgs>
  min?: Get<number> // only work when type === 'list'
  max?: Get<number> // only work when type === 'list'
  dependencies?: string[] // TODO 依赖处理
}
interface ICallWithArgs {
  data: Record<string, unknown>
  value: unknown
}
type Fn<T, P = any> = (args: P) => T
type Get<T, P = any> = T | Fn<T, P>

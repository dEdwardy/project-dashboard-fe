import type { Component } from 'vue'
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
  labelWidth?: number | string | undefined
  labelPosition?: 'top' | 'left' | 'right'
  submitHidden?: boolean
  disabled?: boolean
  size?: 'mini' | 'small' | 'medium' | 'large'
  layout?: any // 布局组件
  inline?: boolean
  showMessage?: boolean
}
type IFormatFn = ({ data }: { data: Record<string, any> }) => any
export interface IFormItem {
  label?: string
  labelWidth?: number | string | undefined
  labelPosition?: string
  key?: string // 对应表单提交key
  defaultValue?: any //  modelValue 不存在时的默认值
  format?: IFormatFn // TODO 表单组件数据结构调整  later 暂时不想考虑 反正做了双向绑定
  component?: Component | ComponentString
  slots?: Record<string, IFormItem[] | string> //  TODO
  layout?: any // 布局组件
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

export interface RadioProps {
  modelValue: any
  options: Options[]
  layout?: string
}
export interface Options {
  label: any
  value: any
}
export interface SelectProps {
  modelValue: any
  options: Options[]
  multiple?: boolean
  clearable?: boolean
  filterable?: boolean
  filterMethod?: Function
}
export interface CheckboxGroupProps {
  modelValue: any[]
  options: Options[]
  layout?: string
}

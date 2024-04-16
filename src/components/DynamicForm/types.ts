import type { ComponentString } from './ComponentMaps'

export type FormItemType = 'list' | 'group'
export type DynamicFormSchema = IFormItem[]
export type DynamicFormProps = IFormProps
export interface IFormProps {
  schema: DynamicFormSchema
  model: any
  rules?: any
}
export interface IFormItem {
  label: string
  key: string
  component?: Component | ComponentString
  rules?: Get<any[], ICallWithArgs>
  required?: Get<boolean, ICallWithArgs>
  children?: DynamicFormSchema
  type?: FormItemType
  show?: Get<boolean, ICallWithArgs>
  min?: Get<number> // only work when type === 'list'
  max?: Get<number> // only work when type === 'list'
}
interface ICallWithArgs { data: Record<string, unknown>, value: unknown }
type Fn<T, P = any> = (args: P) => T
type Get<T, P = any> = T | Fn<T, P>

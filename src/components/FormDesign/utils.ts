import { nanoid } from 'nanoid'
import type { InjectionKey } from 'vue'

export const generateId = (size: number = 21) => nanoid(size)
interface FormProps {
  align: 'left' | 'right' | 'top'
  labelWidth: string | number
  size: 'mini' | 'small' | 'medium' | 'large'
}
interface FormItemProps {
  id: string
  [key: string]: any
}
export interface FormConfig {
  formProps: FormProps
  formItemProps?: FormItemProps[]
}
export const formConfigSymbol: InjectionKey<FormConfig>
  = Symbol('formConfigSymbol')

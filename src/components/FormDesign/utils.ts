import { nanoid } from 'nanoid'
import type { InjectionKey } from 'vue'

export const generateId = (size: number = 21) => nanoid(size)
interface FormProps {
  labelPosition: 'left' | 'right' | 'top'
  labelWidth: string | number
  size: 'large' | 'default' | 'small'
}
interface FormItemProps {
  id: string
  props: any
  [key: string]: any
}
export interface FormConfig {
  formProps: FormProps
  formItemProps?: FormItemProps[]
}
export const formConfigSymbol: InjectionKey<FormConfig> = Symbol('formConfigSymbol')

export const setFormPropsSymbol: InjectionKey<(data: any) => void> = Symbol('setFormPropsSymbol')

export const setFormItemPropsSymbol: InjectionKey<(data: any) => void> = Symbol('setFormItemPropsSymbol')

export const setCurrentSymbol: InjectionKey<(index: number) => void> = Symbol('setCurrentSymnol')

export function objToFormItemConfigs(map: any) {
  const list = Object.entries(map ?? {}).map(([k, v]: any) => {
    const isComplex = v.children || v.component
    let componentProps
    let type
    const component = isComplex ? markRaw(v.children || v.component as Component) : markRaw(v)
    if (isComplex) {
      const { component: _a, children: _b, type: componentType, componentProps: props } = v
      componentProps = props
      type = componentType
    }
    const children = type ? v.children : undefined
    return type
      ? ({
          label: k,
          type,
          key: k,
          componentProps,
          children: componentToConfig(children),
        })
      : ({
          label: k,
          type,
          key: k,
          component,
          componentProps,
        })
  })
  return list
}

/**
 *  eg: {  options: }
 * @param obj { [key:string]: Component  }
 */
export function componentToConfig(children: any) {
  const res = children.map((item: any) => {
    const key = Object.keys(item)[0]
    return {
      label: key,
      key,
      component: item[key],
    }
  })
  return res
}

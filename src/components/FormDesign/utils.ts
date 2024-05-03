import { nanoid } from 'nanoid'

export const generateId = (size: number = 21) => nanoid(size)
export interface FormProps {
  labelPosition: 'left' | 'right' | 'top'
  labelWidth?: string | number
  size: 'large' | 'default' | 'small'
}
export interface FormItemProps {
  label: string
  key: string
  id: string
  component: string
  componentProps: any
  type: string
  children?: FormItemProps[]
  // [key: string]: any
}
export interface FormConfig {
  formProps: FormProps
  formItemProps?: FormItemProps[]
  formItemModel: any
}

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

export function getCurrentNode(list: FormItemProps[], id: string): FormItemProps | undefined {
  for (const item of list) {
    if (item.id === id)
      return item
    if (item.children && item.children.length > 0) {
      const foundItem = getCurrentNode(item.children, id)
      return foundItem
    }
  }
  return undefined
}

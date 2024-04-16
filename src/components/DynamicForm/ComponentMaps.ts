import { Input, Select } from '@arco-design/web-vue'

export const ComponentMaps = {
  input: Input,
  select: Select,
}
export type ComponentString = keyof typeof ComponentMaps

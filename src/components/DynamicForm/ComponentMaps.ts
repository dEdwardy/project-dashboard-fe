import { ElDatePicker, ElInput, ElOption, ElSelect } from 'element-plus'

export const ComponentMaps = {
  'input': ElInput,
  'select': ElSelect,
  'option': ElOption,
  'date-picker': ElDatePicker,

}
export type ComponentString = keyof typeof ComponentMaps

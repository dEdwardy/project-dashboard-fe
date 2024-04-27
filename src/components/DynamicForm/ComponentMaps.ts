import { ElDatePicker, ElInput, ElOption, ElSelect } from 'element-plus'
import { cloneDeep } from 'lodash'

console.log('ElInput', ElInput)
const ElTextArea: any = cloneDeep(ElInput)
ElTextArea.props.type.default = 'textarea'
export const ComponentMaps = {
  'input': ElInput,
  'textarea': ElTextArea,
  'select': ElSelect,
  'option': ElOption,
  'date-picker': ElDatePicker,

}
export type ComponentString = keyof typeof ComponentMaps
export {
  ElTextArea,
}

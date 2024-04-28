import {
  ElCascader,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElUpload,
} from 'element-plus'
import { cloneDeep } from 'lodash'

const ElTextarea: any = cloneDeep(ElInput)
ElTextarea.props.type.default = 'textarea'
export const ComponentMaps = {
  input: ElInput,
  textarea: ElTextarea,
  counter: ElInputNumber,
  radio: ElRadioGroup,
  checkbox: ElCheckboxGroup,
  timepicker: ElTimePicker,
  datepicker: ElDatePicker,
  rate: ElRate,
  colorpicker: ElColorPicker,
  select: ElSelect,
  switch: ElSwitch,
  slider: ElSlider,
  text: 'text',
  customarea: 'customarea',
  uploader: ElUpload,
  editor: 'editor',
  cascader: ElCascader,
  grid: 'Grid',

}
export type ComponentString = keyof typeof ComponentMaps

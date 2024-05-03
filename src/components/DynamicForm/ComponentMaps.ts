import {
  ElCascader,
  ElCol,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElRow,
  ElSlider,
  ElSwitch,
  ElTimePicker,
} from 'element-plus'
import { cloneDeep } from 'lodash'
import {
  CustomCheckbox,
  CustomEditor,
  CustomJson,
  CustomRadio,
  CustomSelect,
  CustomText,
  CustomUploader,
} from './materials'

const ElTextarea: any = cloneDeep(ElInput)
ElTextarea.props.type.default = 'textarea'
export const ComponentMaps = {
  'input': ElInput,
  'textarea': ElTextarea,
  'counter': ElInputNumber,
  'radio': CustomRadio,
  'checkbox': CustomCheckbox,
  'timepicker': ElTimePicker,
  'datepicker': ElDatePicker,
  'rate': ElRate,
  'colorpicker': ElColorPicker,
  'select': CustomSelect,
  'switch': ElSwitch,
  'slider': ElSlider,
  'text': CustomText,
  'customarea': 'customarea',
  'uploader': CustomUploader,
  'editor': CustomEditor,
  'cascader': ElCascader,
  'row': ElRow,
  'col': ElCol,
  'json': CustomJson,
  // 二次封装组件后就无须以下的option组件
  'el-radio': ElRadioGroup,
  'radio-option': ElRadio,
  'select-option': ElOption,
}
export type ComponentString = keyof typeof ComponentMaps
export type ComponentValue = typeof ComponentMaps[keyof typeof ComponentMaps]

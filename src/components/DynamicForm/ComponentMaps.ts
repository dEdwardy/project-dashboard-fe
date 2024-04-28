import {
  ElCascader,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRate,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElUpload,
} from 'element-plus'
import { cloneDeep } from 'lodash'
import CustomRadio from './CustomRadio.vue'
import CustomSelect from './CustomSelect.vue'
import CustomCheckbox from './CustomCheckbox.vue'

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
  'text': 'text',
  'customarea': 'customarea',
  'uploader': ElUpload,
  'editor': 'editor',
  'cascader': ElCascader,
  'grid': 'Grid',
  // 二次封装组件后就无须以下的option组件
  'radio-option': ElRadio,
  'select-option': ElOption,
}
export type ComponentString = keyof typeof ComponentMaps
export type ComponentValue = typeof ComponentMaps[keyof typeof ComponentMaps]

import {
  Cascader,
  CheckboxGroup,
  ColorPicker,
  DatePicker,
  Grid,
  Input,
  InputNumber,
  RadioGroup,
  Rate,
  Select,
  Slider,
  Switch,
  Textarea,
  TimePicker,
  Upload,
} from '@arco-design/web-vue'
import type { Component } from 'vue'

interface ComponentInfo {
  component?: Component | string
  props?: any
}
interface ComponentMap {
  [key: string]: ComponentInfo
}
export const componentMap: ComponentMap = {
  input: {
    component: Input,
    props: {
      placeholder: undefined,
      maxLength: undefined,
      showWordLimit: undefined,
      defaultValue: undefined,
    },
  },
  textarea: { component: Textarea, props: { placeholder: undefined } },
  counter: { component: InputNumber, props: {} },
  radio: { component: RadioGroup, props: {} },
  checkbox: { component: CheckboxGroup, props: {} },
  timepicker: { component: TimePicker, props: {} },
  datepicker: { component: DatePicker },
  rate: { component: Rate },
  colorpicker: { component: ColorPicker },
  select: { component: Select, props: { options: [1, 2, 3, 4] } },
  switch: { component: Switch },
  slider: { component: Slider },
  text: { component: 'text' },
  customarea: { component: 'customarea' },
  uploader: { component: Upload },
  editor: { component: 'editor', props: undefined },
  cascader: { component: Cascader, props: {} },
  layout: { component: Grid, props: {} },
}
export const componentConfigMap = {
  input: {
    props: {
      placeholder: Input,
      maxLength: InputNumber,
      showWordLimit: Switch,
      defaultValue: Input,
    },
  },
  textarea: {
    props: {
      placeholder: Input,
      maxLength: InputNumber,
      showWordLimit: Switch,
      defaultValue: Input,
    },
  },
  counter: {
    props: {
      placeholder: Input,
      min: InputNumber,
      max: InputNumber,
      showWordLimit: Switch,
      defaultValue: Input,
    },
  },
  radio: { component: RadioGroup, props: {} },
  checkbox: { component: CheckboxGroup, props: {} },
  timepicker: { component: TimePicker, props: {} },
  datepicker: { component: DatePicker },
  rate: { component: Rate },
  colorpicker: { component: ColorPicker },
  select: { component: Select, props: { options: [1, 2, 3, 4] } },
  switch: { component: Switch },
  slider: { component: Slider },
  text: { component: 'text' },
  customarea: { component: 'customarea' },
  uploader: { component: Upload },
  editor: { component: 'editor', props: undefined },
  cascader: { component: Cascader, props: {} },
  layout: { component: Grid, props: {} },
}

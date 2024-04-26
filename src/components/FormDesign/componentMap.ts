import {
  ElCascader as Cascader,
  ElCheckboxGroup as CheckboxGroup,
  ElColorPicker as ColorPicker,
  ElDatePicker as DatePicker,
  ElRadio,
  ElInput as Input,
  ElInputNumber as InputNumber,
  ElRadioGroup as RadioGroup,
  ElRate as Rate,
  ElSelect as Select,
  ElSlider as Slider,
  ElSwitch as Switch,
  ElInput as Textarea,
  ElTimePicker as TimePicker,
  ElUpload as Upload,
} from 'element-plus'
import type { Component } from 'vue'
import type { IFormItem } from '../DynamicForm/types'

interface ComponentMap {
  [key: string]: Component | string
}
export const componentMap: ComponentMap = {
  input: Input,
  textarea: Textarea,
  counter: InputNumber,
  radio: RadioGroup,
  checkbox: CheckboxGroup,
  timepicker: TimePicker,
  datepicker: DatePicker,
  rate: Rate,
  colorpicker: ColorPicker,
  select: Select,
  switch: Switch,
  slider: Slider,
  text: 'text',
  customarea: 'customarea',
  uploader: Upload,
  editor: 'editor',
  cascader: Cascader,
  grid: 'Grid',
}
interface PropsConfig { model: any, schema: IFormItem[] }
type ConfigForm = Record<string, PropsConfig>
// 表单组件相关配置
export const componentConfigMap: ConfigForm = {
  input: {
    model: {
      placeholder: undefined,
      maxLength: undefined,
      showWordLimit: undefined,
      defaultValue: undefined,
    },
    schema: [
      { label: 'placeholder', key: 'placeholder', component: Input },
      { label: 'maxLength', key: 'maxLength', component: InputNumber },
      { label: 'showWordLimit', key: 'showWordLimit', component: Switch },
      { label: 'defaultValue', key: 'defaultValue', component: Input },
    ],
  },
  textarea: {
    model: {
      placeholder: undefined,
      maxLength: undefined,
      showWordLimit: undefined,
      defaultValue: undefined,
    },
    schema: [
      { label: 'placeholder', key: 'placeholder', component: Input },
      { label: 'maxLength', key: 'maxLength', component: InputNumber },
      { label: 'showWordLimit', key: 'showWordLimit', component: Switch },
      { label: 'defaultValue', key: 'defaultValue', component: Input },
    ],
  },
  counter: {
    model: {
      placeholder: undefined,
      min: undefined,
      max: undefined,
      step: undefined,
      defaultValue: undefined,
    },
    schema: [
      { label: 'placeholder', key: 'placeholder', component: Input },
      { label: 'max', key: 'max', component: InputNumber, componentProps: { mode: 'button' } },
      { label: 'min', key: 'min', component: InputNumber, componentProps: { mode: 'button' } },
      { label: 'step', key: 'step', component: InputNumber, componentProps: { mode: 'button' } },
      { label: 'disabled', key: 'disabled', component: Switch },
      { label: 'defaultValue', key: 'defaultValue', component: Input },
    ],
  },
  radio: {
    model: {
      direction: undefined,
      options: [],
    },
    schema: [
      {
        label: 'direction',
        key: 'direction',
        component: Switch,
        componentProps: {
          checkedValue: 'horizontal',
          checkedText: 'horizontal',
          uncheckedValue: 'vertical',
          uncheckedText: 'vertical',
        },
      },
      {
        label: 'options',
        key: 'options',
        type: 'list',
        children: [
          {
            label: 'label',
            key: 'label',
            component: Input,
          },
          {
            label: 'value',
            key: 'value',
            component: Input,
          },
        ],
      },
    ],
  },
  checkbox: {
    model: {
      direction: undefined,
      options: [],
    },
    schema: [
      {
        label: 'direction',
        key: 'direction',
        component: Switch,
        componentProps: {
          checkedValue: 'horizontal',
          checkedText: 'horizontal',
          uncheckedValue: 'vertical',
          uncheckedText: 'vertical',
        },
      },
      {
        label: 'options',
        key: 'options',
        type: 'list',
        children: [
          {
            label: 'label',
            key: 'label',
            component: Input,
          },
          {
            label: 'value',
            key: 'value',
            component: Input,
          },
        ],
      },
    ],
  },
  timepicker: {
    model: {
      type: 'time',
      placeholder: undefined,
      // defaultValue: undefined,
    },
    schema: [
      {
        label: '是否范围选择',
        key: 'type',
        component: Switch,
        componentProps: {
          checkedValue: 'time-range',
          uncheckedValue: 'time',
        },
      },
      {
        label: '占位内容',
        key: 'placeholder',
        component: Input,
        show: ({ data }) => {
          return data?.type === 'time'
        },
        dependencies: ['type'],
      },
      {
        label: '占位内容开始',
        key: 'placeholder.0',
        component: Input,
        show: ({ data }) => data?.type !== 'time',
        dependencies: ['type'],
      },
      {
        label: '占位内容结束',
        key: 'placeholder.1',
        component: Input,
        show: ({ data }) => data?.type !== 'time',
        dependencies: ['type'],
      },
      { label: 'defaultValue', key: 'defaultValue', component: Input },
    ],
  },
  datepicker: {
    model: {
      type: 'date',
    },
    schema: [
      {
        label: '显示类型',
        key: 'type',
        component: 'select',
        componentProps: {
          options: ['date', 'month', 'year', 'quarter', 'week']
          ,
        },
      },
    ],
  },
  rate: {
    model: {},
    schema: [],
  },
  colorpicker: {
    model: {},
    schema: [],
  },
  select: {
    model: {
      options: [],
      maxLength: undefined,
      showWordLimit: undefined,
      defaultValue: undefined,
    },
    schema: [
      {
        label: 'Options',
        type: 'list',
        key: 'options',
        children: [
          {
            label: 'label',
            key: 'label',
            component: Input,
          },
          {
            label: 'value',
            key: 'value',
            component: Input,
          },
        ],
      },
    ],
  },
  switch: {
    model: {},
    schema: [],
  },
  slider: {
    model: {},
    schema: [],
  },
  text: {
    model: {},
    schema: [],
  },
  customarea: {
    model: {},
    schema: [],
  },
  uploader: {
    model: {},
    schema: [],
  },
  editor: {
    model: {},
    schema: [],
  },
  cascader: {
    model: {},
    schema: [],
  },
  row: {
    model: {},
    schema: [],
  },
  col: {
    model: {},
    schema: [],
  },
}
// 整体表单相关配置
export const formConfigMap: PropsConfig = {
  model: {
    labelPosition: undefined,
    labelWidth: undefined,
    size: 'default',
  },
  schema: [
    {
      label: 'labelPosition',
      key: 'labelPosition',
      component: RadioGroup,
      componentProps: {
        type: 'button',
        options: ['left', 'right', 'top'],
      },
      children: ['left', 'right', 'top'].map(i => ({
        component: ElRadio,
        componentProps: {
          label: i,
          value: i,
          key: i,
        },
      })),
    },
    { label: 'labelWidth', key: 'labelWidth', component: InputNumber },
    {
      label: 'size',
      key: 'size',
      component: RadioGroup,
      componentProps: {
        type: 'button',
        options: ['mini', 'small', 'medium', 'large'],
      },
      children: ['large', 'default', 'small'].map(i => ({
        component: ElRadio,
        componentProps: {
          label: i,
          value: i,
          key: i,
        },
      })),
    },
  ],
}

import type { IFormItem } from '../DynamicForm/types'

interface PropsConfig { model: any, schema: IFormItem[] }
type ConfigForm = Record<string, PropsConfig>
// 表单组件相关配置
export const componentConfigMap: ConfigForm = {
  input: {
    model: {
      placeholder: undefined,
      maxlength: undefined,
      showWordLimit: undefined,
      defaultValue: undefined,
    },
    schema: [
      { label: 'placeholder', key: 'placeholder', component: 'input' },
      { label: 'maxlength', key: 'maxlength', component: 'counter' },
      { label: 'showWordLimit', key: 'showWordLimit', component: 'switch' },
      { label: 'defaultValue', key: 'defaultValue', component: 'input' },
    ],
  },
  // TODO 调整DynaicForm DefaultLayout slot? cmp? props?
  textarea: {
    model: {
      placeholder: undefined,
      maxlength: undefined,
      showWordLimit: undefined,
      defaultValue: undefined,
      autosize: undefined,
      rows: undefined,
    },
    schema: [
      { label: 'placeholder', key: 'placeholder', component: 'input' },
      { label: 'maxlength', key: 'maxlength', component: 'counter' },
      { label: 'showWordLimit', key: 'showWordLimit', component: 'switch' },
      { label: 'defaultValue', key: 'defaultValue', component: 'input' },
      { label: 'autosize', key: 'autosize', component: 'switch' },
      { label: 'rows', key: 'rows', component: 'counter' },
    ],
  },
  counter: {
    model: {
      placeholder: undefined,
      min: undefined,
      max: undefined,
      step: undefined,
      defaultValue: undefined,
      precision: undefined,
      controls: true,
      style: {
        width: undefined,
        height: undefined,
      },
    },
    schema: [
      { label: 'placeholder', key: 'placeholder', component: 'input' },
      { label: 'max', key: 'max', component: 'counter', componentProps: { mode: 'button' } },
      { label: 'min', key: 'min', component: 'counter', componentProps: { mode: 'button' } },
      { label: 'step', key: 'step', component: 'counter', componentProps: { mode: 'button' } },
      { label: 'precision', key: 'step', component: 'counter', componentProps: { mode: 'button' } },
      { label: 'controls', key: 'controls', component: 'switch' },
      { label: 'disabled', key: 'disabled', component: 'switch' },
      { label: 'width', key: 'style.width', component: 'input' },
      { label: 'defaultValue', key: 'defaultValue', component: 'input' },
    ],
  },
  radio: {
    model: {
      direction: undefined,
      showLabel: false,
      options: ['Options1', 'Options2', 'Options3'].map(value => ({ label: value, value })),
    },
    schema: [
      {
        label: 'direction',
        key: 'direction',
        component: 'switch',
        componentProps: {
          checkedValue: 'horizontal',
          checkedText: 'horizontal',
          uncheckedValue: 'vertical',
          uncheckedText: 'vertical',
        },
      },
      {
        label: 'showLabel',
        key: 'showLabel',
        component: 'switch',
        componentProps: {
          checkedValue: true,
          uncheckedValue: false,
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
            show: ({ data }) => data.showLabel === true,
            component: 'input',
          },
          {
            label: 'value',
            key: 'value',
            component: 'input',
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
        component: 'switch',
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
            component: 'input',
          },
          {
            label: 'value',
            key: 'value',
            component: 'input',
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
        component: 'switch',
        componentProps: {
          checkedValue: 'time-range',
          uncheckedValue: 'time',
        },
      },
      {
        label: '占位内容',
        key: 'placeholder',
        component: 'input',
        show: ({ data }) => {
          return data?.type === 'time'
        },
        dependencies: ['type'],
      },
      {
        label: '占位内容开始',
        key: 'placeholder.0',
        component: 'input',
        show: ({ data }) => data?.type !== 'time',
        dependencies: ['type'],
      },
      {
        label: '占位内容结束',
        key: 'placeholder.1',
        component: 'input',
        show: ({ data }) => data?.type !== 'time',
        dependencies: ['type'],
      },
      { label: 'defaultValue', key: 'defaultValue', component: 'input' },
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
      maxlength: undefined,
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
            component: 'input',
          },
          {
            label: 'value',
            key: 'value',
            component: 'input',
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
      component: 'radio',
      componentProps: {
        type: 'button',
        laytout: 'inline',
        options: ['left', 'right', 'top'].map(value => ({ label: value, value })),
      },
    },
    { label: 'labelWidth', key: 'labelWidth', component: 'input' },
    {
      label: 'size',
      key: 'size',
      component: 'radio',
      componentProps: {
        type: 'button',
        options: ['large', 'default', 'small'].map(value => ({ label: value, value })),
      },
    },
  ],
}

import type { IFormItem } from '../DynamicForm/types'

interface PropsConfig { model: any, schema: IFormItem[] }
type ConfigForm = Record<string, PropsConfig>
// 表单组件相关配置
export const componentConfigMap: ConfigForm = reactive({
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
      { label: 'defaultValue', key: 'defaultValue', component: 'counter' },
    ],
  },
  radio: {
    model: {
      layout: undefined,
      options: ['Options1', 'Options2', 'Options3'].map(value => ({ label: value, value })),
    },
    schema: [
      {
        label: 'layout',
        key: 'layout',
        component: 'switch',
        componentProps: {
          activeValue: 'block',
          activeText: 'block',
          inactiveValue: 'inline',
          inactiveText: 'inline',
        },
      },
      {
        label: 'options',
        key: 'options',
        type: 'list',
        // defaultValue: ,
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
  checkbox: {
    model: {
      layout: undefined,
      options: undefined,
      defaultValue: [],
    },
    schema: [
      {
        label: 'layout',
        key: 'layout',
        component: 'switch',
        componentProps: {
          activeValue: 'block',
          activeText: 'block',
          inactiveValue: 'inline',
          inactiveText: 'inline',
        },
      },
      {
        label: 'options',
        key: 'options',
        type: 'list',
        defaultValue: ['Options1', 'Options2', 'Options3'].map(value => ({ label: value, value })),
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
  // TODO MainSection render wrong
  timepicker: {
    model: {
      placeholder: undefined,
      startPlaceholder: undefined,
      endPlaceholder: undefined,
      isRange: false,
      arrowControl: false,
    },
    schema: [
      {
        label: 'isRange',
        key: 'isRange',
        component: 'switch',
      },
      {
        label: 'arrowControl',
        key: 'arrowControl',
        component: 'switch',
      },
      {
        label: '占位内容',
        key: 'placeholder',
        component: 'input',
        show: ({ data }) => {
          return data?.isRange !== true
        },
      },
      {
        label: '占位内容开始',
        key: 'startPlaceholder',
        component: 'input',
        show: ({ data }) => data.isRange === true,
      },
      {
        label: '占位内容结束',
        key: 'endPlaceholder',
        component: 'input',
        show: ({ data }) => data.isRange === true,
        dependencies: ['type'],
      },
    ],
  },
  datepicker: {
    model: {
      type: 'date',
    },
    schema: [
      {
        label: 'format',
        key: 'format',
        component: 'input',
      },
      {
        label: 'type',
        key: 'type',
        component: 'select',
        componentProps: {
          options: ['year', 'years', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange'].map(value => ({ label: value, value }))
          ,
        },
      },
      {
        label: 'placeholder',
        key: 'placeholder',
        show: ({ data }: any) => !data?.type.includes('range'),
        component: 'input',
      },
      {
        label: 'startPlaceholder',
        key: 'startPlaceholder',
        show: ({ data }: any) => data?.type.includes('range'),
        component: 'input',
      },
      {
        label: 'endPlaceholder',
        key: 'endPlaceholder',
        show: ({ data }: any) => data?.type.includes('range'),
        component: 'input',
      },
    ],
  },
  rate: {
    model: {
      max: 5,
      allowHalf: false,
      showScore: false,
    },
    schema: [
      {
        label: 'max',
        key: 'max',
        component: 'counter',
      },
      {
        label: 'allowHalf',
        key: 'allowHalf',
        component: 'switch',
      },
      {
        label: 'showScore',
        key: 'showScore',
        component: 'switch',
      },
    ],
  },
  colorpicker: {
    model: {},
    schema: [
      {
        label: 'showAlpha',
        key: 'showAlpha',
        component: 'switch',
      },
      {
        label: 'defaultValue',
        key: 'defaultValue',
        component: 'colorpicker',
      },
    ],
  },
  select: {
    model: {
      // options: ['Options1', 'Options2', 'Options3'].map(value => ({ label: value, value })),
      options: [{ label: 'Options1', value: 'Options1' }, { label: 'Options2', value: 'Options2' }, { label: 'Options3', value: 'Options3' }],
      defaultValue: undefined,
      filterable: true,
      multiple: false,
    },
    schema: [
      {
        label: 'placeholder',
        key: 'placeholder',
        component: 'input',
      },
      {
        label: 'filterable',
        key: 'filterable',
        component: 'switch',
      },
      {
        label: 'multiple',
        key: 'multiple',
        component: 'switch',
      },
      {
        label: 'options',
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
    model: {
    },
    schema: [
    ],
  },
  slider: {
    model: {
      min: 0,
      max: 100,
      step: 1,
    },
    schema: [
      {
        label: 'min',
        key: 'min',
        component: 'counter',
      },
      {
        label: 'max',
        key: 'max',
        component: 'counter',
      },
      {
        label: 'step',
        key: 'step',
        component: 'counter',
      },
    ],
  },
  text: {
    model: {
    },
    schema: [
      {
        label: 'defaultValue',
        key: 'defaultValue',
        component: 'input',
      },
    ],
  },
  customarea: {
    model: {},
    schema: [],
  },
  uploader: {
    model: {
      action: '#',
      defaultValue: [],
    },
    schema: [
      {
        label: 'width',
        key: 'width',
        component: 'counter',
      },
      {
        label: 'height',
        key: 'height',
        component: 'counter',
      },
      {
        label: 'action',
        key: 'action',
        component: 'input',
      },
    ],
  },
  editor: {
    model: {
    },
    schema: [],
  },
  cascader: {
    model: {
      options: [],
    },
    schema: [
      {
        label: 'options',
        key: 'options',
        component: 'json',
        componentProps: {
          editable: true,
        },
      },
    ],
  },
  row: {
    model: {
      gutter: 12,
    },
    schema: [
      {
        label: 'gutter',
        key: 'gutter',
        component: 'counter',
      },
    ],
  },
  col: {
    model: {
      span: 12,
    },
    schema: [
      {
        label: 'span',
        key: 'span',
        component: 'counter',
      },
    ],
  },
})
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
      // slots:{
      //   default:['left','right','top'].map(value => ({
      //     component:'radio-option',
      //     componentProps:{
      //       key:value,
      //       value,
      //     },
      //     slots:{
      //       default: value
      //     }
      //   }))
      // }
    },
    { label: 'labelWidth', key: 'labelWidth', component: 'counter' },
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

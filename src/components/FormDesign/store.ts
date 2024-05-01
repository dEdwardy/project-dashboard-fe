import { defineStore } from 'pinia'
import type { FormItemProps, FormProps } from './utils'
import { formConfigMap } from './componentMap'

interface IState {
  config: FormProps
  // 表单项目配置
  itemsConifg: FormItemProps[]
  // 当前formItem
  // currentConfig?: FormItemProps getters
  // 当前formItem index
  currentIndex: number
  configModel: any
  // itemsModel:any
}
export const useFormConfigStore = defineStore('formConfigStore', {
  state: (): IState => ({
    // 整体表单配置
    configModel: formConfigMap.model,
    config: formConfigMap.schema as any,
    // 表单项目配置
    itemsConifg: [],
    // 当前formItem index
    currentIndex: -1,
  }),
  getters: {
    // 当前formItem
    currentConfig: (state) => {
      return state.itemsConifg[state.currentIndex] ?? {}
    },
  },
  actions: {
    setItemsConifg(config: FormItemProps[]) {
      if (this.currentIndex === -1)
        this.setCurrentIndex(config.length - 1)
      this.itemsConifg = config
    },
    setCurrentIndex(index: number) {
      this.currentIndex = index
    },
    setCurrentProps(props: any) {
      this.itemsConifg[this.currentIndex].componentProps = props
    },
    setCurrentConfig(config: FormItemProps, index?: number) {
      if (index !== undefined && this.currentIndex !== index)
        this.currentIndex = index
      this.itemsConifg[this.currentIndex] = config
    },
    setConfigModel(v: any) {
      this.configModel = v
    },
  },
})

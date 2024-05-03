import { defineStore } from 'pinia'
import { type FormItemProps, type FormProps, getCurrentNode } from './utils'
import { formConfigMap } from './componentMap'

interface IState {
  config: FormProps
  // 表单项目配置
  itemsConifg: FormItemProps[]
  // 当前formItem
  // currentConfig?: FormItemProps getters
  // 当前formItem index
  currentIndex: number // 之前由于是list 可以记录index 现在切换到 tree 所以得记录当前选中的id
  currentId: string | undefined
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
    currentId: undefined,
  }),
  getters: {
    // 当前formItem
    currentConfig: (state) => {
      return state.itemsConifg[state.currentIndex] ?? {}
    },
  },
  actions: {
    getCurrentNode() {
      const list = this.itemsConifg
      const id = this.currentId
      if (id === undefined)
        return
      return getCurrentNode(list, id)
    },
    setItemsConifg(config: FormItemProps[]) {
      if (this.currentIndex === -1)
        this.setCurrentIndex(config.length - 1)
      this.itemsConifg = config
    },
    setCurrentIndex(index: number) {
      this.currentIndex = index
    },
    setCurrentId(id: string) {
      this.currentId = id
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

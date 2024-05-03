<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
// 引入mode 和 theme 这里可以选择自己想要的主题和mode
import ace from 'ace-builds'
import modeJsonUrl from 'ace-builds/src-noconflict/mode-json'
import modeProtobuf from 'ace-builds/src-noconflict/mode-protobuf?url'
import themeTomorrow from 'ace-builds/src-noconflict/theme-tomorrow?url'
import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url'
import extSearchboxUrl from 'ace-builds/src-noconflict/ext-searchbox?url'
import extInlineAutocomplete from 'ace-builds/src-noconflict/ext-inline_autocomplete'
import extBeautify from 'ace-builds/src-noconflict/ext-beautify'
import extErrorMarker from 'ace-builds/src-noconflict/ext-error_marker'
import extSettingMenu from 'ace-builds/src-noconflict/ext-settings_menu'
import { ref, watch } from 'vue'

defineOptions({
  name: 'CustomCodeEditor',
})
const props = withDefaults(defineProps<IProps>(), {
  lang: 'json',
  theme: 'tomorrow',
  editable: false,
})
const emits = defineEmits(['update:modelValue'])
ace.config.setModuleUrl('ace/mode/json5', modeJsonUrl)
ace.config.setModuleUrl('ace/mode/protobuf', modeProtobuf)
ace.config.setModuleUrl('ace/theme/tomorrow', themeTomorrow)
ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl)
ace.config.setModuleUrl('ace/ext/searchbox', extSearchboxUrl)
ace.config.setModuleUrl('ace/ext/inline_autocomplete', extInlineAutocomplete)
ace.config.setModuleUrl('ace/ext/beautify', extBeautify)
ace.config.setModuleUrl('ace/ext/error_marker', extErrorMarker)
ace.config.setModuleUrl('ace/ext/settings_menu', extSettingMenu)
const editorOptions = {
  fontSize: 14,
  tabSize: 4,
  useWorker: true,
  wrap: true,
  showPrintMargin: false,
  showLineNumbers: true,
  showGutter: true,
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true,
  copyWithEmptySelection: true,
}
interface IProps {
  modelValue: string
  lang?: string
  theme?: string
  editable?: boolean
}
const value = ref(props.modelValue)
watch(value, (v) => {
  emits('update:modelValue', v)
})
</script>

<template>
  <VAceEditor v-model:value="value" :lang="props.lang" :theme="props.theme"
    :options="editorOptions" wrap :editable="props.editable" class="h-500px w-100%"
  />
</template>

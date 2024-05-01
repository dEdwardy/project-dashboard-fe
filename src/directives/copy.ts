import { ElMessage } from 'element-plus'

export default {
  mounted: (el: any, { value }: any) => {
    el.value = value
    el.handler = () => {
      if (!el.value)
        return ElMessage({ message: 'Nothing to copy!', type: 'warning' })
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(el.value)
          .then(() => {
            return ElMessage({ message: 'Copy successfully!', type: 'success' })
          })
          .catch(() => {
            return ElMessage({ message: 'Replication failed!', type: 'error' })
          })
      }
      else {
        const textarea = document.createElement('textarea')
        textarea.readOnly = true
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        textarea.value = el.value
        document.body.appendChild(textarea)
        textarea.select()
        const result = document.execCommand('Copy')
        if (result)
          ElMessage({ message: 'Copy successfully!', type: 'success' })
        else ElMessage({ message: 'Replication failed!', type: 'error' })
        document.body.removeChild(textarea)
      }
    }
    el.addEventListener('click', el.handler)
  },
  updated: (el: any, { value }: { value: string }) => el.value = value,
  unmounted: (el: any) => el.removeEventListener('click', el.handler),
}

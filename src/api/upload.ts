import { service } from '~/utils/service'

export function uploadChunk(data: any, config: object) {
  return service.post('/file/chunk', data, config)
}
export function mergeChunks(data: any, config: object) {
  return service.post('/file/merge', data, config)
}

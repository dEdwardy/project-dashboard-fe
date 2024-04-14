import { service } from "~/utils/service";

export const uploadChunk = (data:any,config:object) => service.post('/file/chunk',data,config)
export const mergeChunks = (data:any,config:object) => service.post('/file/merge',data,config)

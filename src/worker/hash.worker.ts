import useFileHash from "~/composables/file-hash";
import useLocalForage from "~/composables/localforage";
import { readFileChunk,DEFAULT_CHUNK_SIZE } from "~/utils";

self.onmessage = async (e) => {
  const file = e.data.file as unknown as File
  const isChunk = e.data.isChunk as unknown as boolean
  const { hash, calculateHash,SparkMD5, percent } = useFileHash(file)
  if(isChunk || file.size< DEFAULT_CHUNK_SIZE){
    // 切片md5最直接计算
    const buffer = await readFileChunk(file)
    self.postMessage({hash:SparkMD5.ArrayBuffer.hash(buffer as unknown as ArrayBuffer),isChunk,percent,type:'hash'})
  }else{
    const { setItem} = useLocalForage('cachedHashes')
    // 非切片md5 增量计算
    await calculateHash((hash,{ current, percent,file } ) => {
      self.postMessage({ type:'chunk',percent,file,index:current,hash})
      setItem(hash, current)
    })
    self.postMessage({type:'hash',hash:hash.value,isChunk,percent})
  }
}

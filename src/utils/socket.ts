import { io } from 'socket.io-client'

export const socket = io('http://localhost/file', {
  autoConnect: true,
  transports: ['websocket'],
})

socket.on('connect', () => {
  console.log('socket已连接')
})
socket.on('disconnect', () => {
  console.log('disconnect')
})
socket.on('close', () => {
  console.log('close')
})

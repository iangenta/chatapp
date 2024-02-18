import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  server:{
    proxy:{
      '/socket.io':{
        target:'http://localhost:3000',
        ws:true
      }
    }
  }
}

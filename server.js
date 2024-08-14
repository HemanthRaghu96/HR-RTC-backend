const express=require('express')
const http=require('http')
const socketIo=require('socket.io')
const cors = require('cors')


let app=express()
let server=http.createServer(app)

app.use(cors())

const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

io.on('connection',(socket)=>{
    socket.on('offer',(offer)=>{
        socket.broadcast.emit('offer',offer)
    })
    socket.on('answer',(answer)=>{
        socket.broadcast.emit('answer',answer)
    })
    socket.on('ice-candidate',(candidate)=>{
        socket.broadcast.emit('ice-candidate',candidate)
    })
})

server.listen(5000,()=>console.log('Server runnig on port 5000'))
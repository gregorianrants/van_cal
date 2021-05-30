
const sockets =[]


function notify(){
    sockets.forEach(socket=>{
        socket.emit('message','hello world')
    })
}



module.exports = {sockets,notify}
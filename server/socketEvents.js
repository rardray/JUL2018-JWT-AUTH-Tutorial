exports = module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('enter conversation', (conversation) => {  //<--- event listeners join
            socket.join(conversation)
        })
        socket.on('leave conversation', (conversation) => { //<--- leave
            socket.leave(conversation)
        })
        socket.on('new message', (conversation) => {
            io.sockets.in(conversation).emit('refresh messages', conversation) //<--- emit = add message to conversation
        })
        socket.on('disconnect', () =>  {

        })
    })
}
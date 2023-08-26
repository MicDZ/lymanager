const socket = new WebSocket('ws://61.147.227.230:61156');

// 监听连接打开事件
socket.addEventListener('open', () => {
    console.log('Connected to server.');

    // 发送消息
    socket.send('!login nvidia nvidia');
});

// 监听消息接收事件
socket.addEventListener('message', (event) => {
    console.log('Received message:', event.data);
});

// 监听连接关闭事件
socket.addEventListener('close', (event) => {
    console.log('Connection closed:', event.reason);
});
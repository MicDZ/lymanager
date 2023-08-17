//
//     login() {
//       // 发送登录请求到后端
//   axios.post('/api/login', { username: this.username, password: this.password })
//   .then(response => {
//   if (response.data.success) {
//   this.loggedIn = true;
//   this.fetchTasks();
//
// }
//
// });
//       // this.loggedIn = true;
//       // this.fetchTasks();
//     },
//     fetchTasks() {
//       // 获取任务列表数据
//       axios.get('/api/tasks')
//           .then(response => {
//             this.tasks = response.data;
//           });
//     },
//     fetchTaskDddlils(taskId) {
//       // 获取任务详情数据
//       axios.get(`/api/tasks/${taskId}`)
//           .then(response => {
//             this.selectedTask = response.data;
//           });
//     },
//     addComment() {
//       // 提交新留言
//       const taskId = this.selectedTask.id;
//       axios.post(`/api/tasks/${taskId}/comments`, {message: this.newComment})
//           .then(response => {
//             this.selectedTask.comments.push(response.data);
//             this.newComment = '';
//           });
//     }
const net = require('net');

const client = new net.Socket();

client.connect(60120, '61.147.227.230', () => {
    console.log('Connected to server.');

    // 发送数据
    client.write('Hello, server!');
});

client.on('data', (data) => {
    console.log('Received data:', data);
});

client.on('close', () => {
    console.log('Connection closed.');
});

<template>
  <v-app>

    <SidebarDisplay :tasks="tasks" :loggedIn="loggedIn" :avatar="avatar" :user="user" @selectTask="selectTask"></SidebarDisplay>

    <v-main>

      <v-container>
        <!-- 登录页面 -->
        <template v-if="!loggedIn">
          <v-text-field v-model="username" label="Username"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password"></v-text-field>
          <v-btn @click="login" color="primary">Login</v-btn>
        </template>

        <!-- 分车列表页面 -->
        <template v-else-if="loggedIn && currentPage === 'tasks'">
          <v-list>
            <v-list-item v-for="task in tasks" :key="task.id">
              <h1>
                {{ task.name }}
              </h1>
              <div>
                {{ task.progress }}
              </div>

              <StatusDisplay :task="task"></StatusDisplay>
              <v-divider class="custom-divider"></v-divider>
            </v-list-item>
          </v-list>
        </template>

        <!-- 分车详情页面 -->
        <template v-else-if="loggedIn && currentPage === 'taskDetail'">
          <v-list>
          <h1>{{ selectedTask.name }}</h1>
          <p>{{ selectedTask.description }}</p>

          <v-divider class="custom-divider"></v-divider>

            <h2><v-icon>mdi-check-all</v-icon> 状态</h2>


            <StatusDisplay :task="selectedTask"></StatusDisplay>


          <v-divider class="custom-divider"></v-divider>

          <h2><v-icon>mdi-comment-account-outline</v-icon> 留言</h2>
          <ul class="list">
            <li v-for="comment in selectedTask.comments" :key="comment.id" class="comment">
              <div class="comment-user">{{ comment.user }}</div>
              <div class="comment-message">{{ comment.message }}</div>
              <div class="comment-time">{{ comment.time }}</div>
            </li>
          </ul>
          <v-textarea v-model="newComment" label="吐槽一下吧"></v-textarea>
          <v-btn @click="addComment" color="primary" class="float-right"><v-icon>mdi-subdirectory-arrow-left</v-icon></v-btn>
          </v-list>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import axios from 'axios';
//import { format } from 'date-fns';
import './css/pc.css';
//import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import StatusDisplay from "@/components/StatusDisplay.vue";
import SidebarDisplay from "@/components/SidebarDisplay.vue";
export default {
  components: {SidebarDisplay, StatusDisplay},
  data() {
    return {
      loggedIn: true,
      user: [{name: '张三', group: '算法', task: '英雄', id: '1'},
        {name: '李四', group: '嵌软', task: '飞镖', id: '2'},
        {name: '王五', group: '电路', task: '哨兵', id: '3'},
        {name: '赵二', group: '机械', task: '步兵', id: '4'},
        ],
      avatar: '../assets/img/34596177.jpg',
      password: '',
      currentPage: 'taskDetail',
      tasks: [
        { id: 1, name: '英雄', progress: '机械占用', description: '当前算法占用调辅瞄，预期2023-08-16晚结束',
          comments: [
            { id: 1, user: '张三', message: '弹速今天不稳定:(', time: '2023-08-15 10:10:10' },
            { id: 2, user: '李四', message: '辅瞄不稳', time: '2023-08-15 10:11:10' },
            { id: 3, user: '王五', message: '零飘严重', time: '2023-08-15 10:12:10' }
          ],
          status: [
            { id: 1, name: '机械', quantity: '地盘画图中', ddl: '2023-08-20 10:10:14' },
            { id: 2, name: '嵌软', quantity: '小陀螺调试', ddl: '2023-08-23 20:10:12' },
            { id: 3, name: '电路', quantity: '画图中', ddl: '2023-08-24 03:10:13' },
            { id: 4, name: '算法', quantity: '反陀螺测试', ddl: '2023-08-25 15:10:11' }
          ]
        },
        { id: 2, name: '哨兵', progress: '嵌软占用',
          comments: [
            { id: 1, user: '张三', message: '弹速今天不稳定:(', time: '2023-08-15 10:10:10' },
            { id: 2, user: '李四', message: '辅瞄不稳', time: '2023-08-15 10:11:10' },
            { id: 3, user: '王五', message: '零飘严重', time: '2023-08-15 10:12:10' }
          ],
          status: [
            { id: 1, name: '机械', quantity: '双云台设计', ddl: '2023-08-20 10:10:14' },
            { id: 2, name: '嵌软', quantity: '导航测试', ddl: '2023-08-23 20:10:12' },
            { id: 3, name: '电路', quantity: '画图中', ddl: '2023-08-24 03:10:13' },
            { id: 4, name: '算法', quantity: '打前哨战测试', ddl: '2023-08-25 15:10:11' }
          ]
        },
        { id: 3, name: '平衡步兵', progress: '算法占用' ,
          comments: [
            { id: 1, user: '张三', message: '弹速今天不稳定:(', time: '2023-08-15 10:10:10' },
            { id: 2, user: '李四', message: '辅瞄不稳', time: '2023-08-15 10:11:10' },
            { id: 3, user: '王五', message: '零飘严重', time: '2023-08-15 10:12:10' }
          ],
          status: [
            { id: 1, name: '机械', quantity: '云台画图中', ddl: '2023-08-20 10:10:14' },
            { id: 2, name: '嵌软', quantity: '摩擦轮PID调试', ddl: '2023-08-23 20:10:12' },
            { id: 3, name: '电路', quantity: '画图中', ddl: '2023-08-24 03:10:13' },
            { id: 4, name: '算法', quantity: '前哨战测试', ddl: '2023-08-25 15:10:11' }
          ]
        }
      ],
      taskBrief: [
        { id: 1, name: "英雄"},
        {id: 2, name: "步兵"}
      ],
      selectedTask: null,
      newComment: ''
    };
  },
  methods: {
    getTaskBrief() {
      const tasksNameAndID = [];
      for (let i = 0; i < this.tasks.length; i++) {
        tasksNameAndID.push({id: this.tasks[i].id, name: this.tasks[i].name});
      }
      this.taskBrief = tasksNameAndID;
    },
    selectTask(id) {
      //id=0 main page
      if(id===0) {
        this.loggedIn=true;
        this.currentPage = 'tasks';
      }
      else if(id===-1) {
        this.loggedIn=false;
      }
      else {
        this.selectedTask = this.tasks[id-1];
        this.currentPage = 'taskDetail';
      }
    }

},
  created() {
    if (this.tasks.length > 0) {
      this.selectedTask = this.tasks[0]; // 设置第一个任务为选中任务
    }
    this.getTaskBrief();
  }
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

};
</script>




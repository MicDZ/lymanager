<template>
  <v-app>
    <SidebarDisplay v-if="loggedIn" :unitGroups="unitGroup" :loggedIn="loggedIn" :avatar="avatar" :currentUser="currentUser" @selectTask="selectUnitGroup" :title="currentTitle"></SidebarDisplay>
    <alert-box v-model:show-dialog="showDialog" :message="alertMessage" />
    <InputBox v-model="showInputBox" :message="alertMessage" @user-input="userInputSubmitted"></InputBox>
    <v-main>
<!--      {{getInputFromUser()}}-->
      <v-container>
        <!-- 登录页面 -->
        <template v-if="!loggedIn">
          <div class="login-box">
            <h1>欢迎来到小狼窝</h1>
            <!-- 插入指定链接图片 -->
            <img src="http://qiming.hust.edu.cn/__local/A/A6/8E/98BB6679033FA4134BF39F840D7_0043A688_4077.jpg" alt="avatar" class="avatar">
          <v-text-field v-model="username" label="用户名" class="login-box"></v-text-field>
          <v-text-field v-model="password" label="密码" type="password" class="login-box"></v-text-field>
          <v-btn @click="logIn(username, password)" color="primary">登陆</v-btn>
          <div>

          </div>
          </div>
        </template>

        <!-- 分车列表页面 -->
        <template v-else-if="loggedIn && currentPage === 'UnitGroups'">
          <v-list>
            <v-list-item v-for="task in taskGroups" :key="task.id">
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
        <template v-else-if="loggedIn && currentPage === 'UnitGroupDetail'">
                  <v-list>
        <div v-for="unit in currentUnitGroup.unitsList" :key="unit.ID">
          <h1>{{ getUnit(unit).DisplayName }}</h1>
          <h2>负责人</h2>
          <div class="MyCard">
            <v-btn @click="throwInputBox('添加单位负责人', unit, addUserInCharge)" color="primary" class="float-right"><v-icon>mdi-plus-box</v-icon></v-btn>
            <table>
              <tbody>
              <tr v-for="user_ of getUnit(unit).InChargeUsers" :key="user_.ID">
                <td @click="throwInputBox('修改负责人', getTask(task_), updateTaskName)">{{  getUser(user_).DisplayName }}</td>
                <td>{{ techGroup[getUser(user_).TechGroup[0]].name }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <h2>当前占用</h2>
          <div v-if="getUnit(unit).CurrentUserID===-1">无</div>
          <div v-else>
            {{console.log(users)}}
            {{ getUser(getUnit(unit).CurrentUserID).DisplayName }}
          </div>
          <v-divider class="custom-divider"></v-divider>
          <h2>任务</h2>
          <div class="MyCard">
            <v-btn @click="addTask(unit)" color="primary" class="float-right"><v-icon>mdi-plus-box</v-icon></v-btn>
            <table>
              <tbody>
              <td class="font-weight-bold">任务名</td>
              <td class="font-weight-bold">简述</td>
              <td class="font-weight-bold">开始时间</td>
              <td class="font-weight-bold">预期时间</td>
              <td class="font-weight-bold">完成进度</td>
              <td class="font-weight-bold">时间进度</td>
              <td class="font-weight-bold">查看详情</td>
              <tr v-for="task_ of getUnit(unit).InProgressTasks" :key="task_">
                <td @click="throwInputBox('修改任务名称', getTask(task_), updateTaskName)">{{ getTask(task_).Name }}</td>
                <td @click="throwInputBox('修改任务简述', getTask(task_), updateTaskDescription)">{{ getTask(task_).Description }}</td>
                <td @click="throwInputBox('修改任务开始时间（2023-08-26 22:43:00）', getTask(task_), updateTaskStartTime)">{{ getTask(task_).StartTime }}</td>
                <td @click="throwInputBox('修改任务预期时间（2023-08-26 22:43:00）', getTask(task_), updateTaskDeadLine)">{{ getTask(task_).DeadLine }}</td>

                <td @click="throwInputBox('格式为0.3', getTask(task_), updateTaskProgress)">{{ (getTask(task_).Progress*100).toFixed(0) }}%</td>
                <td>{{ (((Date.now()-stringToTime(getTask(task_).StartTime))/(stringToTime(getTask(task_).DeadLine)-stringToTime(getTask(task_).StartTime)))*100).toFixed(2) }}%</td>
                <td><v-btn @click="selectTask(task_)"><v-icon>mdi-arrow-right</v-icon></v-btn></td>
              </tr>
              </tbody>
            </table>
          </div>
          <v-divider class="custom-divider"></v-divider>
        </div>
            <h2><v-icon>mdi-check-all</v-icon> 任务</h2>

            <TaskDisplay :users="users" :tasks="unitGroup[selectedUnitGroup].tasks"></TaskDisplay>
          <v-divider class="custom-divider"></v-divider>

          <h2><v-icon>mdi-comment-account-outline</v-icon> 留言</h2>
<!--          <ul class="list">-->
<!--            <li v-for="comment in selectedTask.comments" :key="comment.id" class="comment">-->
<!--              <div class="comment-user">{{ comment.user }}</div>-->
<!--              <div class="comment-message">{{ comment.message }}</div>-->
<!--              <div class="comment-time">{{ comment.time }}</div>-->
<!--            </li>-->
<!--          </ul>-->
<!--          <CommentsDisplay :currentUser="currentUser" :users="users" :comments="selectedTaskGroup.comments"></CommentsDisplay>-->
          </v-list>
        </template>

        <template v-else-if="loggedIn && currentPage === 'TaskDetail'">
          <v-btn @click="selectUnitGroup(selectedUnitGroup)" color="primary" class="float-right"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <h1>{{getUnit(getTask(selectedTask).BindUnitID).DisplayName}}</h1>
          <v-divider class="custom-divider"></v-divider>
          <h2>{{ getTask(selectedTask).Name }}</h2>
          <h3>{{ getTask(selectedTask).Description }}</h3>
          <h3>负责人</h3>
          <div class="MyCard">
            <table>
              <tbody>
              <tr v-for="user_ of getTask(selectedTask).InChargeUsers" :key="user_.ID">
                <td>{{  getUser(user_).DisplayName }}</td>
                <td>{{ techGroup[getUser(user_).TechGroup[0]].name }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <h3>文档</h3>

          <v-md-editor v-if="editMode" v-model="getDocument(getTask(selectedTask).DocumentID).MarkdownBody" @save="editFile" height="400px"></v-md-editor>
          <v-md-preview v-else :text="getDocument(getTask(selectedTask).DocumentID).MarkdownBody"></v-md-preview>
          <v-btn v-if="!editMode" @click="editMode=true" color="primary" class="float-right"><v-icon>mdi-file-edit-outline</v-icon></v-btn>
          <v-btn v-if="editMode" @click="editMode=false" color="primary" class="float-right"><v-icon>mdi-swap-horizontal</v-icon></v-btn>

        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie';

import './css/pc.css';
import 'vuetify/dist/vuetify.min.css';
import StatusDisplay from "@/components/StatusDisplay.vue";
import SidebarDisplay from "@/components/SidebarDisplay.vue";
import TaskDisplay from "@/components/TasksDisplay.vue";
import InputBox from "@/components/InputBox.vue";

// import CommentsDisplay from "@/components/CommentsDisplay.vue";
import AlertBox from "@/components/AlertBox.vue";
import {task} from "@vue/cli-plugin-eslint/ui/taskDescriptor";

export default {
  computed: {
    task() {
      return task
    }
  },
  components: {SidebarDisplay, StatusDisplay, TaskDisplay, AlertBox, InputBox},
  data() {
    return {
      userToken: Cookies.get('user_token') || '',

      currentTitle: null,
      userInputSubmitted: null,
      connected: true,
      loggedIn: false,
      showDialog: false,
      showInputBox: false,
      alertMessage: null,
      dialogVisible: false,
      userInput: '',
      currentUnitGroup: null,
      currentEdit: {
        father: null,
        son: null
      },
      unitGroup: [
        {name: '未知', id: 0},
        {name: '英雄', id: 1,
          unitsList: [],
        },
        {name: '工程', id: 2},
        {name: '步兵', id: 3},
        {name: '哨兵', id: 4},
        {name: '无人机', id: 5},
        {name: '飞镖', id: 6},
      ],
      techGroup: [
        {name: '未知', id: 0},
        {name: '机械', id: 1},
        {name: '电路', id: 2},
        {name: '嵌软', id: 3},
        {name: '算法', id: 4},
        {name: '管理', id: 5}
      ],
      users: [],
      tasks: [],
      units: [],
      documents: [],
      currentDocumentID: null,
      editMode: null,
      username: null,
      password: null,
      currentUser: {
        Name: "root",
        DisplayName:"系统",
        TechGroup:[1],
        UnitGroup:[1],
        Authority:"System",
        Token:"token"
      },
      avatar: '../assets/img/34596177.jpg',
      name: '',
      currentPage: 'TaskDetail',
      currentTasksList: [],
      selectedUnitGroup: null,
      selectedTask: null,
      newComment: '',
      socket: null
    };
  },
  methods: {
    stringToTime(stringTime) {

      console.log(stringTime);
      // 将字符串分割为日期部分和时间部分
      const [datePart, timePart] = stringTime.split(' ');
// 将日期部分分割为年、月、日
      const [year, month, day] = datePart.split('-');
// 将时间部分分割为小时、分钟、秒
      const [hour, minute, second] = timePart.split(':');
// 使用Date构造函数创建Date对象
      const convertedDate = new Date(year, month - 1, day, hour, minute, second);

      return convertedDate;
    },
    displayTime(time) {
      if(time<0) {
        //TODO
      }
      else {
        const days = Math.floor(time/1000/60/60/24);
        const hours = Math.floor(time/1000/60/60%24);
        const minutes = Math.floor(time/1000/60%60);
        const seconds = Math.floor(time/1000%60);
        return `${days}天${hours}小时${minutes}分钟${seconds}秒`;
      }
    },

    async sendAndReceiveData(sendMessage) {
      // 发送消息并接收响应数据
      return new Promise((resolve) => {
        this.socket.send(sendMessage);

        this.socket.addEventListener('message', (event) => {
          const receivedData = event.data;
          console.log('Received message:', receivedData);
          resolve(receivedData); // 将响应数据传递给调用者
        });
      });

    },
    async sendData(sendMessage) {
      // 发送消息
      this.socket.send(sendMessage);
    },
    throwAlert(message) {
      this.showDialog = true;
      this.alertMessage = message;
    },
    async addTask(Unit) {
      const newTask = await this.sendAndReceiveData("+task {\"BindUnitID\":"+Unit+"}");
      await this.fetchTask([newTask]);
      // const task = this.getTask(newTask);
      // task.BindUnitID=Unit;
      // this.tasks.push(task);
      // this.getUnit(Unit).InProgressTasks.push(newTask);
      // await this.sendData("!update task " +
      //     newTask +
      //     " " +
      //     JSON.stringify(task)
      // );
    },
    async addUserInCharge(userInput) {
      if(userInput===null) {
        this.showInputBox=false;
        return;
      }
      const user=await this.sendAndReceiveData("!query user user_display_name " + userInput);
      if(user.charAt(0)==='-') {
        this.throwAlert("用户不存在");
      }
      else {
        this.getUnit(this.currentEdit).InChargeUsers.push(user.ID);
        await this.sendData("!update unit " +
            this.currentEdit +
            " " +
            JSON.stringify(this.getUnit(this.currentEdit))
        );
      }
      this.showInputBox=false;
    },
    editFile(text) {
      this.editMode=true;
      this.getDocument(this.getTask(this.selectedTask).DocumentID).MarkdownBody = text;
      try {
        this.sendData("!update document "
            + this.getTask(this.selectedTask).DocumentID
            + " "
            + JSON.stringify(this.getDocument(this.getTask(this.selectedTask).DocumentID)));
        this.throwAlert("保存成功");
      }
      catch (error) {
        this.throwAlert("服务器未响应");
      }
      //todo
    },
    throwInputBox(message, currentEdit, update) {
      this.showInputBox = true;
      this.alertMessage = message;
      this.currentEdit = currentEdit;
      this.userInputSubmitted=update;
    },
    async updateTaskProgress(userInput) {
      if(userInput===null) {
        this.showInputBox=false;
        return;
      }
      this.currentEdit.Progress = userInput;
      const message = await this.sendAndReceiveData("!update task "+
          this.currentEdit.ID+
          " "+
          JSON.stringify(this.currentEdit)
      );
      if(message.charAt(0)==='-') {
        this.throwAlert("无权限，请联系管理员");
      }
      else {
        this.throwAlert("更新成功");
      }
      this.showInputBox=false;
    },
    updateTaskDescription(userInput) {
      if(userInput===null) {
        this.showInputBox=false;
        return;
      }
      this.currentEdit.Description = userInput;
      this.sendData("!update task "+
          this.currentEdit.ID+
          " "+
          JSON.stringify(this.currentEdit)
      );
      this.showInputBox=false;
    },
    updateTaskName(userInput) {
      if(userInput===null) {
        this.showInputBox=false;
        return;
      }
      this.currentEdit.Name = userInput;
      this.sendData("!update task "+
          this.currentEdit.ID+
          " "+
          JSON.stringify(this.currentEdit)
      );
      this.showInputBox=false;
    },
    updateTaskDeadLine(userInput) {
      if(userInput===null) {
        this.showInputBox=false;
        return;
      }
      this.currentEdit.DeadLine = userInput;
      this.sendData("!update task "+
          this.currentEdit.ID+
          " "+
          JSON.stringify(this.currentEdit)
      );
      this.showInputBox=false;
    },
    updateTaskStartTime(userInput) {
      if(userInput===null) {
        this.showInputBox=false;
        return;
      }
      this.currentEdit.StartTime = userInput;
      this.sendData("!update task "+
          this.currentEdit.ID+
          " "+
          JSON.stringify(this.currentEdit)
      );
      this.showInputBox=false;
    },
    getUser(userID) {
      console.log("Get user "+userID+".");
      return this.users.find(item => item.ID === userID);
    },
    async fetchUser(usersID) {
      for (let userID of usersID) {
        if(userID===-1) continue;
        console.log("Fetch user "+userID+".");
        const foundUser = this.users.find(item => item.ID === userID);
        if (!foundUser) {
          try {
            const message = await this.sendAndReceiveData('?user id ' + userID);
            if (message.charAt(0) === '-') {
              console.log('获取用户详情失败');
              this.throwAlert("获取用户详情失败");
              return null;
            } else {
              // 其他情况
              try {
                const user = JSON.parse(message);
                user.ID=userID;
                this.users.push(user);
              } catch (error) {
                this.throwAlert("Json解析错误");
              }
            }
          } catch (error) {
            this.throwAlert("用户不存在");
          }
        }
      }
    },

    getTask(taskID) {
      console.log("Get task "+taskID+".");
      return this.tasks.find(item => item.ID === taskID);
    },
    async fetchTask(tasksID) {
      for (let taskID of tasksID) {
        if(taskID===-1) continue;
        console.log("Fetch task "+taskID+".");
        const foundTask = this.users.find(item => item.id === taskID);
        if (!foundTask) {
          try {
            const message = await this.sendAndReceiveData('?task id ' + taskID);
            if (message.charAt(0) === '-') {
              console.log('获取任务详情失败');
              this.throwAlert("获取任务详情失败");
              return null;
            } else {
              // 其他情况
              try {
                const task = JSON.parse(message);
                await this.fetchUser(task.InChargeUsers);
                await this.fetchDocument([task.DocumentID]);
                task.ID=taskID;

                this.tasks.push(task);
              } catch (error) {
                this.throwAlert("Json解析错误");
              }
            }
          } catch (error) {
            this.throwAlert("任务不存在");
          }
        }
      }
    },
    getUnit(unitID) {
      console.log("Get unit "+unitID+".");
      return this.units.find(item => item.ID === unitID);
    },
    async fetchUnit(unitsID) {
      for (let unitID of unitsID) {
        if(unitID===-1) continue;
        console.log("Fetch unit "+unitID+".");
        const foundUnit = this.units.find(item => item.id === unitID);
        if (!foundUnit) {
          try {
            const message = await this.sendAndReceiveData('?unit id ' + unitID);
            if (message.charAt(0) === '-') {
              console.log('获取单位详情失败');
              this.throwAlert("获取单位详情失败");
              return null;
            } else {
              // 其他情况
              try {
                const unit = JSON.parse(message);
                unit.ID=unitID;
                await this.fetchUser(unit.InChargeUsers);
                await this.fetchUser([unit.CurrentUserID]);
                await this.fetchTask(unit.InProgressTasks);
                this.units.push(unit);
              } catch (error) {
                this.throwAlert("Json解析错误");
              }
            }
          } catch (error) {
            this.throwAlert("单位不存在");
          }
        }
      }
    },

    getDocument(documentID) {
      console.log("Get document "+documentID+".");
      return this.documents.find(item => item.ID === documentID);
    },
    async fetchDocument(documentsID) {
      for (let documentID of documentsID) {
        if(documentID===-1) continue;
        console.log("Fetch document "+documentID+".");
        const foundDocument = this.documents.find(item => item.id === documentID);
        if (!foundDocument) {
          try {
            const message = await this.sendAndReceiveData('?document id ' + documentID);
            if (message.charAt(0) === '-') {
              console.log('获取文档详情失败');
              this.throwAlert("获取文档详情失败");
              return null;
            } else {
              // 其他情况
              try {
                const document = JSON.parse(message);
                document.ID=documentID;
                this.documents.push(document);
              } catch (error) {
                this.throwAlert("Json解析错误");
              }
            }
          } catch (error) {
            this.throwAlert("文档不存在");
          }
        }
      }
    },

    async selectUnitGroup(id) {
      console.log("Select unit group "+id+".");
      //id=0 main page
      if(id===0) {
        this.currentPage = 'UnitGroups';
      }
      else if(id===-1) {
        this.loggedIn=false;
      }
      else {
        this.selectedUnitGroup = id;
        this.currentUnitGroup = this.unitGroup.find(item => item.id === id);
        this.currentTitle=this.currentUnitGroup.name+"组";
        try {
          const responseData = await this.sendAndReceiveData("?unit unit_group "+id);
          this.currentUnitGroup.unitsList=JSON.parse(responseData);
          await this.fetchUnit(this.currentUnitGroup.unitsList);
          console.log('Received response data:', responseData);
        } catch (error) {
          console.error('Error:', error);
        }
        this.currentPage = 'UnitGroupDetail';
      }
    },
    selectTask(task) {
      this.currentPage = 'TaskDetail';
      this.selectedTask = task;
      this.currentDocumentID = this.getTask(task).DocumentID;
    },
    async logIn(username, password) {
      console.log("Try login.");

      try {
        const message = await this.sendAndReceiveData('!login '+username+' '+password);
        if(message==="-1") {
          this.throwAlert("未找到用户");
        }
        else if(message==="-2") {
          this.throwAlert("用户名或密码错误");
        }
        else {
          try {
            this.currentUser = JSON.parse(message);
            const token = this.currentUser.Token;
            const userName = this.currentUser.Name;
            // 将 token 保存在 Cookie 中
            Cookies.set('user_name', userName, { path: '/' });
            Cookies.set('token', token, { path: '/' });
            this.loggedIn = true;
            console.log("Login success.");
          } catch (error) {
            this.throwAlert("Json解析错误");
          }
          this.currentPage = 'UnitGroups';
          await this.selectUnitGroup(1);

        }
      }
      catch (error) {
        this.throwAlert("服务器未响应");
      }
      },

    async autoLogIn() {
      const token = Cookies.get('token');
      const userName = Cookies.get('user_name');
      console.log("Try auto login "+userName+" "+token+".");
      if(token==='-') {
        return;
      }
      const message=await this.sendAndReceiveData('!login '+userName+' '+token);
      if(message.charAt(0)==='-') {
        this.throwAlert("自动登录失败");
        Cookies.set('user_name', '-', { path: '/' });
        Cookies.set('token', '-', { path: '/' });
      }
      else {
        try {
          this.currentUser = JSON.parse(message);
          const token = this.currentUser.Token;
          const userName = this.currentUser.Name;
          // 将 token 保存在 Cookie 中
          Cookies.set('user_name', userName, { path: '/' });
          Cookies.set('token', token, { path: '/' });
          this.loggedIn = true;
          console.log("Login success.");
        } catch (error) {
          this.throwAlert("Json解析错误");
        }
        this.currentPage = 'UnitGroups';
        await this.selectUnitGroup(1);

      }
    }
  },
    testConnection() {
      // 创建 WebSocket 连接
      const socket = new WebSocket('ws://127.0.0.1:6363');

// 监听连接打开事件
      socket.addEventListener('open', () => {
        console.log('Connected to server.');

        // 发送消息
        socket.send('!login root    ');
        socket.send('?unit id 0');
      });

// 监听消息接收事件
      socket.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
      });

// 监听连接关闭事件
      socket.addEventListener('close', (event) => {
        console.log('Connection closed:', event.reason);
      });

},
  async created() {
    this.socket = new WebSocket('ws://[2001:250:4000:4408:f0fc:77be:84a6:61f]:8989');

    //如果连接失败
    this.socket.onerror = function () {
      console.log("连接失败");
      this.connected=false;

    };
    this.socket.onopen = this.autoLogIn;
    this.editMode=false;

  }
};
</script>




<template>
  <ul class="list-status ">
    <li v-for="task in tasks" :key="task.id" class="status mx-auto my-auto">
      <v-card @click="fetchDetail()">
        <!-- 卡片标题 -->
        <v-card-title class="yellow">
          {{ task.name }}
        </v-card-title>
        <v-list-item v-for="user in task.users" :key="user.id">
            <v-list-item-title class="align-content-center">{{ users[user].name }}</v-list-item-title>
        </v-list-item>
        <v-card-text>
          <div class="status-quantity">{{ task.quantity }}</div>
          <div class="status-ddl"><strong>DDL</strong>: {{ task.ddl }}</div>
          <!-- 计算剩余时间 转化为DD-HH-MM的格式-->

          <div class="status-remaining-time">剩余：{{ displayTime(stringToTime(task.ddl) - Date.now())}}</div>
          <div class="timeRemainRatio">距离结束还剩{{(((stringToTime(task.ddl) - Date.now())/(stringToTime(task.ddl)-stringToTime(task.st)))*100).toFixed(1)}}%的时间</div>
          <div class="progress">还有{{((1-task.progress)*100).toFixed(1)}}%的工作未完成</div>
        </v-card-text>
      </v-card>

    </li>
  </ul>

</template>

<script>
//import {format} from "date-fns";

export default {
  props: {
    users: null,
    tasks: null,
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
    selectTask(id) {
      this.selectedTask = id;
      this.currentPage = 'taskDetail';
    }
  }
}
</script>

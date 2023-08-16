<template>
  <ul class="list-status ">
    <li v-for="status in task.status" :key="status.id" class="status mx-auto my-auto">
      <v-card>
        <!-- 卡片标题 -->
        <v-card-title class="yellow">
          {{ status.name }}
        </v-card-title>

        <v-card-text>
          <div class="status-quantity">{{ status.quantity }}</div>
          <div class="status-ddl"><strong>DDL</strong>: {{ status.ddl }}</div>
          <!-- 计算剩余时间 转化为DD-HH-MM的格式-->
          <div class="status-remaining-time">剩余时间：{{ displayRemainTime(stringToTime(status.ddl) - Date.now()) }}</div>
        </v-card-text>
      </v-card>

    </li>
  </ul>

</template>

<script>
  import {format} from "date-fns";

  export default {
    props: {
      task: { id: 1, name: '英雄', progress: '机械占用', description: '当前算法占用调辅瞄，预期2023-08-16晚结束',
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
    },
    methods: {
      stringToTime(stringTime) {
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
      displayRemainTime(time) {
        const formattedDate = format(time, "dd天HH小时mm分钟");
        return formattedDate;
      },
      selectTask(id) {
        this.selectedTask = id;
        this.currentPage = 'taskDetail';
      }
    }
  }
</script>

<template>
  <div @click="loginPage()">
  <div class="login-info" v-if="loggedIn">
    <v-avatar>
      <v-img
          :src="require('../assets/img/34596177.jpg')"
          alt="avatar"
      />

    </v-avatar>
    <div class="user-details">
      <!-- 判断是否有归属 -->
      <div v-if="user.TechGroup.length>0">
      <div class="user-name">{{techGroups[user.TechGroup[0]].name}} - {{ user.DisplayName }}</div>
      </div>
      <div v-else>
        <div class="user-name">{{ user.DisplayName }}</div>
      </div>
    </div>
  </div>
  <div class="login-info" v-else>
    <div class="user-status">Not Logged In</div>
    <v-btn color="primary" @click="login">Login</v-btn>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    user: null,
    avatar: null,
    loggedIn: null
  },
  data() {
    return {
      unitGroups: [
        {name: '未知', id: '0'},
        {name: '英雄', id: '1'},
        {name: '工程', id: '2'},
        {name: '步兵', id: '3'},
        {name: '哨兵', id: '4'},
        {name: '无人机', id: '5'},
        {name: '飞镖', id: '6'},
      ],
      techGroups: [
        {name: '未知', id: '0'},
        {name: '机械', id: '1'},
        {name: '电路', id: '2'},
        {name: '嵌软', id: '3'},
        {name: '算法', id: '4'},
        {name: '管理', id: '5'}
      ],
    };
  },
  methods: {
    loginPage() {
      // 在实际应用中处理登录逻辑
      this.$emit("selectTask", -1);
    },
  }
};
</script>

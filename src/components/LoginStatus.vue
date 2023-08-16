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

      <div class="user-name">{{user.group}} - {{ user.name }}</div>
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
  methods: {
    loginPage() {
      // 在实际应用中处理登录逻辑
      this.$emit("selectTask", -1);
    },
  }
};
</script>

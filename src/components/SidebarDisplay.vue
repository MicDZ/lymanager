<template>
  <v-navigation-drawer app :width="180" class="sidebar">
    <!-- 侧边栏头部 -->
    <v-list-item class="sidebar-header" @click="selectTask(0)">
      <v-icon>mdi-home</v-icon> LY manager
    </v-list-item>

    <!-- 侧边栏菜单项 -->
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="task in tasks" :key="task.id" @click="selectTask(task.id)">
        <v-list-item-icon>
          <v-icon>{{ task.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="align-content-center">{{ task.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <login-status :user="user[0]" :avatar="avatar" :loggedIn="loggedIn"></login-status>
  </v-navigation-drawer>
</template>
<script>
import LoginStatus from "@/components/LoginStatus.vue";
export default {
  components: {
    LoginStatus,
  },
  props: {
    tasks: null,
    loggedIn: null,
    avatar: String,
    user: null,
  },
  methods: {
    selectTask(id) {
      this.$emit("selectTask", id);
    }
  }
}
</script>

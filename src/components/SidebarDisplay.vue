<template>
  <v-navigation-drawer app v-model="drawerOpen" :width="180" class="sidebar">
    <!-- 侧边栏头部 -->
    <v-list-item class="sidebar-header" @click="selectTask(0)">
      <v-icon>mdi-home</v-icon> LY manager
    </v-list-item>

    <!-- 侧边栏菜单项 -->
    <v-divider></v-divider>
    <v-list dense>
      <div v-for="unitGroup in unitGroups" :key="unitGroup.id">
        <div v-if="unitGroup.id >= 1">
      <v-list-item  @click="selectTask(unitGroup.id)">

        <v-list-item-icon>
          <v-icon>{{ unitGroup.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="align-content-center">{{ unitGroup.name }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
        </div>
      </div>
    </v-list>
    <login-status :user="currentUser" :avatar="avatar" :loggedIn="loggedIn"></login-status>
  </v-navigation-drawer>
  <v-app-bar app>
    <v-btn icon @click="toggleDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-app-bar>
</template>
<script>
import LoginStatus from "@/components/LoginStatus.vue";
export default {
  data() {
    return {
      drawerOpen: false,
    };
  },
  components: {
    LoginStatus,
  },
  props: {
    unitGroups: null,
    loggedIn: null,
    avatar: String,
    currentUser: null,
    title: null
  },
  methods: {
    selectTask(id) {
      this.$emit("selectTask", id);
    },
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
  }
}
</script>

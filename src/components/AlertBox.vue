<template>
  <v-dialog v-model="internalShowDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">提示</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="closeDialog">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    message: String,
    showDialog: Boolean
  },
  data() {
    return {
      internalShowDialog: this.showDialog
    };
  },
  methods: {
    closeDialog() {
      this.internalShowDialog = false;
      this.$emit('update:showDialog', false); // 通知父组件更新 showDialog
    }
  },
  watch: {
    showDialog(newVal) {
      this.internalShowDialog = newVal;
    }
  }
};
</script>

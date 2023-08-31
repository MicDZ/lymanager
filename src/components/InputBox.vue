<template>
  <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ message }}</span>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="userInput" label="输入" required></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeDialog">取消</v-btn>
        <v-btn color="primary" @click="submitUserInput">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean, // 用于控制弹窗显示状态
    message: null, // 用于显示弹窗内容
  },
  data() {
    return {
      dialogVisible: this.value,
      userInput: '',
    };
  },
  watch: {
    value(newValue) {
      this.dialogVisible = newValue;
    },
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
      this.userInput = '';
      this.$emit('user-input', null); // 向父组件发送弹窗显示状态
    },
    submitUserInput() {
      if (this.userInput.trim() !== '') {
        console.log('用户输入:', this.userInput);
        this.$emit('user-input', this.userInput); // 触发自定义事件，并传递用户输入
        //this.closeDialog();
      }
    },
  },
};
</script>

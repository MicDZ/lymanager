<template>
  <v-container>
<!--    <v-row class="chat-box">-->
<!--      <v-col cols="12">-->
<!--        <div class="message-list">-->

<!--          <div v-for="comment in comments" :key="comment.id" class="comment" :class="{ 'is-sender': comment.user === currentUser }">-->
<!--            {{ comment.message }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </v-col>-->
<!--    </v-row>-->


<!--    <v-row class="input-row">-->
<!--      <v-col cols="10">-->

<!--      </v-col>-->
<!--      <v-col cols="2">-->

<!--      </v-col>-->
<!--    </v-row>-->

    <ul class="list">
      <li v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-user">{{ comment.user }}</div>
        <div class="comment-message">{{ comment.message }}</div>
        <div class="comment-time">{{ comment.time }}</div>
      </li>
      <v-textarea v-model="newComment" label="吐槽一下吧"></v-textarea>
      <v-btn @click="addComment" color="primary" class="float-right"><v-icon>mdi-subdirectory-arrow-left</v-icon></v-btn>
    </ul>
  </v-container>
</template>
<script >
export default {
  data() {
    return {
      newComment: '',
    };
  },
  methods: {
    sendMessage() {

    }
  },
  props: {
    currentUser: null,
    users: [],
    comments: [],
  },
  created() {

  }
};
</script>

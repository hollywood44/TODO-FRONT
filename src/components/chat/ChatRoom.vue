<template>
  <div id="chat" ref="chat">
    <div class="chat-items" v-for="chat in chatList" :key="chat.chatId">
      <div v-if="chat.senderId == myId" class="my-chat">
        <div class="my-date">{{ chat.chatTime }}</div>
        <div class="my-chat-item">{{ chat.message }}</div>
      </div>
      <div v-else class="your-chat">
        <div class="your-id">{{ chat.senderId }}</div>
        <div class="your-chat-item">{{ chat.message }}</div>
        <div class="your-date">{{ chat.chatTime }}</div>
      </div>
    </div>
  </div>
  <div>
    <input type="text" v-model="message" />
    <button @click="sendMessage()">보내기</button>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

export default {
  name: "chatRoom",
  data() {
    return {
      myId: localStorage.getItem("memberId"),
      message: "",
      chatList: [],
    };
  },
  props: {
    chatRoomId: String,
    yourId: String,
  },
  methods: {
    connect() {
      const serverURL = "http://localhost:8080/ws/chat";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);

      const headers = { Authorizaion: localStorage.getItem("accessToken") };

      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true;

          this.stompClient.subscribe(
            "/sub/chat/receive/" + this.chatRoomId,
            (res) => {
              this.chatList.push(JSON.parse(res.body));
            }
          );
        },
        (error) => {
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
    },

    async getHistory() {
      await this.axios
        .get("/chat/history/" + this.chatRoomId, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          this.chatList = res.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      this.moveScrollToBottom();
    },

    async sendMessage() {
      await this.stompClient.send(
        "/pub/chat/sendMessage/" + this.chatRoomId,
        JSON.stringify({
          chatRoomId: this.chatRoomId,
          senderId: this.myId,
          receiverId: this.yourId,
          message: this.message,
          chatTime: this.getTimeAndSec(),
        }),
        { Authorization: localStorage.getItem("accessToken") }
      );
      this.message = "";
    },

    getTimeAndSec() {
      var today = new Date();
      var year = today.getFullYear();
      var month = ("0" + (today.getMonth() + 1)).slice(-2);
      var day = ("0" + today.getDate()).slice(-2);
      var hours = ("0" + today.getHours()).slice(-2);
      var minutes = ("0" + today.getMinutes()).slice(-2);
      var sec = ("0" + today.getSeconds()).slice(-2);
      return (
        year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + sec
      );
    },

    moveScrollToBottom() {
      let chat = this.$refs.chat;

      chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
    },
  },
  created() {
    this.connect();
  },
  mounted() {
    this.getHistory();
  },
  watch: {
    chatList: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.moveScrollToBottom();
        });
      },
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/chat.css";
</style>

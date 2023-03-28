<template>
  <form @submit.prevent="submitBoard">
    <div class="form-div">
      <label for="title"><h2>제목</h2></label>
      <input
        type="text"
        class="form-title"
        placeholder="제목"
        id="title"
        v-model="title"
      />
    </div>
    <div class="form-div">
      <label for="content"><h2>내용</h2></label>
      <textarea
        type="textarea"
        placeholder="내용"
        class="form-content"
        id="content"
        v-model="content"
      ></textarea>
    </div>
    <div class="form-div-btn">
      <button type="submit" class="form-button">제출</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "boardPosting",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    async submitBoard() {
      await this.axios
        .post(
          "/api/boards/posting",
          { title: this.title, content: this.content },
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          if (res.status == 200) {
            this.title = "";
            this.content = "";
            alert("게시글 작성이 성공 했습니다!");
            this.$router.push("/board");
          }
        });
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/board.css";
</style>

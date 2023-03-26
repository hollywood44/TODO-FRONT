<template>
  <div id="board">
    <div id="board-header">
      <div>{{detail.boardId}}</div>
      <div>{{detail.writer}}</div>
      <div v-if="detail.answer">답변 O</div>
      <div v-else>답변 X</div>
    </div>
    <hr />
    <div id="board-title">
      <h1>{{detail.title}}</h1>
    </div>
    <div id="board-content">{{detail.content}}</div>

    <div id="board-footer">
      <div id="footer-content">
        <div>등록일 : {{detail.regDate}}</div>
        <div>수정일 : {{detail.modDate}}</div>
      </div>
    </div>
  </div>

  <div id="board-answer" v-if="detail.answer">
    <hr />
    <div id="board-title">
      <h1>{{detail.boardId}}번 문의에 대한 답변입니다.</h1>
    </div>
    <div id="board-content">{{answer.content}}</div>

    <div id="board-footer">
      <div id="footer-content">
        <div>등록일 : {{answer.regDate}}</div>
        <div>수정일 : {{answer.modDate}}</div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "BoardDetail",
  data() {
    return {
      detail: {},
      answer:{},
    };
  },
  props: {
    boardId: String,
  },
  methods: {
    async getDetail() {
      await this.axios
        .get("/api/boards/detail/" + this.boardId, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          console.log(res.data);
          this.detail = res.data;
          this.answer = res.data.answerBoard;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>

<style></style>

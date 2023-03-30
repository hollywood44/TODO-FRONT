<template>
  <div id="board">
    <div id="board-header">
      <div>번호 : {{ detail.boardId }}</div>
      <div>작성자 : {{ detail.writer }}</div>
      <div v-if="detail.answer">답변 O</div>
      <div v-else>답변 X</div>
    </div>
    <hr />
    <div id="board-title">
      <h1>{{ detail.title }}</h1>
    </div>
    <div id="board-content" v-html="detail.content"></div>

    <div id="board-footer">
      <div id="footer-content">
        <div>등록일 : {{ detail.regDate }} | 수정일 : {{ detail.modDate }} 
          | <span v-if="checkAdmin"><button @click="goToAnswer()" v-if="!detail.answer">답변달기</button><button @click="goToModify(answer.boardId)" v-else>답변 수정하기</button></span></div>
      </div>
      <hr />
      <div id="footer-content-btn" v-if="checkWriter">
        <div>
          <button @click="deleteBoard(detail.boardId)" class="btn-del">
            삭제
          </button>
        </div>
        <div><button @click="goToModify(detail.boardId)">수정</button></div>
      </div>
    </div>
  </div>

  <div id="board-answer" v-if="detail.answer">
    <hr />
    <div id="board-title">
      <h1>{{ detail.boardId }}번 문의에 대한 답변입니다.</h1>
    </div>
    <div id="board-content" v-html="answer.content"></div>

    <div id="board-footer">
      <div id="footer-content">
        <div>등록일 : {{ answer.regDate }}</div>
        <div>수정일 : {{ answer.modDate }}</div>
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
      answer: {},
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
    async goToModify(id) {
      this.$router.push({
        name: "boardModify",
        params: { boardId: id },
      });
    },
    async deleteBoard(id) {
      await this.axios
        .post(
          "/api/boards/delete",
          { boardId: Number(this.boardId) },
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          if (res.status == 200) {
            alert("게시물 삭제가 성공하였습니다.");
            this.$router.push("/board?page=1");
          }
        });
    },
    async goToAnswer(){
      this.$router.push({
        name : 'boardAnswer',
        params : {boardId : this.boardId}
      })
    },
  },
  mounted() {
    this.getDetail();
  },
  computed: {
    checkWriter() {
      if (localStorage.getItem("memberId") == this.detail.writer) {
        return true;
      } else {
        return false;
      }
    },
    checkAdmin(){
      if(localStorage.getItem('memberId').startsWith('admin')){
        return true;
      }else{
        return false;
      }
    },
  },
};
</script>

<style></style>

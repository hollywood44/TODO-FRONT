<template>
  <div id="board">
  <div id="board-answer">
    <div id="board-title">
      <h1>{{ boardId }}번 문의에 대한 답변입니다.</h1>
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
      <button type="submit" class="form-button" @click="postingAnswer()">제출</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "boardAnswer",
  data() {
    return {
      content: "",
      detail : {},
    };
  },
  props:{
    boardId : String
  },
  methods: {
    async postingAnswer(){
        await this.axios.post(
            '/api/admin/suggest-answer',
            {'title' : this.boardId + '번 문의에 대한 답변입니다.','content': this.content, 'parentId' : this.boardId},
            {headers : {Authorization : localStorage.getItem('accessToken')}}
            ).then(res => {
                if(res.status == 200){
                    alert(res.data);
                    this.$router.push('/board/'+this.boardId);
                }
            }).catch(err => {
                alert(err.response.data.message);
            })
    }
  },
};
</script>

<style></style>

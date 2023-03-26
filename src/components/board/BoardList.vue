<template>
  <h1>{{ $route.query.page }} PAGE</h1>
  <table>
    <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>최종 수정일</th>
        <th>답변 여부</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="board in boardList" :key="board.boardId">
        <td>{{ board.boardId }}</td>
        <td><a @click="goToDetail(board.boardId)">{{ board.title }}</a></td>
        <td>{{ board.modDate }}</td>
        <td>{{ board.answer ? "O" : "X" }}</td>
      </tr>
    </tbody>
  </table>

  <div id="paging">
    <nav aria-label="Page navigation" id="board-pagenation">
      <ul class="pagination">
        <li class="page-item-side" v-if="isPrev">
          <a class="page-link" :href="'/board?page=' + prevButton">Prev</a>
        </li>
<!-- th:href="@{|?page=${page}|}" -->
        <li class="page-item" v-for="pageNum in pageCount" :key="pageNum">
          <a class="page-link" :href="'/board?page=' + pageClickButton(pageNum)">{{pageNum + displayPageNum}}</a>
        </li>
        <li class="page-item-side" v-if="isNext">
          <a class="page-link" :href="'/board?page=' + nextButton">Next</a>
        </li>

      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "boardList",
  data() {
    return {
      boardList: [],
      totalPages: 1,
      isPrev: false,
      isNext: false,
      maxPage: 10,
      currentNumber: 1,
      startNumber: 1,
      endNumber:10,
      pageCount:10,
      displayPageNum:0,
    };
  },
  methods: {
    async getList() {
      await this.axios
        .get("/api/boards/list?page=" + this.$route.query.page, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          console.log(res.data);
          this.boardList = res.data.content;
          this.totalPages = res.data.totalPages;
          this.currentNumber = res.data.number+1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async calcPageable(){
        //https://mchch.tistory.com/140
        let startNum = this.currentNumber - (this.currentNumber%this.maxPage) +1;
        this.startNumber = startNum;

        let endNum = this.currentNumber - (this.currentNumber%this.maxPage) + this.maxPage;
        if(endNum > this.totalPages){endNum = this.totalPages;}
        this.endNumber = endNum;

        this.isPrev = (startNum == 1) ? false : true;
        this.isNext = (endNum == this.totalPages) ? false : true;

        let fromTo = endNum % this.maxPage == 0 ? 10 : endNum % this.maxPage;
        this.pageCount = fromTo;

        let displayPageNum = Math.floor(this.$route.query.page/this.maxPage) * this.maxPage;
        this.displayPageNum = displayPageNum;
    },
    async initBoard(){
        await this.getList();
        await this.calcPageable();
    },
    pageClickButton(pageNum){
      return pageNum + this.displayPageNum;
    },
    goToDetail(id){
            this.$router.push({
            name: 'boardDetail',
            params: { boardId: id}
        })
    }
  },
  mounted() {
    this.initBoard();
  },
  computed:{
    prevButton(){
      return this.currentNumber%this.maxPage == 1 ? this.currentNumber-this.maxPage : this.currentNumber-this.maxPage-this.currentNumber%this.maxPage+1;
    },
    nextButton(){
      return this.currentNumber%this.maxPage == 1 ? this.currentNumber+this.maxPage : this.currentNumber+this.maxPage-this.currentNumber%this.maxPage+1;
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/board.css";
</style>

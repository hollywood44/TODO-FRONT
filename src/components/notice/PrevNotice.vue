<template>
  <h1>읽은 알림 목록</h1>
  <div v-for="notice in prevNoticeList" :key="notice.noticeId">
    {{ notice.notice }}
  </div>

  <div id="paging">
    <nav aria-label="Page navigation" id="notice-pagenation">
      <ul class="pagination">
        <li class="page-item-side" v-if="isPrev">
          <a class="page-link" :href="'/notice/prev?page=' + prevButton">Prev</a>
        </li>
        <li class="page-item" v-for="pageNum in pageCount" :key="pageNum">
          <a
            class="page-link"
            :href="'/notice/prev?page=' + pageClickButton(pageNum)"
            >{{ pageNum + displayPageNum }}</a
          >
        </li>
        <li class="page-item-side" v-if="isNext">
          <a class="page-link" :href="'/notice/prev?page=' + nextButton">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "noticeList",
  data() {
    return {
      prevNoticeList: [],
      totalPages: 1,
      isPrev: false,
      isNext: false,
      maxPage: 10,
      currentNumber: 1,
      startNumber: 1,
      endNumber: 10,
      pageCount: 10,
      displayPageNum: 0,
    };
  },
  methods: {
    async getList() {
      await this.axios
        .get("/api/notice/prev-list?page=" + this.$route.query.page, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          this.prevNoticeList = res.data.content;
          this.totalPages = res.data.totalPages;
          this.currentNumber = res.data.number + 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async calcPageable() {
      let startNum =
        this.currentNumber - (this.currentNumber % this.maxPage) + 1;
      this.startNumber = startNum;

      let endNum =
        this.currentNumber - (this.currentNumber % this.maxPage) + this.maxPage;
      if (endNum > this.totalPages) {
        endNum = this.totalPages;
      }
      this.endNumber = endNum;

      this.isPrev = startNum == 1 ? false : true;
      this.isNext = endNum == this.totalPages ? false : true;

      let fromTo = endNum % this.maxPage == 0 ? 10 : endNum % this.maxPage;
      this.pageCount = fromTo;

      let displayPageNum =
        Math.floor(this.$route.query.page / this.maxPage) * this.maxPage;
      this.displayPageNum = displayPageNum;
    },
    async initBoard() {
      await this.getList();
      await this.calcPageable();
    },
    pageClickButton(pageNum) {
      return pageNum + this.displayPageNum;
    },
  },

  mounted() {
    this.initBoard();
  },

  computed: {
    prevButton() {
      return this.currentNumber % this.maxPage == 1 ? this.currentNumber - this.maxPage
        : this.currentNumber - this.maxPage - (this.currentNumber % this.maxPage) + 1;
    },
    nextButton() {
      return this.currentNumber % this.maxPage == 1 ? this.currentNumber + this.maxPage
        : this.currentNumber + this.maxPage - (this.currentNumber % this.maxPage) + 1;
    },
  },
};
</script>

<style></style>

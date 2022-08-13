<template>
  <div class="pagination">
    <!-- 前面 -->
    <button :disabled="pageNo == 1" @click="changePage(pageNo - 1)">
      上一页
    </button>
    <button v-show="numStartEnd.start >= 2" @click="changePage(1)">1</button>
    <button v-show="numStartEnd.start >= 3">···</button>

    <!-- 中间 连续页码的渲染 -->
    <button
      v-for="(page, index) in numStartEnd.end"
      :key="index"
      v-show="page >= numStartEnd.start"
      @click="changePage(page)"
      :class="{ active: page == pageNo }"
    >
      {{ page }}
    </button>

    <!-- 后面 -->
    <button v-show="numStartEnd.end <= totalPage - 2">···</button>
    <button v-show="numStartEnd.end < totalPage" @click="changePage(totalPage)">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="changePage(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "continues", "total"],
  computed: {
    // 计算总页码，渲染页码数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    numStartEnd() {
      let start = 0;
      let end = 0;
      let mid = parseInt(this.continues / 2);
      if (this.totalPage <= this.continues) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - mid;
        end = this.pageNo + mid;
      }
      // 对错误的请求进行纠正
      // 当点击最后一页，PageNo也变了，
      // 所以end也变了，因此此时对end进行纠正
      if (end > this.totalPage) {
        start = this.totalPage - this.continues + 1;
        end = this.totalPage;
      }
      if (start < 1) {
        start = 1;
        end = this.continues;
      }
      // console.log({ start, end });
      return { start, end };
    },
  },
  methods: {
    changePage(pageInfo) {
      // console.log(pageInfo);
      this.$emit("updatePage", pageInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ff4040;
      color: #fff;
    }
  }
}
</style>
<template>
  <el-card class="box-card">
    <div slot="header" class="card-head">
      <span>{{ answer.answerUserName }}</span>
      <span>{{ answer.pubdate }}</span>
    </div>
    <div class="card-text">{{ answer.content }}</div>
  </el-card>
</template>
<script>
export default {
  props: {
    answer: {
      type: Object,
      default: function() {
        return {
          answer: {
            answerUserName: '',
            pubdate: '',
            content: ''
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    min-width: 275px;
    max-width: 600px;
    margin-bottom: 10px;
  }
  .card-head {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: #606266;
  }
  .card-title {
    font-size: 16px;
    font-weight: bold;
    color: #606266;
    margin-bottom: 10px;
  }
  .card-text {
    font-size: 14px;
    color: #606266;
  }
  /deep/ .el-card__body {
    background: #f0f2f5;
  }
</style>

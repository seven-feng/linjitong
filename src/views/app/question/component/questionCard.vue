<template>
  <el-card class="box-card">
    <div slot="header" class="card-head">
      <span>{{ question.editor }}</span>
      <span>{{ question.pubdate }}</span>
      <span>{{ question.subType }}</span>
    </div>
    <div class="card-title">{{ question.title }}</div>
    <div v-for="(img, index) in question.imageUrls" :key="index" class="illustration">
      <img :src="'/TDS' + img">
    </div>
    <div class="card-text">{{ question.content }}</div>
  </el-card>
</template>
<script>
export default {
  props: {
    question: {
      type: Object,
      default: function() {
        return {
          question: {
            editor: '',
            pubdate: '',
            subType: '',
            title: '',
            imageUrls: [],
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
    font-size: 14px;
    color: #606266;
    display: flex;
    justify-content: space-around;
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
    background-color: rgba(103,194,58,.1);
  }

</style>

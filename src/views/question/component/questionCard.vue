<template>
  <el-card class="box-card">
    <div slot="header" class="card-head">
      <span>{{ question.editor }}</span>
      <span>{{ question.pubdate }}</span>
      <span>{{ question.subType }}</span>
    </div>
    <div class="card-title">{{ question.title }}</div>
    <!-- <div v-for="(img, index) in question.imageUrls" :key="index" class="illustration">
      <img :src="'/TDS' + img">
    </div> -->
    <el-carousel height="200px">
      <el-carousel-item v-for="(item,index) in question.imageUrls" :key="index">
        <img :src="'/TDS' + item" alt="">
      </el-carousel-item>
    </el-carousel>
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
    background-color: rgba(103,194,58,.1);
  }
  .illustration {
    text-align: center;
    img {
      max-width: 600px;
      margin-top: 10px;
    }
  }
</style>

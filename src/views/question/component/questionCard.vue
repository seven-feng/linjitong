<template>
  <el-card class="box-card">
    <div slot="header" class="card-head">
      <span>{{ question.name }}</span>
      <span>{{ question.time }}</span>
      <span>{{ question.type }}</span>
      <span>{{ question.object }}</span>
    </div>
    <div class="card-title">{{ question.title }}</div>
    <div class="card-text">{{ question.content }}</div>
  </el-card>
</template>
<script>
export default {
  // props: ['name', 'time', 'type', 'object', 'title', 'content'],
  props: {
    question: {
      type: Object,
      default: function() {
        return {
          question: {
            name: '叶军',
            time: '2018-12-13 10:48:09',
            type: '类型：山核桃',
            object: '提问对象：胡瑞财',
            title: '美国山核桃',
            content: '想种美国山核桃，请问十公分直径的树多少钱一棵'
          }
        }
      }
    }
  },
  data() {
    return {

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

</style>

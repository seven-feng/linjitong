<template>
  <div class="app-container">
    <questionCard :question="question"/>
    <answer-card v-for="(answer, index) in answers" :key="index" :answer="answer"/>
    <div class="btn-container">
      <el-button type="primary" size="small" @click="handleReply">回复</el-button>
      <el-button size="small" @click="handleBack">返回</el-button>
    </div>

    <el-dialog :visible.sync="replyDialogVisible" class="reply-dialog">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="content">
          <el-input :rows="4" v-model="form.content" type="textarea" placeholder="请输入回复内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSubmit('form')">确 定</el-button>
        <el-button size="small" @click="replyDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import questionCard from '../component/questionCard'
import answerCard from '../component/answerCard'
import { getQuestion, getAnswers, saveAnswer } from '@/api/table'

export default {
  components: { questionCard, answerCard },
  data() {
    return {
      id: '', // 问题id
      question: {
        editor: '',
        pubdate: '',
        subType: '',
        title: '',
        imageUrls: [],
        content: ''
      },
      answers: [],
      replyDialogVisible: false, // 回复对话框默认隐藏
      form: {
        questionId: '',
        content: '' // 回复内容
      },
      rules: {
        content: [
          { required: true, message: '请输入回复内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  mounted() {
    getQuestion(this.id).then(res => { // 获取问题
      if (res.data !== null) {
        this.question = res.data
      }
    })
    getAnswers(this.id).then(res => { // 获取回答
      if (res.data !== null) {
        this.answers = res.data
      }
    })
  },
  methods: {
    handleBack() { // 返回上一页
      this.$router.go(-1)
    },
    handleReply() { // 回复问题
      this.replyDialogVisible = true // 显示回复对话框
      this.$refs['form'].resetFields() // 坑：必须对话框显示以后，'form'才起作用
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.questionId = this.id
          saveAnswer(this.form)
            .then(() => {
              this.$message({ message: '回复成功！', type: 'success', center: true })
            })
            .catch(() => {
              this.$message({ message: '回复失败！', type: 'error', center: true })
            })
        } else {
          this.$message({ message: '验证失败！', type: 'error', center: true })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-container {
    min-width: 275px;
    max-width: 600px;
    text-align: center;
  }
  /deep/ .el-dialog {
    min-width: 275px;
    max-width: 600px;
  }
  .el-message-box {
    width: 275px;
  }
</style>

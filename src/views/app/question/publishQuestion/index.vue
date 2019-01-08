<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="60px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" :rows="6" type="textarea" placeholder="请输入内容" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          :file-list="imageList"
          :auto-upload="false"
          :before-remove="beforeRemove"
          :on-change="handleChange"
          :on-remove="handleRemove"
          action=""
          list-type="picture-card"
          style="min-width: 275px; max-width: 500px;">
          <i class="el-icon-plus"/>
          <div slot="tip" class="el-upload__tip">请上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型" prop="subType">
        <el-select v-model="form.subType" placeholder="请选择产业类型" style="min-width: 275px;">
          <el-option v-for="(item, index) in subTypes" :key="index" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-row style="text-align: center; margin-top: 30px;">
        <el-button type="primary" @click="handleSubmit('form')">发布</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-row>
    </el-form>
    <app-footer/>
  </div>
</template>

<script>
import { postQuestion } from '@/api/table'
import appFooter from '../../components/footer'
export default {
  components: { appFooter },
  data() {
    return {
      form: {
        title: '',
        content: '',
        images: [],
        subType: ''
      },
      subTypes: ['竹笋', '山核桃', '香榧', '油茶', '花卉苗木', '其他木本粮油', '林下经济'],
      rules: { // 表单验证规则
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        subType: [
          { required: true, message: '请选择产业类型', trigger: 'change' }
        ]
      },
      imageList: [], // 上传图片列表
      images: []
    }
  },
  created() {
  },
  methods: {
    handleRemove(file, fileList) {
      this.images = []
      fileList.map(item => {
        this.images.push(item.raw)
      })
    },
    handleChange(file, fileList) {
      this.images = []
      fileList.map(item => {
        this.images.push(item.raw)
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    handleSubmit(formName) { // 提交表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('title', this.form.title) // 标题
          formData.append('content', this.form.content) // 内容
          this.images.map(item => { // 上传图片
            formData.append('images', item)
          })
          formData.append('subType', this.form.subType) // 产业类型
          postQuestion(formData)
            .then(() => {
              this.$message({ message: '发布成功！', type: 'success', center: true })
              this.$router.go(-1)
            })
            .catch(() => {
              this.$message({ message: '发布失败！', type: 'error', center: true })
            })
        } else {
          this.$message({ message: '验证失败！', type: 'error', center: true })
        }
      })
    },
    resetForm(formName) { // 重置表单
      this.$refs[formName].resetFields()
      this.imageList = []
      this.images = []
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  margin-bottom: 22px;
  max-width: 800px;
}
</style>

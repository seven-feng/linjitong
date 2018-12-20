<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="60px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <el-form-item label="大类" prop="type">
        <el-select v-model="form.type" placeholder="请选择大类" clearable class="filter-item" style="min-width: 275px;">
          <el-option v-for="(item, index) in types" :key="index" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="子类" prop="subType">
        <el-select v-model="form.subType" placeholder="请选择子类" clearable class="filter-item" style="min-width: 275px;">
          <el-option v-for="(item, index) in subTypes" :key="index" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="form.intro" :rows="6" type="textarea" placeholder="输入内容不要超过255个字" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <el-form-item label="附件" prop="files">
        <el-upload
          ref="reportUpload"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :auto-upload="false"
          :on-change="filesChange"
          :on-remove="filesRemove"
          action=""
          multiple
          style="min-width: 275px; max-width: 500px;">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">如需更改，请重新上传所有文件</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit('form')">发布</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postMessage } from '@/api/table'

export default {
  data() {
    return {
      form: {
        title: '',
        intro: ''
      },
      rules: { // 表单验证规则
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择大类', trigger: 'change' }
        ],
        subType: [
          { required: true, message: '请选择子类', trigger: 'change' }
        ],
        files: [
          { required: true, message: '请上传文件', trigger: 'change' }
        ]
      },
      types: ['林技产业'],
      subTypes: ['竹笋', '山核桃', '香榧', '油茶', '花卉苗木', '其他木本粮油', '林下经济'],
      fileList: [], // 上传文件列表
      files: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    filesChange(file, fileList) {
      this.files = []
      fileList.map(item => {
        this.files.push(item.raw)
      })
    },
    filesRemove(file, fileList) {
      this.files = []
      fileList.map(item => {
        this.files.push(item.raw)
      })
    },
    handleSubmit(formName) { // 提交表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          // const formData = new FormData()
          debugger
          postMessage(this.form)
            .then(() => {
              this.$message({ message: '提交成功！', type: 'success', center: true })
              this.$router.go(-1)
            })
            .catch(() => {
              this.$message({ message: '提交失败！', type: 'error', center: true })
            })
        } else {
          this.$message({ message: '验证失败！', type: 'error', center: true })
        }
      })
    },
    resetForm(formName) { // 重置表单
      this.$refs[formName].resetFields()
      this.fileList = [] // 清空附件
      this.files = []
    }
  }
}
</script>


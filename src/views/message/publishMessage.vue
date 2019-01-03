<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="60px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <el-form-item label="区域" prop="areaName">
        <el-input ref="areaInput" v-model="form.areaName" style="min-width: 275px; max-width: 500px;" @focus="handleAreaDialog"/>
        <el-input v-model="form.areaId" style="display: none;"/>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="form.intro" :rows="6" type="textarea" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <!-- <el-form-item label="图片">
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
      </el-form-item> -->
      <el-form-item label="编辑器">
        <div class="tinymce-container">
          <tinymce :height="300" v-model="content"/>
        </div>
      </el-form-item>
      <el-form-item label="附件">
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
      <el-dialog :visible.sync="areaDialogVisible" width="300px" lock-scroll top="10vh" class="area-dialog">
        <el-tree :data="treeData" :props="defaultProps" accordion @node-click="handleTreeClick"/>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { postMessage, getArea } from '@/api/table'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      form: {
        title: '',
        areaName: '',
        areaId: '',
        intro: ''
      },
      treeData: [],
      rules: { // 表单验证规则
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        areaId: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ]
      },
      defaultProps: { // 树形控件属性
        children: 'children',
        label: 'label'
      },
      areaDialogVisible: false, // 区域选择对话框
      // imageList: [], // 上传图片列表
      // images: [],
      fileList: [], // 上传文件列表
      files: [],
      content: ''
    }
  },
  created() {
    getArea().then(res => {
      this.treeData = res.data
    })
  },
  methods: {
    handleAreaDialog() { // 显示区域选择框
      this.areaDialogVisible = true
      this.$refs['areaInput'].blur()
    },
    handleTreeClick(data, node) {
      this.form.areaId = data.id
      this.form.areaName = data.label
      this.areaDialogVisible = false
      this.$refs['form'].clearValidate('area') // 选择区域以后，手动清除表单验证
    },
    // handleRemove(file, fileList) {
    //   this.images = []
    //   fileList.map(item => {
    //     this.images.push(item.raw)
    //   })
    // },
    // handleChange(file, fileList) {
    //   this.images = []
    //   fileList.map(item => {
    //     this.images.push(item.raw)
    //   })
    // },
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
          const formData = new FormData()
          formData.append('title', this.form.title) // 标题
          formData.append('areaName', this.form.areaName) // 区域名称
          formData.append('areaId', this.form.areaId) // 区域id
          formData.append('intro', this.form.intro) // 简介
          // this.images.map(item => { // 上传图片
          //   formData.append('images', item)
          // })
          formData.append('content', this.content) // HTML 内容
          this.files.map(item => { // 上传文件
            formData.append('files', item)
          })
          postMessage(formData)
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

<style lang="scss" scoped>
.tinymce-container {
  margin-bottom: 22px;
  max-width: 800px;
}
</style>

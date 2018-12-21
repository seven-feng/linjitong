<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="60px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <el-form-item label="区域" prop="areaName">
        <el-input v-model="form.areaName" style="min-width: 275px; max-width: 500px;" @focus="handleAreaDialog"/>
        <el-input v-model="form.areaId" style="display: none;"/>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="form.intro" :rows="6" type="textarea" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card" >
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" width="100%" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="方式" prop="uploadType">
        <el-radio-group v-model="form.uploadType">
          <el-radio label="0">使用文件上传</el-radio>
          <el-radio label="1">使用HMTL编辑器</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-show="form.uploadType === '0'" label="附件" prop="files">
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

      <div v-show="form.uploadType === '1'" class="tinymce-container">
        <tinymce :height="300" v-model="content"/>
      </div>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit('form')">发布</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>

      <el-dialog :visible.sync="areaDialogVisible" width="300px" lock-scroll top="10vh">
        <el-tree :load="loadArea" :props="defaultProps" lazy accordion @node-click="handleTreeClick"/>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { postMessage } from '@/api/table'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      form: {
        title: '',
        areaName: '',
        areaId: '',
        intro: '',
        images: [],
        uploadType: ''
      },
      rules: { // 表单验证规则
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        uploadType: [
          { required: true, message: '请选择上传方式', trigger: 'change' }
        ]
        // files: [
        //   { required: true, message: '请上传文件', trigger: 'change' }
        // ]
      },
      defaultProps: { // 树形控件属性
        children: 'children',
        label: 'label'
      },
      areaDialogVisible: false, // 区域选择对话框
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [], // 上传文件列表
      files: [],
      content:
      `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    }
  },
  methods: {
    handleAreaDialog() { // 显示区域选择框
      this.areaDialogVisible = true
    },
    loadArea(node, resolve) {
      if (node.level === 0) {
        return resolve([{ id: '000', label: '浙江' }])
      }
      if (node.level > 2) return resolve([]) // 只有三层

      // setTimeout(() => {
      //   getIssueSecondType(node.data.id).then(res => {
      //     resolve(res.data)
      //   })
      // }, 500)
      setTimeout(() => {
        const data = [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }]

        resolve(data)
      }, 500)
    },
    handleTreeClick(data, node) {
      this.form.areaId = data.id
      this.form.areaName = data.label
      this.areaDialogVisible = false
      this.$refs['form'].clearValidate('area') // 选择区域以后，手动清楚表单验证
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
          const formData = new FormData()
          this.files.map(item => {
            formData.append('files', item)
          })
          formData.append('title', this.form.title)
          formData.append('areaName', this.form.areaName)
          formData.append('areaId', this.form.areaId)
          formData.append('intro', this.form.intro)
          formData.append('uploadType', this.form.uploadType)
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

<style scoped>
.tinymce-container {
  margin-bottom: 22px;
}
</style>

<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-position="right" label-width="60px">
      <el-form-item label="标题">
        <el-input v-model="form.title" readonly style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="form.subType" placeholder="类别" clearable disabled class="filter-item select-disabled" style="min-width: 275px;">
          <el-option v-for="(item, index) in subTypes" :key="index" :label="item" :value="item"/>
        </el-select>
      </el-form-item>

      <el-form-item label="简介">
        <el-input v-model="form.intro" :rows="6" type="textarea" placeholder="输入内容不要超过255个字" readonly style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>

      <el-form-item label="附件">
        <div v-for="(file, index) in form.files" :key="index">
          <a :href="'/TDS/' + file" style="text-decoration:underline;">
              {{ file.substring(file.lastIndexOf('/') + 1, file.length) }}
          </a>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '油茶产业发展关键技术及应用',
        subType: '油茶',
        intro: '浙江省林业科学研究院 陈友吾 副研究员',
        files: ['123.txt', '345.txt']
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
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .select-disabled .el-input__inner {
    background-color: transparent;
    color: #606266;
  }
</style>



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
import { getKnowledge } from '@/api/table'

export default {
  data() {
    return {
      id: '',
      form: {
        title: '',
        subType: '',
        intro: '',
        files: []
      },
      types: ['林技产业'],
      subTypes: ['综合', '林下经济', '竹笋', '花卉苗木', '木本粮油']
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  mounted() {
    getKnowledge(this.id).then(res => {
      if (res.data !== null) {
        this.form.title = res.data.title
        this.form.subType = res.data.subType
        this.form.intro = res.data.intro
        this.form.files = res.data.fileUrls
      }
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  /deep/ .select-disabled .el-input__inner {
    background-color: transparent;
    color: #606266;
  }
</style>

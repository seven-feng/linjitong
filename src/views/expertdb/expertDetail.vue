<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-position="right" label-width="60px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" style="max-width: 275px;"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" placeholder="请输入年龄" style="max-width: 275px;"/>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.age" placeholder="请输入电话" style="max-width: 275px;"/>
      </el-form-item>
      <el-form-item label="类别" prop="type">
        <el-select v-model="form.type" placeholder="请选择类别" clearable class="filter-item" style="min-width: 275px;">
          <el-option v-for="(item, index) in types" :key="index" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="单位" prop="department">
        <el-input v-model="form.department" placeholder="请输入单位" style="max-width: 275px;"/>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="form.intro" :rows="6" type="textarea" placeholder="输入内容不要超过255个字" style="min-width: 275px; max-width: 500px;"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getExpert } from '@/api/table'

export default {
  data() {
    return {
      id: '',
      form: {
        name: '',
        age: '',
        phone: '',
        type: '',
        department: '',
        intro: ''
      },
      types: ['林技产业']
    }
  },
  created() {
    this.id = this.$route.params.id
    getExpert(this.id).then(res => {
      if (res.data != null) {
        this.form.name = res.data.name
        this.form.age = res.data.age
        this.form.phone = res.data.phone
        this.form.type = res.data.type
        this.form.department = res.data.department
        this.form.intro = res.data.intro
      }
    })
  }
}
</script>


<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="60px">
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
      <el-form-item>
        <el-button type="primary" size="small" @click="handleSubmit('form')">发布</el-button>
        <el-button size="small" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postExpert } from '@/api/table'

export default {
  data() {
    return {
      form: {
        name: '',
        age: '',
        phone: '',
        type: '',
        department: '',
        intro: ''
      },
      rules: { // 表单验证规则
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择大类', trigger: 'change' }
        ]
      },
      types: ['林技产业']
    }
  },
  methods: {
    handleSubmit(formName) { // 提交表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('name', this.form.name) // 姓名
          formData.append('age', this.form.age) // 年龄
          formData.append('phone', this.form.phone) // 电话
          formData.append('type', this.form.type) // 类别
          formData.append('department', this.form.department) // 单位
          formData.append('intro', this.form.intro) // 简介

          postExpert(formData)
            .then(() => {
              this.$message({ message: '提交成功！', type: 'success', center: true })
              this.$router.push({ name: 'expertList' })
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
    }
  }
}
</script>


<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <h3 class="title">注册</h3>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" type="text" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="pwdType"
          v-model="registerForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item prop="areaName">
        <el-input v-model="registerForm.areaName" type="text" placeholder="地区" @focus="handleAreaDialog"/>
        <el-input v-model="registerForm.areaId" style="display: none;"/>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="registerForm.phone" type="text" placeholder="手机号"/>
      </el-form-item>
      <el-form-item prop="verification">
        <el-input v-model="registerForm.verification" name="verification" type="text" auto-complete="on">
          <el-button slot="append">获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
          完成
        </el-button>
      </el-form-item>
      <el-dialog :visible.sync="areaDialogVisible" :modal-append-to-body="false" width="300px" lock-scroll top="10vh">
        <el-tree :data="treeData" :props="defaultProps" accordion @node-click="handleTreeClick"/>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { getArea } from '@/api/table'
export default {
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码不能小于8位'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value.length < 11) {
        callback(new Error('手机号不能小于11位'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        areaName: '',
        areaId: '',
        phone: '',
        verification: '' // 验证码
      },
      registerRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        areaName: [{ required: true, message: '请选择地区', trigger: 'change' }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        verification: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      defaultProps: { // 树形控件属性
        children: 'children',
        label: 'label'
      },
      areaDialogVisible: false,
      treeData: [],
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      dialogVisible: false
    }
  },
  created() {
    getArea().then(res => {
      this.treeData = res.data
    })
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleAreaDialog() { // 显示区域选择框
      this.areaDialogVisible = true
    },
    handleTreeClick(data, node) {
      this.registerForm.areaId = data.id
      this.registerForm.areaName = data.label
      this.areaDialogVisible = false
      this.$refs['registerForm'].clearValidate('area') // 选择区域以后，手动清除表单验证
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Register', this.registerForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.register-container {
  .el-input {
    // display: inline-block;
    height: 47px;
    // width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .register-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 80px auto;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<template>
  <div class="app-container">
    <div style="text-align: center;">
      <el-radio-group v-model="radio" size="small" @change="handleRadio">
        <el-radio-button label="我的提问"/>
        <el-radio-button label="问题总览"/>
      </el-radio-group>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '我的提问'
    }
  },
  methods: {
    handleRadio(val) {
      if (val === '我的提问') {
        this.$router.push({ name: 'myQuestion' })
      } else {
        this.$router.push({ name: 'allQuestion' })
      }
    }
  }
}
</script>

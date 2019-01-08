<template>
  <div class="app-container">
    <div style="text-align: center;">
      <el-radio-group v-model="radio" size="small" @change="handleRadio">
        <el-radio-button label="我的提问"/>
        <el-radio-button label="问题总览"/>
      </el-radio-group>
    </div>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import appFooter from '../components/footer'
export default {
  components: { appFooter },
  data() {
    return {
      radio: '问题总览'
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

<style lang="scss" scoped>
  .app-container {
    margin-bottom: 60px;
  }
</style>


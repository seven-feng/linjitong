<template>
  <div class="app-container">
    <div class="head">
      <h3 style="text-align: center;">{{ title }}</h3>
      <div v-if="pubdate" style="text-align: center; color: #606266; font-size: 14px">
        <span>编辑：{{ editor }}</span><span style="margin-left: 20px">时间：{{ pubdate }}</span>
      </div>
    </div>
    <div class="body">
      <div v-for="(img, index) in imageUrls" :key="index" class="illustration">
        <img :src="'/TDS' + img">
      </div>
      <div style="color: #606266;" v-html="content"/>
      <div style="font-size: 14px; margin-top: 20px;">
        <a v-for="(file, index) in fileUrls" :key="index" :href="'/TDS' + file" style="text-decoration:underline; margin-right: 10px;">
          {{ file.substring(file.lastIndexOf('/') + 1, file.length) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessage } from '@/api/table'

export default {
  data() {
    return {
      id: '', // 消息id
      title: '',
      editor: '',
      pubdate: '',
      imageUrls: [],
      content: '',
      fileUrls: []
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  mounted() {
    getMessage(this.id).then(res => {
      if (res.data != null) {
        this.title = res.data.title
        this.editor = res.data.editor
        this.pubdate = res.data.pubdate
        this.imageUrls = res.data.imageUrls
        this.content = res.data.content
        this.content = this.content.split('img').join('img style="max-width: 100%;"')
        this.fileUrls = res.data.fileUrls
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.illustration {
  text-align: center;
  img {
     max-width: 600px;
     margin-top: 10px;
  }
}
</style>

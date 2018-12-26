<template>
  <div class="app-container">
    <div class="head">
      <h3 style="text-align: center;">{{ title }}</h3>
      <div style="text-align: center; color: #606266; font-size: 14px">
        <span>编辑：{{ editor }}</span><span style="margin-left: 20px">时间：{{ pubdate }}</span>
      </div>
    </div>
    <div class="body">
      <el-row v-for="(img, index) in imageUrls" :key="index" class="illustration">
        <img :src="'/TDS' + img">
      </el-row>
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
      title: '省乡土专家首次获得省林业专业高级工程师职称',
      editor: '浙江张俊',
      pubdate: '2018-12-13',
      imageUrls: ['/static/1.jpg'],
      content:
        '<p style="text-indent: 2em; color: #606266; font-size: 14px; line-height: 25px;">  近日，2018年浙江省林业专业高级工程师职务任职资格评审结果公布，浙江省林业乡土专家方永根赫然在目。这是最新文件《关于印发浙江省林业专业高级工程师职务任职资格评价条件的通知》实施以来，基层高技能人才首获高级工程师职称。标志着我省林业在推进乡村振兴战略，加强基层林业技术队伍建设上迈出坚实一步。</p>' +
        '<p style="text-indent: 2em; color: #606266; font-size: 14px; line-height: 25px;">  近几年，我省高技能人员在林业工作中发挥的作用越来越突出，如专业合作社、森林人家、林业示范大户等林业生产经营主体为当地林业经济发展和农民增收致富做出越来越大贡献。同时省里也高度重视新型职业农民队伍建设，新的资格评价条件与时俱进地打通了高技能人才申报渠道，明确了相应的申报条件，为行业内业绩公认、成效显著的林业乡土专家评上职称提供机会。</p>' +
        '<p style="text-indent: 2em; color: #606266; font-size: 14px; line-height: 25px;">  根据《浙江省林业乡土专家管理办法》，省林技推广总站2017年在全省林技推广能手范围内开展认定，方永根等56位同志为首届浙江省林业乡土专家。从1994年以来方永根一直专心从事杜鹃花的新品种选育和推广，其中‘红阳’等多个新品种获得国家植物新品种保护授权，先后建立杜鹃花种质资源圃、科普展示观赏园和杜鹃花生产基地，还通过建立杜鹃花科普推广网站和示范基地，每年培训指导各地花农和客户1500多人。</p>' +
        '<p style="text-indent: 2em; color: #606266; font-size: 14px; line-height: 25px;">  人才是乡村振兴的第一资源。我省将继续做实“浙江省林业乡土专家”品牌，优先推荐其获得示范基地建设，在成果申报、职称晋升、推优评奖同等条件下予以倾斜，充分激发全省广大基层林技人员的工作积极性和创造性，加快林业科技成果的转移转化。(局人事处、浙江省林业技术推广总站)</p>',
      fileUrls: ['/a/1.txt']
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
     max-width: 80%;
     margin-top: 10px;
  }
}
</style>

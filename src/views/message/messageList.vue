<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="标题"
        style="width: 200px;"
        class="filter-item"
        size="mini"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="handleFilter"
      >{{ "搜索" }}</el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%;"
    >
      <el-table-column
        label="序号"
        type="index"
        width="60"
      />
      <el-table-column
        label="标题"
        prop="title"
        show-overflow-tooltip
        min-width="200"
      />
      <el-table-column
        label="简介"
        prop="intro"
        class-name="nowrap"
        min-width="150"
      />
      <el-table-column
        label="编辑"
        prop="editor"
        width="100"
      />
      <el-table-column
        label="发布时间"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.pubdate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        v-show="total > 0"
        :page-size="10"
        :total="total"
        layout="total, prev, pager, next"
        background
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getMessageList, delMessageList } from '@/api/table'

export default {
  data() {
    return {
      total: 12,
      listQuery: {
        page: 1,
        limit: 10,
        title: ''
      },
      tableData: []
      //   tableData: [{
      //     id: 1,
      //     title: "省乡土专家首次获得省林业专业高级工程师职称",
      //     intro: "省乡土专家首次获得省林业专业高级工程师职称",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 2,
      //     title: "应对低温雨雪灾害，林技通来帮忙",
      //     intro: "应对低温雨雪灾害，林技通来帮忙",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 3,
      //     title: "浙江省林业局关于开展寻找 “最美林技推广员”活动的通知",
      //     intro: "浙江省林业局关于开展寻找 “最美林技推广员”活动的通知",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 4,
      //     title: "省林业局加强“一亩山万元钱”科技富民模式及食用林产品质量安全",
      //     intro: "省林业局加强“一亩山万元钱”科技富民模式及食用林产品质量安全",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 5,
      //     title: "科普活动“‘一亩山万元钱’科技富民模式普及与推广”喜获梁希科",
      //     intro: "科普活动“‘一亩山万元钱’科技富民模式普及与推广”喜获梁希科",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 6,
      //     title: "浙江省第十五届林业科技周活动在余姚启动",
      //     intro: "浙江省第十五届林业科技周活动在余姚启动",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 7,
      //     title: "仙居上张：香榧硕果吹响增收号角",
      //     intro: "仙居上张：香榧硕果吹响增收号角",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 8,
      //     title: "浙江省林业厅关于举办浙江省第十五届 林业科技周活动的通知",
      //     intro: "浙江省林业厅关于举办浙江省第十五届 林业科技周活动的通知",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 9,
      //     title: "浙江省“一亩山万元钱”科技支撑团赴贵州黔东南州开展技术扶贫",
      //     intro: "浙江省“一亩山万元钱”科技支撑团赴贵州黔东南州开展技术扶贫",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }, {
      //     id: 10,
      //     title: "省政协调研组到富阳开展“健全科技下乡长效机制”调研工作",
      //     intro: "省政协调研组到富阳开展“健全科技下乡长效机制”调研工作",
      //     editor: "浙江张骏",
      //     pubdate: '2016-05-02'
      //   }]
    }
  },
  mounted() {
    this.getlist() // 获取消息列表
  },
  methods: {
    getlist() {
      // 获取消息列表
      getMessageList(this.listQuery).then(response => {
        this.tableData = response.data.list
        this.total = response.data.total
      })
    },
    handleFilter() {
      // 标题过滤
      this.listQuery.page = 1
      this.getlist()
    },
    handleCurrentChange(val) {
      // 页码切换
      this.listQuery.page = val
      this.getlist()
    },
    handleEdit(index, row) { // 编辑按钮
      if (this.$route.name === 'messageList') {
        this.$router.push({ name: 'messageDetail', params: { id: row.id }}) // 跳转消息详情页
      } else {
        this.$router.push({ name: 'appMessageDetail', params: { id: row.id }}) // 跳转app消息详情页
      }
      console.log(index, row)
    },
    handleDelete(index, row) { // 删除按钮
      // 删除成功以后，重新加载列表
      delMessageList(row.id).then(resopnse => {
        this.getlist()
      })
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  /deep/ .nowrap .cell {
    white-space: nowrap;
  }
}
</style>


<template>
  <div style="margin-top: 20px;">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" type="text" size="small">
        <el-button slot="append" @click="handleFilter">搜索</el-button>
      </el-input>
    </div>
    <el-table :data="tableData" :show-header="false" style="width: 100%" @row-click="handleRow">
      <el-table-column label="标题" prop="title" show-overflow-tooltip min-width="200"/>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total > 0" :page-size="10" :total="total" layout="prev, pager, next" background @current-change="handleCurrentChange"/>
    </div>
    <el-button type="primary" style="width: 100%; margin-top: 20px;" @click="handleQuestion">提问</el-button>
  </div>
</template>

<script>
import { getQuestionList } from '@/api/table'
export default {
  data() {
    return {
      total: 10,
      listQuery: {
        page: 1,
        limit: 10,
        title: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() { // 获取列表
      getQuestionList(this.listQuery).then(response => {
        this.tableData = response.data.list
        this.total = response.data.total
      })
    },
    handleFilter() { // 标题过滤
      this.listQuery.page = 1
      this.getlist()
    },
    handleRow(row) { // 跳转app消息详情页
      this.$router.push({ name: 'appQuestionDetail', params: { id: row.id }})
    },
    handleCurrentChange(val) { // 页码切换
      this.listQuery.page = val
      this.getlist()
    },
    handleQuestion() { // 提问按钮
      this.$router.push({ name: 'appPublishQuestion' })
    }
  }
}
</script>


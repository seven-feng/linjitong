<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTab">
      <el-tab-pane label="竹笋" name="zhusun"/>
      <el-tab-pane label="山核桃" name="shanhetao"/>
      <el-tab-pane label="香榧" name="xiangfei"/>
      <el-tab-pane label="其他" name="qita"/>
    </el-tabs>
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
  </div>
</template>

<script>
import { getQuestionList } from '@/api/table'
export default {
  data() {
    return {
      activeName: 'zhusun',
      total: 10,
      listQuery: {
        page: 1,
        limit: 10,
        title: '',
        subType: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    handleTab(tab, event) {
      this.listQuery.subType = tab.label
      this.getlist()
    },
    getlist() { // 获取列表
      getQuestionList(this.listQuery).then(response => {
        this.tableData = response.data.list
        this.total = response.data.total
      })
    },
    handleRow(row) { // 编辑按钮
      this.$router.push({ name: 'appQuestionDetail', params: { id: row.id }}) // 跳转问答详情页
    },
    handleFilter() { // 标题过滤
      this.listQuery.page = 1
      this.getlist()
    },
    handleCurrentChange(val) { // 页码切换
      this.listQuery.page = val
      this.getlist()
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" size="small" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" size="small" @click="handleFilter">{{ "搜索" }}</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;" @row-click="handleRow">
      <el-table-column label="标题" prop="title" show-overflow-tooltip min-width="200"/>
      <el-table-column label="发布时间" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.pubdate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total > 0" :page-size="10" :total="total" layout="prev, pager, next" background @current-change="handleCurrentChange"/>
    </div>
    <app-footer/>
  </div>
</template>
<script>
import { getMessageList } from '@/api/table'
import appFooter from '../components/footer'
export default {
  components: { appFooter },
  data() {
    return {
      total: 12,
      listQuery: {
        page: 1,
        limit: 10,
        title: ''
      },
      tableData: []
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
    handleRow(row) {
      this.$router.push({ name: 'appMessageDetail', params: { id: row.id }}) // 跳转app消息详情页
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  margin-bottom: 60px;
  /deep/ .nowrap .cell {
    white-space: nowrap;
  }
}
</style>


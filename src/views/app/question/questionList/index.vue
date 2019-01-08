<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" class="filter-item" @keyup.enter.native="handleFilter"/>
    </div>
    <el-table :data="tableData" :show-header="false" style="width: 100%" @row-click="handleEdit">
      <el-table-column label="标题" prop="title" show-overflow-tooltip min-width="200"/>
      <!-- <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total > 0" :page-size="10" :total="total" layout="total, prev, pager, next" background @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getQuestionList, delQuestionList } from '@/api/table'

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
    handleCurrentChange(val) { // 页码切换
      this.listQuery.page = val
      this.getlist()
    },
    handleEdit(row) { // 编辑按钮
      this.$router.push({ name: 'questionDetail', params: { id: row.id }}) // 跳转消息详情页
    },
    handleDelete(index, row) { // 删除按钮
      delQuestionList(row.id).then(resopnse => {
        this.getlist() // 删除成功以后，重新加载列表
      })
      console.log(index, row)
    }
  }
}
</script>

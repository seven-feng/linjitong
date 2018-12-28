<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" size="mini" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFilter">{{ "搜索" }}</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="序号" type="index" width="60"/>
      <el-table-column label="标题" prop="title" show-overflow-tooltip min-width="200"/>
      <el-table-column label="简介" prop="intro" class-name="nowrap" min-width="150"/>
      <el-table-column label="编辑" prop="editor" width="100"/>
      <el-table-column label="发布时间" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.pubdate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total > 0" :page-size="10" :total="total" layout="total, prev, pager, next" background @current-change="handleCurrentChange"/>
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
      debugger
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


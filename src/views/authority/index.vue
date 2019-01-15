<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="姓名" style="width: 200px;" class="filter-item" size="mini" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFilter">{{ "搜索" }}</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="序号" type="index" width="100"/>
      <el-table-column label="姓名" prop="name"/>
      <el-table-column label="权限" width="700">
        <template slot-scope="scope">
          <el-select v-model="scope.row.roles" multiple placeholder="请选择" style="min-width: 300px;" @change="handleChange(scope.row)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime"/>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total > 0" :page-size="10" :total="total" layout="total, prev, pager, next" background @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getUserList, postUserAuthority } from '@/api/table'
export default {
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        title: ''
      },
      tableData: [],
      options: [
        {
          value: 'admin',
          label: '管理员'
        }, {
          value: 'expert',
          label: '专家'
        }, {
          value: 'user',
          label: '林户'
        }
      ]
    }
  },
  mounted() {
    this.getlist() // 获取用户列表
  },
  methods: {
    getlist() { // 获取用户列表
      getUserList(this.listQuery).then(response => {
        this.tableData = response.data.list
        this.total = response.data.total
      })
    },
    handleChange(row) { // 修改用户权限
      // let roles = JSON.stringify(row.roles)
      postUserAuthority(row.id, row.roles).then(res => {
        this.$message({ message: res.message, type: 'success', center: true })
      })
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

<style lang="scss" scoped>
.app-container {
  /deep/ .nowrap .cell {
    white-space: nowrap;
  }
}
</style>


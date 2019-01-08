<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="姓名" style="width: 200px;" class="filter-item" size="mini" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFilter">{{ "搜索" }}</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="序号" type="index" width="60"/>
      <el-table-column label="姓名" prop="title" show-overflow-tooltip min-width="200"/>
      <el-table-column label="权限">
        <template slot-scope="scope">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total > 0" :page-size="10" :total="total" layout="total, prev, pager, next" background @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getMessageList } from '@/api/table'
export default {
  data() {
    return {
      total: 12,
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


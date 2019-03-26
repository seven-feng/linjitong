<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" size="mini" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="类别" clearable class="filter-item" size="mini" style="width: 130px">
        <el-option v-for="(item, index) in types" :key="index" :label="item" :value="item"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFilter">{{ "搜索" }}</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="80"/>
      <el-table-column label="姓名" prop="name" width="150"/>
      <el-table-column label="年龄" prop="age" width="120"/>
      <el-table-column label="电话" prop="phone" width="200"/>
      <el-table-column label="类别" prop="type" width="200"/>
      <el-table-column label="单位" prop="department"/>
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
import { getExpertList, delExpert } from '@/api/table'

export default {
  data() {
    return {
      types: ['综合', '林下经济', '竹笋', '花卉苗木', '木本粮油'],
      total: 10,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        type: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getlist() // 获取专家列表
  },
  methods: {
    getlist() { // 获取专家列表
      getExpertList(this.listQuery).then(response => {
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
    handleEdit(index, row) { // 编辑按钮
      this.$router.push({ name: 'expertDetail', params: { id: row.id }}) // 跳转详情页
    },
    handleDelete(index, row) { // 删除按钮
      delExpert(row.id).then(resopnse => {
        this.getlist() // 删除成功以后，重新加载列表
      })
      console.log(index, row)
    }
  }
}
</script>

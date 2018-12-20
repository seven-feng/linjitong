<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" size="mini" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="大类" clearable class="filter-item" size="mini" style="width: 130px">
        <el-option v-for="(item, index) in types" :key="index" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.subType" placeholder="子类" clearable class="filter-item" size="mini" style="width: 130px">
        <el-option v-for="(item, index) in subTypes" :key="index" :label="item" :value="item"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleFilter">{{ "搜索" }}</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="80"/>
      <el-table-column label="标题" prop="title" show-overflow-tooltip min-width="200"/>
      <el-table-column label="类别" prop="subType" width="120"/>
      <el-table-column label="文档类型" prop="docType" width="80"/>
      <el-table-column label="大小" prop="size" width="100"/>
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
import { getKnowledgeList, delKnowledgeList } from '@/api/table'

export default {
  data() {
    return {
      types: ['林技产业'],
      subTypes: ['竹笋', '山核桃', '香榧', '油茶', '花卉苗木', '其他木本粮油', '林下经济'],
      total: 10,
      listQuery: {
        page: 1,
        limit: 10,
        title: '',
        type: '',
        subType: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getlist() // 获取知识列表
  },
  methods: {
    getlist() { // 获取知识列表
      getKnowledgeList(this.listQuery).then(response => {
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
      if(this.$route.name === 'knowledgeList') {
        this.$router.push({ name: 'knowledgeDetail', params: { id: row.id }}) // 跳转消息详情页
      } else {
        this.$router.push({ name: 'appKnowledgeDetail', params: { id: row.id }}) // 跳转app消息详情页
      }
      console.log(index, row)
    },
    handleDelete(index, row) { // 删除按钮
      delKnowledgeList(row.id).then(resopnse => {
        this.getlist() // 删除成功以后，重新加载列表
      })
      console.log(index, row)
    }
  }
}
</script>

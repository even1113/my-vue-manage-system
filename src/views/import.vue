<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="query.name"
          placeholder="用户名"
          class="handle-input"
        ></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="用户ID" width="120"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>

        <el-table-column label="头像">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.head"
              :z-index="10"
              :preview-src-list="[scope.row.thumb]"
              preview-teleported
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              text
              :icon="Warning"
              class="green"
              @click="handleEdit(scope.$index, scope.row)"
              v-permiss="15"
            >
              解封
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <span class="pagin">共 {{ pagin }} 条</span>
        <el-pagination background layout="prev, pager, next" :total="1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive, toRaw } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit, Search, Plus, Warning } from '@element-plus/icons-vue'

import { upBlackUser, fetchBlackUser, searchBlack } from '../api/user'

interface TableItem {
  id: number
  username: string
  phone: string
  password: string
  head: string
  email: string
}

const query = reactive({
  address: '',
  name: '',
  pageIndex: 1,
  pageSize: 10,
})
const tableData = ref<TableItem[]>([])
const pageTotal = ref(0)

// 获取表格数据
const pagin = ref(0)
const getData = () => {
  fetchBlackUser().then((res) => {
    console.log('获取黑名单的res', res)
    tableData.value = res.data.data
    pagin.value = res.data.data.length
  })
}

getData()

// 查询操作
const handleSearch = () => {
  searchBlack(query.name).then((res) => {
    tableData.value = res.data.data
  })
}
// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val
  getData()
}

// 禁封！
const handleEdit = (index: number, row: any) => {
  upBlackUser(toRaw(row).id)
  ElMessage.success(`解封用户 ${toRaw(row).id} 成功`)
}
</script>

<style scoped>
.handle-box {
  display: flex;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  font-size: 14px;
}
.mr10 {
  margin-right: 10px;
}
.pagination {
  display: flex;
  align-items: center;
  & > span {
    margin-right: 20px;
  }
}
</style>

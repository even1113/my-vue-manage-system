<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="query.name"
          placeholder="番剧名称"
          class="handle-input mr10"
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
        <el-table-column prop="id" label="番剧ID" width="80"></el-table-column>
        <el-table-column prop="animeName" label="番剧名称"></el-table-column>
        <el-table-column prop="uploadDate" label="上传时间"></el-table-column>
        <el-table-column prop="cover" label="封面" width="120">
          <template v-slot:default="scope">
            <el-image :src="scope.row.cover" style="width: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="totalEpisodes" label="总集数"></el-table-column>
        <el-table-column prop="grade" label="评分"></el-table-column>
        <el-table-column prop="introduction" label="类型"></el-table-column>
        <el-table-column
          width="230"
          prop="describes"
          label="介绍"
          class="ellipsis-multi-line"
        ></el-table-column>

        <!-- 编辑 -->
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              text
              :icon="Warning"
              @click="handleupload(scope.$index, scope.row)"
              v-permiss="15"
            >
              上架
            </el-button>

            <el-button
              text
              :icon="Delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              v-permiss="16"
            >
              删除
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
import {
  fetchRemovedAnimes,
  uploadAnime,
  deleteAnime,
  selectDownAnime,
} from '../api/anime'

interface TableItem {
  id: number
  animeName: string
  uploadDate: string
  cover: string
  describes: string
  totalEpisodes: number
  grade: number
  introduction: string
  types: string
}

const query = reactive({
  address: '',
  name: '',
  pageIndex: 100,
  pageSize: 100,
})
const tableData = ref<TableItem[]>([])

const pagin = ref(0)
// 获取表格数据
const getData = () => {
  fetchRemovedAnimes().then((res) => {
    console.log('获取全部下架番剧的res', res)
    console.log(res.data.data)
    tableData.value = res.data.data
    pagin.value = res.data.data.length
  })
}

getData()

// 搜索番剧
const handleSearch = () => {
  console.log(query.name)
  selectDownAnime(query.name).then((res) => {
    tableData.value = res.data.data
  })
}
// 下架
const handleupload = (index: number, row: any) => {
  uploadAnime(toRaw(row).id).then((res) => {
    console.log('上架', res)
    if (res) {
      ElMessage.success(res.data.msg)
    }
  })
}
// 编辑
const handleDelete = (index: number, row: any) => {
  // console.log(toRaw(row).animeName)
  ElMessage.success(`删除番剧 《${toRaw(row).animeName} 》成功`)
}
</script>

<style scoped>
.ellipsis-multi-line {
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  max-height: 60px; /* 设置最大高度 */
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #f56c6c;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.pagination {
  display: flex;
  align-items: center;
  & > span {
    margin-right: 20px;
  }
}
</style>

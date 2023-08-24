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
      <!-- 表单 -->
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="番剧ID" width="80"></el-table-column>
        <el-table-column prop="animeName" label="番剧名称"></el-table-column>

        <el-table-column prop="types" label="类型"></el-table-column>

        <el-table-column
          prop="uploadDate"
          label="上传时间"
          width="120"
        ></el-table-column>
        <el-table-column prop="cover" label="封面">
          <template v-slot:default="scope">
            <el-image :src="scope.row.cover" style="width: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="totalEpisodes" label="总集数"></el-table-column>
        <el-table-column prop="grade" label="评分"></el-table-column>

        <el-table-column
          width="230"
          prop="describes"
          label="介绍"
        ></el-table-column>

        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              text
              :icon="Warning"
              class="red"
              @click="handleXiajia(scope.$index, scope.row)"
              v-permiss="15"
            >
              下架
            </el-button>
            <el-button
              text
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
              v-permiss="15"
            >
              编辑基础信息
            </el-button>
            <el-button
              text
              :icon="Edit"
              @click="handleType(scope.$index, scope.row)"
              v-permiss="15"
            >
              为该番剧选择类型
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <span class="pagin">共 {{ pagin }} 条</span>
        <el-pagination background layout="prev, pager, next" :total="1" />
      </div>
    </div>

    <!-- 基本信息弹出框 -->
    <el-dialog title="编辑当前番剧信息" v-model="editVisible" width="60%">
      <el-form label-width="70px" :model="form">
        <el-form-item label="番剧名称">
          <el-input v-model="form.animeName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.describes"></el-input>
        </el-form-item>
        <el-form-item label="评分">
          <el-input v-model="form.grade"></el-input>
        </el-form-item>
        <el-form-item label="总集数">
          <el-input v-model="form.totalEpisodes"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.introduction"></el-input>
        </el-form-item>

        <el-form-item label="修改封面">
          <el-upload
            :http-request="httpRequest"
            multiple
            :show-file-list="true"
            list-type="picture-card"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 类型弹出框 -->
    <el-dialog title="编辑当前番剧信息" v-model="typeVisible" width="60%">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="热血" />
        <el-checkbox label="青春" />
        <el-checkbox label="搞笑" />
        <el-checkbox label="奇幻" />
        <el-checkbox label="悬疑" />
        <el-checkbox label="治愈" />
      </el-checkbox-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="typeVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveType">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive, toRaw } from 'vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Edit, Search, Plus, Warning } from '@element-plus/icons-vue'
import {
  fetchPagingAnime,
  downAnime,
  searchUploadAnime,
  typeAnime,
  uploadAnimeInfo,
  searchAnimeById,
  uploadCover,
  specifiedType,
} from '../api/anime'

// 获取在线番剧列表
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
const getData = () => {
  fetchPagingAnime().then((res) => {
    let copyRes = res.data.data
    for (let i = 0; i < copyRes.length; i++) {
      // 处理类型
      typeAnime(copyRes[i].id).then((res) => {
        let tmp = ''
        if (res.data.data) {
          let tmpArr = []
          for (let i = 0; i < res.data.data.length; i++) {
            tmpArr.push(res.data.data[i].type)
            tmp = tmpArr.join(' ')
          }
        } else {
          tmp = '该番剧暂未匹配类型'
        }
        copyRes[i].types = tmp
      })
      // 处理更新时间
      copyRes[i].uploadDate = copyRes[i].uploadDate.split('T').join(' ')
    }

    // console.log('copyRes:', copyRes)
    tableData.value = copyRes
    // console.log('table:', tableData.value)
    pagin.value = res.data.data.length
  })
}
getData()

// 搜索番剧
const handleSearch = () => {
  searchUploadAnime(query.name).then((res) => {
    tableData.value = res.data.data
  })
}

// 下架番剧
const handleXiajia = (index: number, row: any) => {
  downAnime(toRaw(row).id).then((res) => {
    console.log('下架', res)
    if (res) {
      ElMessage.success(res.data.msg)
    }
  })
}

// 编辑番剧基本信息
const editVisible = ref(false)
let form = reactive({
  id: 0,
  animeName: '',
  uploadDate: '',
  cover: '',
  describes: '',
  totalEpisodes: 0,
  grade: 0,
  introduction: '',
})
const handleEdit = (index: number, row: any) => {
  form.id = row.id
  form.animeName = row.animeName
  form.uploadDate = row.uploadDate
  form.describes = row.describes
  form.grade = row.grade
  form.totalEpisodes = row.totalEpisodes
  form.introduction = row.introduction
  form.cover = row.cover

  editVisible.value = true
}
const saveEdit = async () => {
  const animeRes: any = await searchAnimeById(form.id)
  for (const i in form) {
    animeRes.data.data[i] = (form as any)[i]
  }
  let tmp = reactive({
    id: 0,
    animeName: '',
    uploadDate: '',
    cover: '',
    author: '',
    slideshow: '',
    describes: '',
    totalEpisodes: 0,
    grade: 0,
    introduction: '',
  })
  tmp.id = animeRes.data.data.id
  tmp.animeName = animeRes.data.data.animeName
  tmp.cover = form.cover
  tmp.describes = animeRes.data.data.describes
  tmp.author = animeRes.data.data.author
  tmp.grade = animeRes.data.data.grade
  tmp.totalEpisodes = animeRes.data.data.totalEpisodes
  tmp.introduction = animeRes.data.data.introduction
  tmp.slideshow = animeRes.data.data.slideshow
  console.log('提交表单的值', tmp)
  uploadAnimeInfo(tmp).then((res) => {
    console.log('修改番剧信息的返回值', res)
    if (res) {
      ElMessage.success(`修改番剧《${form.animeName}》成功`)
    }
  })
  editVisible.value = false
}

// 编辑番剧类型
let idx = 0
const typeVisible = ref(false)
const checkList = ref([])
const handleType = (index: number, row: any) => {
  typeVisible.value = true
  idx = row.id
}
const types = {
  1: '热血',
  2: '青春',
  3: '搞笑',
  4: '奇幻',
  5: '悬疑',
  6: '治愈',
}
const saveType = () => {
  let arr: Array<number> = []
  checkList.value.forEach((item) => {
    let result: any = Object.entries(types).find(([key, val]) => val === item)
    result = result[0]
    arr.push(Number(result))
  })
  console.log(arr)

  specifiedType({ id: [idx], typeIdList: arr }).then((res) => {
    console.log(res)
    if (res.data.code == 200) {
      ElMessage.success(res.data.msg)
    } else {
      ElMessage.error('修改番剧类型失败')
    }
  })
  typeVisible.value = false
}

// ===========  上传图片  ================
const imageUrl = ref('')
function httpRequest(option: any) {
  let dataForm = new FormData()
  dataForm.append('filePath', form.animeName)
  dataForm.append('file', option.file)
  uploadCover(dataForm).then((res) => {
    console.log('上传照片的返回值', res)
    if (res.data.code == 200) {
      ElMessage({
        message: '上传封面成功',
        type: 'success',
        duration: 1000,
      })
      form.cover = res.data.data
    } else {
      ElMessage.error('上传封面失败，请重新上传')
    }
  })
}
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const type = ['image/jpeg', 'image/jpg', 'image/png']
  if (type.indexOf(file.type) === -1) {
    ElMessage.error('上传的文件必须是JPG、JPEG、PNG三种之一!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
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

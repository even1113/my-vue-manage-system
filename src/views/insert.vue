<template>
  <div class="insert">
    <el-form label-width="150px" :model="form">
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
      <el-form-item label="作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="集数">
        <el-input v-model="form.totalEpisodes"></el-input>
      </el-form-item>

      <el-form-item label="新增封面">
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
      <el-form-item label="当前番剧的轮播图">
        <el-upload
          :http-request="httpRequest1"
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

    <div class="footer">
      <el-button type="primary" @click="saveEdit">新增番剧</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive, toRaw } from 'vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { insertAnime, uploadCover } from '../api/anime'

let form = reactive({
  animeName: 'zyw自己的番剧',
  cover: '',
  author: 'zyf',
  uploadDate: '',
  describes:
    '“潮死了。”网代慎平收到发小——小舟潮的讣告后，回到了阔别两年的故乡——和歌山市日都岛。慎平与亲人朋友重聚，葬礼也顺利地进行着。然而，好友告诉他“潮的死有疑点，可能是他杀”。第二天，邻近的一家人突然全部失踪。与此同时，慎平听说了一个不祥的传闻。“看到与自己一模一样的‘影子’就会被杀。会被影子杀死！”而且，潮的妹妹——澪说“姐姐在去世的三天前看到了影子”？！纪淡海峡的夏日小岛上，跨越时间的科幻悬疑剧即将开幕！',
  totalEpisodes: 3,
  grade: 9.8,
  introduction: '一定要找到我哦',
  turnoverTime: '周四 21:30',
  slideshow: '',
})

const saveEdit = async () => {
  insertAnime(toRaw(form)).then((res) => {
    console.log(res)
    if (res.data.code == 500) {
      ElMessage.error(res.data.msg)
    }
    if (res.data.code == 200) {
      ElMessage.success(res.data.msg)
    }
  })
}

// 上传封面
const imageUrl = ref('')
function httpRequest(option: any) {
  let dataForm = new FormData()
  dataForm.append('filePath', form.animeName)
  dataForm.append('file', option.file)
  uploadCover(dataForm).then((res: any) => {
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
function httpRequest1(option: any) {
  let dataForm = new FormData()
  dataForm.append('filePath', form.animeName)
  dataForm.append('file', option.file)
  uploadCover(dataForm).then((res: any) => {
    console.log('上传照片的返回值', res)
    if (res.data.code == 200) {
      ElMessage({
        message: '上传轮播图成功',
        type: 'success',
        duration: 1000,
      })
      form.cover = res.data.data
    } else {
      ElMessage.error('上传轮播图失败，请重新上传')
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
.footer {
  padding: 20px;
  margin-left: 10px;
}
</style>

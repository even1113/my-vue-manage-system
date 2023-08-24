<template>
  <div>
    <el-card shadow="hover">
      <schart
        ref="bar"
        class="schart"
        canvasId="bar"
        :options="options"
      ></schart>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart'
import { useAnimeStore } from '../store/anime'
import { reactive, ref, toRaw } from 'vue'
import imgurl from '../assets/img/img.jpg'

const name = localStorage.getItem('ms_username')
const role: string = name === 'admin' ? '超级管理员' : '普通用户'
const animeStore = useAnimeStore()

animeStore.getAnimeTypes()

const labels = ['热血', '搞笑', '奇幻', '悬疑', '治愈']
const data = [46, 59, 2, 19, 19, 46]
const options = {
  type: 'bar',
  title: {
    text: '番剧类型播放量',
  },
  xRorate: 25,
  labels: labels,
  datasets: [{ data: data }],
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>

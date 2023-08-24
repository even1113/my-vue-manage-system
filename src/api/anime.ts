import request from '../utils/request'

// 根据番剧id获取番剧类型
export const typeAnime = (params: number) => {
  return request({
    url: `/typeAnime/getType?id=${params}`,
    method: 'get',
  })
}

// 按 番剧类型获取番剧
export const fetchAnimeType = () => {
  return request({
    url: '/type/selectAll',
    method: 'get',
  })
}

// 获取上架的番剧列表
export const fetchPagingAnime = () => {
  return request({
    url: '/anime/pagingAnime?currentPage=1&pageSize=100',
    method: 'get',
  })
}

// 下架番剧
export const downAnime = (params: number) => {
  return request({
    url: `/anime/downAnime?id=${params}`,
    method: 'get',
  })
}

// 获取全部下架番剧
export const fetchRemovedAnimes = () => {
  return request({
    url: '/anime/removedAnimePaging?currentPage=1&pageSize=100',
    method: 'get',
  })
}

// 上架番剧 动词!
export const uploadAnime = (params: number) => {
  return request({
    url: `/anime/upAnime?id=${params}`,
    method: 'get',
  })
}

// 删除番剧
export const deleteAnime = (params: number) => {
  return request({
    url: `/anime/deleteAnime?id=${params}`,
    method: 'get',
  })
}

// 新增并上架番剧
export const insertAnime = (params: any) => {
  return request({
    url: '/anime/insertAnime',
    method: 'post',
    data: params,
  })
}

// 搜索上架番剧
export const searchUploadAnime = (params: string) => {
  return request({
    url: `/anime/selectByName?name=${params}`,
    method: 'get',
  })
}

// 搜索下架番剧
export const selectDownAnime = (params: string) => {
  return request({
    url: `/anime/selectDownAnime?name=${params}`,
    method: 'get',
  })
}

// 根据id搜索番剧
export const searchAnimeById = (params: number) => {
  return request({
    url: `/anime/selectById?id=${params}`,
    method: 'get',
  })
}

// 修改番剧信息
export const uploadAnimeInfo = (params: any) => {
  return request({
    url: '/anime/updateAnime',
    method: 'post',
    data: params,
  })
}

// 上传封面
export const uploadCover = (params: any) => {
  return request({
    url: '/hdfs/cover',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 管理类型
export const specifiedType = (params: any) => {
  return request({
    url: '/typeAnime/specifiedType',
    method: 'post',
    data: params,
  })
}

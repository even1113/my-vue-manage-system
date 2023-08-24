import request from '../utils/request'

// 获取白名单用户信息
export const fetchWhiteUser = () => {
  return request({
    url: '/user/pagingUser?currentPage=1&pageSize=3',
    method: 'get',
  })
}

// 🈲封用户
export const sealWhiteUser = (params: number) => {
  return request({
    url: `/user/sealUser?id=${params}`,
    method: 'get',
  })
}

// 获取黑名单用户
export const fetchBlackUser = () => {
  return request({
    url: '/user/pagingSealedUser?currentPage=1&pageSize=100',
    method: 'get',
  })
}

// 被封用户解封
export const upBlackUser = (params: number) => {
  return request({
    url: `/user/upUser?id=${params}`,
    method: 'get',
  })
}

// 白名单查询
export const searchWhite = (params: string) => {
  return request({
    url: `/user/selectUpUser?username=${params}`,
    method: 'get',
  })
}

// 黑名单查询
export const searchBlack = (params: string) => {
  return request({
    url: `/user/selectDownUser?username=${params}`,
    method: 'get',
  })
}

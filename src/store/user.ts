import { defineStore } from 'pinia'
import { fetchWhiteUser } from '../api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      whiteUser: [],
      blackUser: [],
    }
  },
  getters: {},
  actions: {
    // 获取白名单用户
    async getWhiteUser() {
      const res: any = await fetchWhiteUser()
      if (res) {
        console.log(res)
        this.whiteUser = res.data
      }
    },
  },
})

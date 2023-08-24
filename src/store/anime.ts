import { defineStore } from 'pinia'
import { fetchAnimeType } from '../api/anime'

export const useAnimeStore = defineStore('anime', {
  state: () => {
    return {
      animeTypes: [],
      animeVolume: [],
    }
  },
  getters: {},
  actions: {
    // 获取首页 番剧类型播放量
    async getAnimeTypes() {
      const res: any = await fetchAnimeType()
      console.log('res', res)
      if (res) {
        for (let i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i])
          ;(this.animeTypes[i] as any) = res.data.data[i].type
          ;(this.animeVolume[i] as any) = res.data.data[i].totalBroadcastVolume
        }
      }
      console.log('animeTypes', this.animeTypes)
      console.log('animeVolume', this.animeVolume)
    },
  },
})

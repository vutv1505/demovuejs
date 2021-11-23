import _ from 'lodash'
import WebApiUtil from '@/lib/webApiUtil'
import apiUrl from '@/lib/apiUrl'

export default {
  methods: {
    fnSearchSyohin: async searchText => {
      if (!searchText || !searchText.trim()) {
        return []
      }
      const url = apiUrl.API0304
      return Promise.all([
        WebApiUtil.getAsync(url, {
          params: { syohincd: searchText }
        }),
        WebApiUtil.getAsync(url, {
          params: { syohinme: searchText }
        })
      ]).then(res => {
        const suggestData1 = res[0].data.result.syohinList || []
        const suggestData2 = res[1].data.result.syohinList || []
        const suggestData = _.union(suggestData1, suggestData2).map(data => {
          if (!data.syohinme) {
            data.syohinme = data.syohingrpme
          } else {
            data.syohinme = `${data.syohingrpme} ${data.syohinme}`
          }
          return data
        })
        return suggestData
      })
    }
  }
}

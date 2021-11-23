import localforage from 'localforage'
import WebApiUtil from '@/lib/webApiUtil'

export default {
  methods: {
    suggestFilter(query, list) {
      if (query.trim().length === 0) {
        return list
      }
      return list.filter(itemQuery => {
        return itemQuery.toLowerCase().includes(query.toLowerCase())
      })
    },
    getSuggestList(item) {
      return new Promise((resolve, reject) => {
        localforage
          .getItem(item)
          .then(list => resolve(list))
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchSuggestList(url, item, key, fn) {
      return new Promise((resolve, reject) => {
        WebApiUtil.getAsync(url, {})
          .then(res => {
            localforage.setItem(
              item,
              typeof fn === 'function'
                ? fn(res.data.result[key])
                : res.data.result[key],
              err => {
                if (err) {
                  reject(err)
                } else {
                  resolve()
                }
              }
            )
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

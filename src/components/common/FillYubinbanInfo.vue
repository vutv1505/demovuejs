<script>
import FillFieldInput from './FillFieldInput'
import setting from '@/lib/handsontable/setting'
import WebApiUtil from '@/lib/webApiUtil'
import apiUrl from '@/lib/apiUrl'

export default {
  name: 'FillYubinbanInfo',
  components: { FillFieldInput },
  mixins: [FillFieldInput],
  data() {
    return {
      hotSettings: setting({
        mapColumns: {
          yubinban: { colHeader: '郵便番号' },
          zyuusyo_ken: { colHeader: '都道府県' },
          zyuusyo2: { colHeader: '郡市区町村' },
          zyuusyo3: { colHeader: '町番地' }
        }
      }),
      root: 'FillYubinbanInfo'
    }
  },
  methods: {
    async fnSearchData(strPostcode) {
      const inputPostCode = strPostcode.replace('-', '')
      if (inputPostCode.length !== 7) {
        return null
      }
      const yubinban = await this.fetchYubinbanInfo(inputPostCode)
      return yubinban
    },
    fetchYubinbanInfo(inputPostCode) {
      const url = apiUrl.API0284
      return new Promise((resolve, reject) => {
        try {
          WebApiUtil.getAsync(url, {
            params: { yubinban: inputPostCode }
          }).then(res => {
            const data = res.data.result.yubinsuggest.filter(
              y => y.yubinban.replace('-', '') === inputPostCode
            )
            resolve(data)
          })
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
</script>

<style scoped></style>

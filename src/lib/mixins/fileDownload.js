export default {
  methods: {
    /**
     * オブジェクト配列をCSV配列に変換
     *
     * @param {Object} json
     */
    json2csv(json) {
      return json
        .map(d => {
          return Object.keys(d)
            .map(key => {
              return '"' + d[key] + '"'
            })
            .join(',')
        })
        .join('\n')
    },
    /**
     * 受け取ったコンテンツを指定ファイル名でテキストファイルとしてダウンロード
     *
     * @param {Object} content
     * @param {String} fileName
     */
    fileDownload(content, fileName) {
      // MIMEタイプはプレーンテキストを指定
      const mimeType = 'text/plain'
      // BOMは文字化け対策
      const bom = new Uint8Array([0xef, 0xbb, 0xbf])
      const blob = new Blob([bom, content], { type: mimeType })

      const a = document.createElement('a')
      a.download = fileName
      a.target = '_blank'

      if (window.navigator.msSaveBlob) {
        // for IE
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else if (window.webkitURL && window.webkitURL.createObject) {
        // for Chrome
        a.href = window.webkitURL.createObjectURL(blob)
        a.click()
      } else if (window.URL && window.URL.createObjectURL) {
        // for Firefox
        a.href = window.URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else {
        // for Safari
        window.open(
          `data:${mimeType};base64,${window.Base64.encode(content)}`,
          '_blank'
        )
      }
    },
    /**
     * Blobをcontent-dispositionのファイル名でダウンロード
     * request 時に { responseType: 'blob' } を指定する必要があります。
     *
     * @param { res } api response
     */
    blobFileDownload(res) {
      const blob = res.data
      let fileName = 'file'
      const disposition = res.headers['content-disposition']
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename\*=UTF-8''((['"]).*?\2|[^;\n]*)/
        const matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
          fileName = decodeURI(matches[1].replace(/['"]/g, ''))
        }
      }
      const a = document.createElement('a')
      a.download = fileName
      a.target = '_blank'

      if (window.navigator.msSaveBlob) {
        // for IE
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else if (window.webkitURL && window.webkitURL.createObject) {
        // for Chrome
        a.href = window.webkitURL.createObjectURL(blob)
        a.click()
      } else if (window.URL && window.URL.createObjectURL) {
        // for Firefox
        a.href = window.URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else {
        // TODO for Safari
      }
    },
    /**
     * Handsontableを指定ファイル名でCSVファイルとしてダウンロード
     */
    downLoadCsv(instance, filename) {
      instance.getPlugin('exportFile').downloadFile('csv', {
        columnDelimiter: ',',
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: filename + '_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: false,
        range: [0, 1] // 先頭のチェックボックスを含めない
      })
    }
  }
}

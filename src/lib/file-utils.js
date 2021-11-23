export const CSV = 'csv'
export const TSV = 'tsv'

export default {
  downloadFile(fileName, content) {
    let extension = ''
    let options = { type: 'text/plain;charset=utf8;' }
    if (fileName && fileName.indexOf('.') > -1) {
      extension = fileName.substr(fileName.lastIndexOf('.') + 1) // csv, tsv, txt
      const fileType = extension === TSV ? 'tab-separated-values' : extension
      options = { type: 'text/' + fileType + ';charset=utf8;' }
    }
    let blob = new Blob([content], options)

    if (navigator.msSaveBlob) {
      fileName = fileName.replace(/ /g, '_')
      navigator.msSaveBlob(blob, fileName)
    } else {
      let uri = `data:attachment/${extension};charset=utf-8,${encodeURI(
        content
      )}`
      let link = document.createElement('a')
      link.href = URL.createObjectURL(blob)

      link.setAttribute('visibility', 'hidden')
      link.download = fileName.replace(/ /g, '_')

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}

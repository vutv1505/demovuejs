export default (_this, data, coords) => {
  const startRow = coords[0].startRow
  const startCol = coords[0].startCol
  const endCol = coords[0].endCol
  const addHeader =
    _this.getSettings().columns.length -
      _this.getSettings().hiddenColumns.columns.length ===
      data[0].length || data.length === _this.countRows()
  const header = []
  let targetCol
  for (let col = startCol; col <= endCol; col++) {
    if (_this.colToProp(col) === 'target') {
      targetCol = col
    } else {
      addHeader && header.push(_this.getColHeader(col))
      const cellMeta = _this.getCellMeta(startRow, col)
      if (cellMeta.type === 'key-value') {
        let source = cellMeta.source
        if (source) {
          if (!Array.isArray(source)) {
            cellMeta.source(null, _source => (source = _source))
          }
          data.forEach(row => {
            const cellItem = source.find(
              item => item[cellMeta.keyProperty] == row[col - startCol]
            )
            row[col - startCol] = cellItem
              ? cellItem[cellMeta.valueProperty]
              : null
          })
        }
      }
    }
  }
  if (targetCol != null) {
    data.forEach(row => row.splice(targetCol - startCol, 1))
  }
  addHeader && data.unshift(header)
}

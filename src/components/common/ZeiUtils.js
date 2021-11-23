export function getKingakuInfo(suuryou, tanka, zeiritsu, sotouchizeikbn) {
  const kingakuInfo = {
    kingakukomi: null,
    kingakho: null,
    syohizei: null,
    kingakny: null
  }
  if (
    typeof suuryou !== 'undefined' &&
    suuryou !== null &&
    typeof tanka !== 'undefined' &&
    tanka !== null &&
    typeof zeiritsu !== 'undefined' &&
    zeiritsu !== null &&
    typeof sotouchizeikbn !== 'undefined' &&
    sotouchizeikbn !== null
  ) {
    let kingakny = Math.floor(tanka * suuryou)
    kingakuInfo.kingakny = kingakny
    if (sotouchizeikbn === 1) {
      //1:外税 Outside tax
      kingakuInfo.syohizei = Math.floor(kingakny * zeiritsu) //消費税 consumption tax
      kingakuInfo.kingakukomi = kingakny + kingakuInfo.syohizei //金額(税込)Amount (tax included)
      kingakuInfo.kingakho = kingakny //金額(税抜)Amount (tax excluded)
    } else if (sotouchizeikbn === 2) {
      //2:内税 Tax
      kingakuInfo.syohizei = Math.floor(kingakny - kingakny / (1 + zeiritsu)) //消費税 consumption tax
      kingakuInfo.kingakukomi = kingakny //金額(税込)Amount (tax included)
      kingakuInfo.kingakho = Math.floor(kingakny - kingakuInfo.syohizei) //金額(税抜)Amount (tax excluded)
    }
  }

  return kingakuInfo
}

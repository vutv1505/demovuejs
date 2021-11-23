const gamenList = [
  {
    value: 'CUN0004',
    text: 'ユーザー',
    has_personal_info: false
  },
  {
    value: 'CUN0005',
    text: 'グループ',
    has_personal_info: false
  },
  {
    value: 'CUN0006',
    text: 'ロール',
    has_personal_info: false
  },
  {
    value: 'CUN0008',
    text: 'メールテンプレート',
    has_personal_info: false
  },
  {
    value: 'CUN0011',
    text: 'ジョブリクエスト',
    has_personal_info: false
  },
  {
    value: 'CUN0013',
    text: '商品',
    has_personal_info: false
  },
  {
    value: 'CUN0018',
    text: 'メーカー',
    has_personal_info: false
  },
  {
    value: 'CUN0020',
    text: 'オプション',
    has_personal_info: false
  },
  {
    value: 'CUN0021',
    text: 'タイムセール',
    has_personal_info: false
  },
  {
    value: 'CUN0022',
    text: 'クーポン利用履歴',
    has_personal_info: true
  },
  {
    value: 'CUN0023',
    text: '基本projectxポイント率',
    has_personal_info: false
  },
  {
    value: 'CUN0024',
    text: '商品固定projectxポイント',
    has_personal_info: false
  },
  {
    value: 'CUN0025',
    text: 'カテゴリ固定projectxポイント',
    has_personal_info: false
  },
  {
    value: 'CUN0026',
    text: '在庫価格設定',
    has_personal_info: false
  },
  {
    value: 'CUN0027',
    text: '発注伝票',
    has_personal_info: false
  },
  {
    value: 'CUN0028',
    text: '仕入値引',
    has_personal_info: false
  },
  {
    value: 'CUN0030',
    text: '仕切価格',
    has_personal_info: false
  },
  {
    value: 'CUN0031',
    text: '仕入先',
    has_personal_info: false
  },
  {
    value: 'CUN0032',
    text: '支払伝票',
    has_personal_info: false
  },
  {
    value: 'CUN0035',
    text: '受注伝票',
    has_personal_info: true
  },
  {
    value: 'CUN0038',
    text: '入金伝票',
    has_personal_info: false
  },
  {
    value: 'CUN0040',
    text: '売上伝票',
    has_personal_info: false
  },
  {
    value: 'CUN0042',
    text: 'projectx',
    has_personal_info: true
  },
  {
    value: 'CUN0043',
    text: '卸先',
    has_personal_info: false
  },
  {
    value: 'CUN0044',
    text: '受注ステータス',
    has_personal_info: false
  },
  {
    value: 'CUN0045',
    text: '受発注',
    has_personal_info: true
  },
  {
    value: 'CUN0046',
    text: '受注伝票ステータス',
    has_personal_info: true
  },
  {
    value: 'CUN0047',
    text: '受注明細ステータス',
    has_personal_info: false
  },
  {
    value: 'CUN0048',
    text: '納入先',
    has_personal_info: false
  },
  {
    value: 'CUN0049',
    text: '返品伝票',
    has_personal_info: false
  },
  {
    value: 'CUN0051',
    text: '受発注メンテナンス',
    has_personal_info: false
  },
  {
    value: 'CUN0052',
    text: '事前見積',
    has_personal_info: true
  },
  {
    value: 'CUN0053',
    text: '請求書',
    has_personal_info: false
  },
  {
    value: 'CUN0055',
    text: '設置工事キャパ',
    has_personal_info: false
  },
  {
    value: 'CUN0056',
    text: '大型配送キャパ',
    has_personal_info: false
  },
  {
    value: 'CUN0057',
    text: 'ブラック判定',
    has_personal_info: false
  },
  {
    value: 'CUN0060',
    text: 'クーポン',
    has_personal_info: false
  },
  {
    value: 'CUN0061',
    text: '売り切れ商品',
    has_personal_info: false
  },
  {
    value: 'CUN0062',
    text: '直送対象発注明細',
    has_personal_info: true
  },
  {
    value: 'CUN0063',
    text: '仕入伝票',
    has_personal_info: false
  },
  {
    value: 'CUN0064',
    text: '基本送料',
    has_personal_info: false
  },
  {
    value: 'CUN0081',
    text: '在庫引当メンテナンス',
    has_personal_info: false
  },
  {
    value: 'CUN0087',
    text: '大型追加送料',
    has_personal_info: false
  },
  {
    value: 'CUN0088',
    text: '非大型追加送料',
    has_personal_info: false
  },
  {
    value: 'CUN0135',
    text: 'サービス提供完了受注明細',
    has_personal_info: false
  },
  {
    value: 'CUN1001',
    text: '入荷伝票',
    has_personal_info: false
  },
  {
    value: 'CUN1005',
    text: '出荷伝票',
    has_personal_info: true
  },
  {
    value: 'CUN1009',
    text: 'projectxポイント集計',
    has_personal_info: false
  },
  {
    value: 'CUN1011',
    text: '営業実績集計',
    has_personal_info: false
  },
  {
    value: 'CUN1012',
    text: '支払方法別販売集計',
    has_personal_info: false
  },
  {
    value: 'CUN1013',
    text: '日別販売集計',
    has_personal_info: false
  },
  {
    value: 'CUN1014',
    text: 'projectx登録数集計',
    has_personal_info: false
  },
  {
    value: 'CUN1015',
    text: '在庫高集計',
    has_personal_info: false
  },
  {
    value: 'CUN1017',
    text: '発注実績集計',
    has_personal_info: false
  },
  {
    value: 'CUN1019',
    text: '棚卸管理',
    has_personal_info: false
  },
  {
    value: 'CUN1021',
    text: 'メール送信',
    has_personal_info: false
  },
  {
    value: 'CUN1022',
    text: '郵便番号',
    has_personal_info: false
  },
  {
    value: 'CUN1023',
    text: 'Amazonカテゴリ商品',
    has_personal_info: false
  }
]

export function getGamencd(screenName) {
  const objGamen = gamenList.find(item => item.text === screenName) || {}
  return Object.keys(objGamen).length ? objGamen.value : ''
}

export function hasPersonalInfo(screenName) {
  const objGamen = gamenList.find(item => item.text === screenName) || {}
  return objGamen ? objGamen.has_personal_info : true
}

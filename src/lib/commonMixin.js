import { numberFormat, hotCalendarFormatJP } from './format'

const zenKata = [
  'ア',
  'イ',
  'ウ',
  'エ',
  'オ',
  'カ',
  'キ',
  'ク',
  'ケ',
  'コ',
  'サ',
  'シ',
  'ス',
  'セ',
  'ソ',
  'タ',
  'チ',
  'ツ',
  'テ',
  'ト',
  'ナ',
  'ニ',
  'ヌ',
  'ネ',
  'ノ',
  'ハ',
  'ヒ',
  'フ',
  'ヘ',
  'ホ',
  'マ',
  'ミ',
  'ム',
  'メ',
  'モ',
  'ヤ',
  'ヰ',
  'ユ',
  'ヱ',
  'ヨ',
  'ラ',
  'リ',
  'ル',
  'レ',
  'ロ',
  'ワ',
  'ヲ',
  'ン',
  'ガ',
  'ギ',
  'グ',
  'ゲ',
  'ゴ',
  'ザ',
  'ジ',
  'ズ',
  'ゼ',
  'ゾ',
  'ダ',
  'ヂ',
  'ヅ',
  'デ',
  'ド',
  'バ',
  'ビ',
  'ブ',
  'ベ',
  'ボ',
  'パ',
  'ピ',
  'プ',
  'ペ',
  'ポ',
  'ァ',
  'ィ',
  'ゥ',
  'ェ',
  'ォ',
  'ャ',
  'ュ',
  'ョ',
  'ッ',
  '゛',
  '°',
  'ー'
]

const hanKata = [
  'ｱ',
  'ｲ',
  'ｳ',
  'ｴ',
  'ｵ',
  'ｶ',
  'ｷ',
  'ｸ',
  'ｹ',
  'ｺ',
  'ｻ',
  'ｼ',
  'ｽ',
  'ｾ',
  'ｿ',
  'ﾀ',
  'ﾁ',
  'ﾂ',
  'ﾃ',
  'ﾄ',
  'ﾅ',
  'ﾆ',
  'ﾇ',
  'ﾈ',
  'ﾉ',
  'ﾊ',
  'ﾋ',
  'ﾌ',
  'ﾍ',
  'ﾎ',
  'ﾏ',
  'ﾐ',
  'ﾑ',
  'ﾒ',
  'ﾓ',
  'ﾔ',
  'ｲ',
  'ﾕ',
  'ｴ',
  'ﾖ',
  'ﾗ',
  'ﾘ',
  'ﾙ',
  'ﾚ',
  'ﾛ',
  'ﾜ',
  'ｦ',
  'ﾝ',
  'ｶﾞ',
  'ｷﾞ',
  'ｸﾞ',
  'ｹﾞ',
  'ｺﾞ',
  'ｻﾞ',
  'ｼﾞ',
  'ｽﾞ',
  'ｾﾞ',
  'ｿﾞ',
  'ﾀﾞ',
  'ﾁﾞ',
  'ﾂﾞ',
  'ﾃﾞ',
  'ﾄﾞ',
  'ﾊﾞ',
  'ﾋﾞ',
  'ﾌﾞ',
  'ﾍﾞ',
  'ﾎﾞ',
  'ﾊﾟ',
  'ﾋﾟ',
  'ﾌﾟ',
  'ﾍﾟ',
  'ﾎﾟ',
  'ｱ',
  'ｲ',
  'ｳ',
  'ｴ',
  'ｵ',
  'ﾔ',
  'ﾕ',
  'ﾖ',
  'ﾂ',
  'ﾞ',
  'ﾟ',
  'ｰ'
]
/**
 * 各コンポーネントの共通クラス
 */
export default {
  mounted() {
    document.querySelectorAll('form').forEach(eForm => {
      eForm.addEventListener('keydown', function(e) {
        const targetElementName = e.target.nodeName.toLowerCase()
        targetElementName !== 'textarea' &&
          e.key === 'Enter' &&
          e.preventDefault()
      })
    })
  },
  methods: {
    /**
     * 定義ファイル取得
     */
    getConstants() {
      console.warn('*** deprecated *** getConstants()')
      return this.$store.getters['common/constants']
    },
    /**
     * カタカナをひらがなに変換
     *
     * @param {String} katakana
     */
    kanaToHira(katakana) {
      return katakana.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60
        return String.fromCharCode(chr)
      })
    },
    /**
     * ひらがなをカタカナに変換
     *
     * @param {String} hiragana
     */
    hiraToKana(hiragana) {
      return hiragana.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60
        return String.fromCharCode(chr)
      })
    },
    /**
     * 全角カタカナを半角カタカナに変換
     *
     * @param {String} zenkaku
     */
    zenkanaToHanKana(zenkaku) {
      let hankakuText = ''
      for (let i = 0; i < zenkaku.length; i++) {
        let hanLetter
        let zenLetter = zenkaku.charAt(i)
        let idx = zenKata.indexOf(zenLetter)
        if (idx >= 0) {
          hanLetter = hanKata[idx]
        }
        hankakuText += hanLetter
      }
      return hankakuText
    },
    /**
     * 前方一致検索
     *
     * @param {String} target
     * @param {String} key
     */
    forwardMatchSearch(target, key) {
      const prefix = '@@@@@@@@'
      let str = prefix + target
      return str.indexOf(prefix + key) !== -1
    },
    /**
     * 文字列の「'true'」や「'false'」をBooleanに変換する
     *
     * @param {*} data
     * @returns
     */
    toBoolean(data) {
      return data.toLowerCase() === 'true'
    },
    numberFormat(value) {
      return numberFormat(value)
    },
    decimalFormat(value) {
      return numberFormat(value, {
        thousandSeparated: true,
        trimMantissa: true,
        mantissa: 2
      })
    },
    isInValid(fieldName) {
      return this.errors.has(fieldName)
    },
    firstError(fieldName) {
      return this.errors.first(fieldName)
    },
    hotCalendarFormatJP() {
      return hotCalendarFormatJP()
    },
    stringToNumber(str) {
      return Number(numberFormat(str, {}))
    }
  }
}

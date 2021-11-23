import idbItem from './idbItem'

export default {
  data() {
    return {
      categorySuggestList: []
    }
  },
  async created() {
    this.categorySuggestList = await this.getSuggestList(idbItem.SYOBUN)
  },
  computed: {
    daibunList() {
      return this.categorySuggestList.filter(
        rec => rec.daibuncd > 0 && rec.cyubuncd === 0
      )
    },
    cyubunList() {
      return (
        this.categorySuggestList.filter(
          rec =>
            rec.daibuncd === this.form.daibuncd &&
            rec.cyubuncd > 0 &&
            rec.syobuncd === 0
        ) || []
      )
    },
    syobunList() {
      return (
        this.categorySuggestList.filter(
          rec =>
            rec.daibuncd === this.form.daibuncd &&
            rec.cyubuncd === this.form.cyubuncd &&
            rec.syobuncd > 0 &&
            rec.kaku1buncd === 0
        ) || []
      )
    },
    kaku1bunList() {
      return (
        this.categorySuggestList.filter(
          rec =>
            rec.daibuncd === this.form.daibuncd &&
            rec.cyubuncd === this.form.cyubuncd &&
            rec.syobuncd === this.form.syobuncd &&
            rec.kaku1buncd > 0 &&
            rec.kaku2buncd === 0
        ) || []
      )
    },
    kaku2bunList() {
      return (
        this.categorySuggestList.filter(
          rec =>
            rec.daibuncd === this.form.daibuncd &&
            rec.cyubuncd === this.form.cyubuncd &&
            rec.syobuncd === this.form.syobuncd &&
            rec.kaku1buncd === this.form.kaku1buncd &&
            rec.kaku2buncd > 0
        ) || []
      )
    }
  },
  methods: {
    onChangeSuggest() {
      if (!this.form.daibuncd) {
        this.reset('cyubuncd')
      }
      if (!this.form.cyubuncd) {
        this.reset('syobuncd')
      }
      if (!this.form.syobuncd) {
        this.reset('kaku1buncd')
      }
      if (!this.form.kaku1buncd) {
        this.reset('kaku2buncd')
      }
    },
    reset(target) {
      if (this[target]) {
        this[target] = null
      } else {
        this.form[target] = null
      }
    }
  }
}

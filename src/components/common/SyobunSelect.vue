<template>
  <div>
    <b-row>
      <b-col :md="columnSize">
        <b-form-group
          label-size="sm"
          label="大分類"
          label-for="daibuncd"
          :label-cols="labelCols"
        >
          <b-suggestion
            :data="daibun"
            show-field="bunruime"
            id-field="daibuncd"
            size="sm"
            v-model="form.daibuncd"
            @input="onChangeSuggest"
          ></b-suggestion>
        </b-form-group>
      </b-col>
      <b-col :md="columnSize">
        <b-form-group
          label-size="sm"
          label="中分類"
          label-for="cyubuncd"
          :label-cols="labelCols"
        >
          <b-suggestion
            :data="cyubun"
            show-field="bunruime"
            id-field="cyubuncd"
            size="sm"
            v-model="form.cyubuncd"
            :disabled="!form.daibuncd"
            @input="onChangeSuggest"
          ></b-suggestion>
        </b-form-group>
      </b-col>
      <b-col :md="columnSize">
        <b-form-group
          label-size="sm"
          label="小分類"
          label-for="syobuncd"
          :label-cols="labelCols"
        >
          <b-suggestion
            :data="syobun"
            show-field="bunruime"
            id-field="syobuncd"
            size="sm"
            v-model="form.syobuncd"
            :disabled="!form.cyubuncd"
            @input="onChangeSuggest"
          ></b-suggestion>
        </b-form-group>
      </b-col>
      <b-col :md="columnSize">
        <b-form-group
          label-size="sm"
          label="拡張1分類"
          label-for="kaku1buncd"
          :label-cols="labelCols"
        >
          <b-suggestion
            :data="kaku1bun"
            show-field="bunruime"
            id-field="kaku1buncd"
            size="sm"
            v-model="form.kaku1buncd"
            :disabled="!form.syobuncd"
            @input="onChangeSuggest"
          ></b-suggestion>
        </b-form-group>
      </b-col>
      <b-col :md="columnSize">
        <b-form-group
          label-size="sm"
          label="拡張2分類"
          label-for="kaku2buncd"
          :label-cols="labelCols"
        >
          <b-suggestion
            :data="kaku2bun"
            show-field="bunruime"
            id-field="kaku2buncd"
            size="sm"
            v-model="form.kaku2buncd"
            :disabled="!form.kaku1buncd"
            @input="onChangeSuggest"
          ></b-suggestion>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BSuggestion from './BSuggestion'
import idbItem from '@/lib/idbItem'

export default {
  name: 'SyobunSelect',
  components: {
    BSuggestion
  },
  data() {
    return {
      categorySuggestList: []
    }
  },
  props: {
    columnSize: { type: Number, default: 4 },
    labelCols: { type: Number, default: 3 },
    form: { type: Object, required: true }
  },
  computed: {
    daibun() {
      return this.categorySuggestList.filter(
        rec => rec.daibuncd > 0 && rec.cyubuncd === 0
      )
    },
    cyubun() {
      return (
        this.categorySuggestList.filter(
          rec =>
            rec.daibuncd === this.form.daibuncd &&
            rec.cyubuncd > 0 &&
            rec.syobuncd === 0
        ) || []
      )
    },
    syobun() {
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
    kaku1bun() {
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
    kaku2bun() {
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
  async mounted() {
    this.categorySuggestList = await this.getSuggestList(idbItem.SYOBUN)
  },
  methods: {
    onChangeSuggest() {
      if (!this.form.daibuncd) {
        this.form.cyubuncd = null
      }
      if (!this.form.cyubuncd) {
        this.form.syobuncd = null
      }
      if (!this.form.syobuncd) {
        this.form.kaku1buncd = null
      }
      if (!this.form.kaku1buncd) {
        this.form.kaku2buncd = null
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

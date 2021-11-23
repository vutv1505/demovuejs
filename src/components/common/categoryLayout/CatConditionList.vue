<template>
  <b-form-select
    size="sm"
    v-model="currentCondIdx"
    :options="directItemSearchList"
    :plain="true"
    :class="'direct-search'"
    @change="changeCondIdx"
  >
    <option :value="null">リスト条件を選択</option>
  </b-form-select>
</template>

<script>
import { mapState } from '@/lib/store'

export default {
  name: 'CatConditionList',
  props: {
    namespace: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['currentCondIdx']),
    ...mapState(['directItemSearchList'], 'namespace', true)
  },
  methods: {
    changeCondIdx() {
      this.$emit('changeCurrentCondIdx')
    }
  }
}
</script>

<style scoped></style>

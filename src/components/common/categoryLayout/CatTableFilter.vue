<template>
  <div class="form-control filter-form d-flex">
    <span class="find-icon"
      ><svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        ></path></svg
    ></span>
    <input
      :maxlength="40"
      type="text"
      placeholder="このリストを検索..."
      @input="filterList($event)"
      v-model="filterWord"
      class="filter-word w-100"
    />
  </div>
</template>

<script>
import charUtil from '@/lib/CharUtil'
export default {
  name: 'CatTableFilter',
  data() {
    return {
      filterWord: ''
    }
  },
  methods: {
    filterList() {
      this.$emit(
        'filterTable',
        charUtil.convertToHalfWidthNumericFullWidthKatakana(
          this.filterWord.trim()
        )
      )
    },
    clear() {
      this.filterWord = ''
      this.filterList()
    }
  }
}
</script>

<style scoped lang="scss">
.filter-word {
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: none;
  background-color: transparent;
}

.find-icon {
  color: #9aa0a6;
  height: 20px;
  width: 20px;
  display: inline-block;
  fill: currentColor;
  position: relative;
}

.filter-form {
  input:focus-visible {
    outline: none;
  }
  &:focus-within {
    border-color: #4dbd74;
    box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.25);
  }
}
</style>

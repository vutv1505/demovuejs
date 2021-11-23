<template>
  <div>
    <div>
      <b-form-input
        type="text"
        class="suggest-input"
        size="sm"
        :placeholder="placeholder"
        :id="idName"
        :name="idName"
        v-model="key"
        @focus="openSuggest($event)"
        @blur="blurSuggest()"
        @keyup="onKeyUp($event)"
        v-validate="validationRule"
        data-vv-as="サジェスト項目"
        :state="!errors.has(idName)"
        autocomplete="off"
      ></b-form-input>
      <div v-show="errors.has(idName)" class="valid-msg-area">
        {{ errors.first(idName) }}
      </div>
    </div>
    <div class="candidate" id="candidate" v-show="isSuggestOpen">
      <ul class="candidate-list">
        <li
          v-for="(item, i) in list"
          :key="i"
          class="candidate-list-item"
          :class="{ 'focused-item': i === selectedIndex }"
          :style="{ 'min-width': `${minWidth}px` }"
          @click="selectedCandidateItem($event, item)"
        >
          {{ item[labelPropName] }}
        </li>
      </ul>
    </div>
    <div
      class="suggest-overlay"
      @click="closeList($event)"
      v-show="isSuggestOpen"
    ></div>
  </div>
</template>

<script>
import '../../lib/validate'

export default {
  name: 'Suggest',
  props: {
    suggestKey: {
      type: String,
      default: ''
    },
    suggestList: {
      type: Array,
      required: true
    },
    targetPropList: {
      type: Array,
      required: true
    },
    labelPropName: {
      type: String,
      required: true,
      default: ''
    },
    itemName: {
      type: String,
      required: true,
      default: ''
    },
    idName: {
      type: String,
      required: true,
      default: ''
    },
    validationRule: {
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      isSuggestOpen: false,
      list: [],
      key: '',
      selectedIndex: null,
      minWidth: 0,
      paddingSize: 8
    }
  },
  mounted() {
    this.list = JSON.parse(JSON.stringify(this.suggestList))
    this.key = JSON.parse(JSON.stringify(this.suggestKey))
  },
  methods: {
    openSuggest(e) {
      // console.log('openSuggest #############################################')
      // console.table(e)
      if (this.minWidth === 0) {
        this.minWidth = e.target.offsetWidth * 0.988
      }
      this.isSuggestOpen = true
    },
    selectedCandidateItem(e, item) {
      // console.log('selectedCandidateItem **********************************')
      // console.table(item)
      this.key = item[this.labelPropName]
      this.$emit('selectCandidate', item, this.itemName)
    },
    blurSuggest(e) {
      setTimeout(() => {
        this.closeList()
      }, 200)
    },
    closeList() {
      this.isSuggestOpen = false
    },
    onKeyUp(e) {
      const keyCode = e.keyCode
      const key = this.key
      let candidate = document.getElementById('candidate')
      // console.log(`candidate[${candidate}]`)
      // console.log(`candidate.scrollTop[${candidate.scrollTop}]`)
      // console.log(`keyCode[${keyCode}]`)
      // console.log(`key[${key}]`)
      // console.log(
      //   `this.selectedIndex[${this.selectedIndex}] this.list.length[${this.list.length}]`
      // )

      switch (keyCode) {
        case 13:
          // console.log('Enterキー押下')
          if (this.selectedIndex !== null) {
            this.key = this.list[this.selectedIndex][this.labelPropName]
            this.$emit(
              'selectCandidate',
              this.list[this.selectedIndex],
              this.itemName
            )
            this.closeList()
          } else {
            // focusを次へ
          }
          break
        case 38:
          // console.log('↑キー押下')
          if (this.selectedIndex === null) {
            this.selectedIndex = 0
          } else if (this.selectedIndex > 0) {
            this.selectedIndex--
            if (this.selectedIndex < this.list.length - 1 - 4) {
              document.getElementById('candidate').scrollTop -= 20
            }
          } else if (this.selectedIndex === 0) {
            this.selectedIndex = 0
          } else {
            this.selectedIndex = null
          }
          break
        case 40:
          // console.log('↓キー押下')
          if (this.selectedIndex === null) {
            this.selectedIndex = 0
          } else if (this.selectedIndex < this.list.length - 1) {
            this.selectedIndex++
            if (this.selectedIndex > 4) {
              document.getElementById('candidate').scrollTop += 20
            }
          } else if (this.selectedIndex === this.list.length - 1) {
            this.selectedIndex = this.list.length - 1
            document.getElementById('candidate').scrollTop += 20
          } else {
            this.selectedIndex = null
          }
          if (this.selectedIndex > 2) {
            candidate.scrolTop = 100
          }
          break
        default:
          break
      }

      // 絞り込み
      let hitCnt = 0
      this.list = this.suggestList.filter(rec => {
        hitCnt = 0
        this.targetPropList.forEach(prop => {
          // console.log(`key[${key}] ${prop}[${rec[prop]}]`)
          if (String(rec[prop]).indexOf(key) !== -1) {
            hitCnt++
          }
        })
        return hitCnt > 0
      })
    }
  }
  // watch: {
  //   key: function(val) {
  //     if (!this.isSuggestOpen) {
  //       this.isSuggestOpen = true
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.suggest-input {
  position: relative;
  // width: 200px;
  // height: 20px;
}
.candidate {
  position: absolute;
  top: initial;
  left: initial;
  z-index: 1000;
  height: 100px;
  overflow-y: scroll;

  .candidate-list {
    list-style-type: none;
    background-color: #fff;
    border-color: #8ad4ee;
    box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
    outline: 0;
    padding: 0;
    margin: 0;
    .candidate-list-item {
      font-size: 0.76563rem;
      width: 'auto';
      min-width: 120px;
      padding: 1px 8px;
      &:hover {
        background-color: #007bff;
        color: #fff;
      }
      &.focused-item {
        background-color: #4dbd74;
        color: #fff;
      }
    }
  }
}
.suggest-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 0, 0, 0.1);
  background-color: rgba(255, 0, 0, 0);
  z-index: 999;
}
</style>

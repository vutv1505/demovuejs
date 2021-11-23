<template>
  <div class="autocomplete" v-click-outside="handleClickOutside">
    <input
      class="form-control"
      :class="inputClass"
      @focusin="onChange"
      :placeholder="placeholder"
      type="text"
      @input="onChange"
      v-model="textInput"
      @keyup.down="onArrowDown"
      @keyup.up="onArrowUp"
      @keyup.enter="onEnter"
    />
    <ul
      id="autocomplete-results"
      v-show="isOpen"
      class="autocomplete-results py-2"
    >
      <li class="loading" v-if="isLoading">
        ロード中です
      </li>
      <li
        v-else
        v-for="(result, i) in suggesting"
        :key="i"
        @click="setSuggestion(result)"
        class="autocomplete-result pl-3 py-2"
        :class="{ 'is-active': i === arrowCounter }"
      >
        <span v-if="comparingField">{{ result[comparingField] }}</span>
        <span v-else>{{ result }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'AutocompleteInput',
  props: {
    autocompleteItems: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    comparingField: String,
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: String
  },

  data() {
    return {
      isOpen: false,
      suggesting: [],
      textInput: '',
      isLoading: false,
      arrowCounter: 0,
      inputClass: ''
    }
  },

  methods: {
    onChange() {
      this.inputClass = ''
      // For Ajax get suggest
      if (this.isAsync) {
        this.isLoading = true
      } else {
        this.filterSuggestion()
        this.isOpen = true
      }
    },
    getTextInput() {
      return this.textInput
    },
    clearTextInput() {
      this.textInput = ''
    },
    showInputInvalid() {
      this.inputClass = 'border-danger'
    },
    filterSuggestion() {
      this.suggesting = this.autocompleteItems.filter(item => {
        if (this.comparingField) {
          return (
            item[this.comparingField]
              .toLowerCase()
              .indexOf(this.textInput.toLowerCase()) > -1
          )
        } else {
          return item.toLowerCase().indexOf(this.textInput.toLowerCase()) > -1
        }
      })
    },
    setSuggestion(result) {
      if (this.comparingField) {
        this.textInput = result[this.comparingField]
      } else {
        this.textInput = result
      }
      this.isOpen = false
      this.arrowCounter = -1
      // Emit event selected suggestion
      this.$emit('onSelectedSuggestion', _.cloneDeep(result))
    },
    onArrowDown(evt) {
      if (this.arrowCounter < this.suggesting.length - 1) {
        this.arrowCounter = this.arrowCounter + 1
        document
          .getElementById('autocomplete-results')
          .childNodes[this.arrowCounter].scrollIntoViewIfNeeded()
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
        document
          .getElementById('autocomplete-results')
          .childNodes[this.arrowCounter].scrollIntoViewIfNeeded()
      }
    },
    onEnter() {
      this.setSuggestion(this.suggesting[this.arrowCounter])
      this.arrowCounter = -1
    },
    handleClickOutside() {
      if (this.isOpen) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    }
  },
  watch: {
    autocompleteItems: function(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.suggesting = val
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  position: absolute;
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  max-height: 12em;
  overflow: auto;
  width: 100%;
  background-color: white;
  z-index: 9999;
  box-shadow: 0 4px 5px 0 rgba(var(--elevation-base-color), 0.14),
    0 1px 10px 0 rgba(var(--elevation-base-color), 0.12),
    0 2px 4px -1px rgba(var(--elevation-base-color), 0.2);
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #eaeaea;
}
</style>

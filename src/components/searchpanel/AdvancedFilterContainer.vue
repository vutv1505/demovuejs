<template>
  <div class="dropdown-container">
    <div class="w-100 header-container header-container-color d-flex">
      <h6 class="text-center m-auto font-weight-bold">
        <slot name="dropdown-title"></slot>
      </h6>
      <span @click="$emit('onClickClose')"
        ><CIcon name="cil-chevron-right" class="icon-cursor"
      /></span>
    </div>
    <div class="px-3 py-2 bg-gray-100 d-flex">
      <AutocompleteInput
        ref="autocompleteInput"
        class="w-100"
        placeholder="条件名を入力..."
        @onSelectedSuggestion="$emit('onSelectedFilterTemplate', $event)"
        :comparing-field="'searchConditionsName'"
        :autocomplete-items="templatesList"
      />
      <CDropdown
        class="md-icon-btn"
        placement="bottom-end"
        addTogglerClasses=" bg-white"
      >
        <template #toggler-content>
          <CIcon size="sm" name="cilSettings" />
        </template>
        <template>
          <CDropdownItem v-on:click="createNewTemplate">保存</CDropdownItem>
          <CDropdownItem
            :disabled="!currentFilterTemplate.searchListSerialnumber"
            v-on:click="renameTemplate"
            >名前の変更
          </CDropdownItem>
          <CDropdownItem
            :disabled="!currentFilterTemplate.searchListSerialnumber"
            v-on:click="deleteTemplate"
            >削除
          </CDropdownItem>
        </template>
      </CDropdown>
    </div>
    <div class="px-3 pt-3 pb-2 scroll-dropdown">
      <validation-observer ref="advanceSearchObserver">
        <slot></slot>
      </validation-observer>
      <CRow class="footer-container w-100">
        <div class="w-100 footer-container-flex">
          <CButton
            color="outline-info"
            class="execute-button"
            @click="$emit('onClickClear')"
            >クリア
          </CButton>
          <CButton
            color="info"
            class="execute-button ml-1"
            @click="onClickSearch"
            >検索
          </CButton>
        </div>
      </CRow>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import AutocompleteInput from '../form/AutocompleteInput'
import FilterTemplateService from '../../api/filter-template.service'
import { MOCK_TEMPLATES_LIST } from '../../assets/mockdata/filter_template_list'
import { MOCK_USER_SESSION } from '../../assets/mockdata/user'
import { ValidationObserver } from 'vee-validate'

export default {
  name: 'AdvancedFilterContainer',
  components: { AutocompleteInput, ValidationObserver },
  props: {
    pageId: {
      type: String
    },
    currentFilterTemplate: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      templatesList: []
    }
  },
  methods: {
    fetchFilterTemplates() {
      if (!this.pageId) {
        console.warn('You should set prop page-id to fetch filter templates!')
      }
      // FilterTemplateService.get({
      //   accountCode: MOCK_USER_SESSION.accountCode,
      //   pageID: this.pageId
      // }).then(({ data }) => {
      //   this.templatesList = data.searchList
      // })

      //TODO testing only
      this.templatesList = MOCK_TEMPLATES_LIST.searchList
    },
    callApiSaveTemplate() {
      const body = {
        accountCode: MOCK_USER_SESSION.accountCode,
        pageID: this.pageId,
        searchList: this.templatesList
      }
      FilterTemplateService.save(body)
    },
    createNewTemplate() {
      // Validate template name
      const templateName = this.$refs.autocompleteInput.getTextInput()
      if (!templateName) {
        this.$refs.autocompleteInput.showInputInvalid()
        return
      }

      let newSerialNumber = 1
      if (this.templatesList.length > 0) {
        newSerialNumber =
          this.templatesList[this.templatesList.length - 1]
            .searchListSerialnumber + 1
      }
      // Add new template
      this.currentFilterTemplate.searchListSerialnumber = newSerialNumber
      this.currentFilterTemplate.searchConditionsName = templateName
      this.templatesList.push(this.currentFilterTemplate)

      this.callApiSaveTemplate()
    },
    renameTemplate() {
      // Find and rename object
      const targetTemplate = this.templatesList.find(
        template =>
          template.searchListSerialnumber ===
          this.currentFilterTemplate.searchListSerialnumber
      )
      if (targetTemplate) {
        targetTemplate.searchConditionsName = this.$refs.autocompleteInput.getTextInput()
        this.callApiSaveTemplate()
      }
    },
    deleteTemplate() {
      this.$refs.autocompleteInput.clearTextInput()
      this.$emit('onClickClear')
      _.remove(
        this.templatesList,
        template =>
          template.searchListSerialnumber ===
          this.currentFilterTemplate.searchListSerialnumber
      )
      this.callApiSaveTemplate()
    },
    async onClickSearch() {
      const isValid = await this.$refs.advanceSearchObserver.validate()
      if (isValid) {
        this.$emit('onClickSearch')
        this.$emit('onClickClose')
      }
    }
  },
  mounted() {
    this.fetchFilterTemplates()
  }
}
</script>

<style scoped>
.dropdown-container {
  min-width: 25em;
  min-height: 39em;
  padding-top: unset !important;
  padding-bottom: 5em;
}

.header-container-color {
  background-color: #5a6378;
  color: white;
  padding: 2px;
}

.icon-cursor {
  cursor: pointer;
  pointer-events: all;
}

.footer-container {
  position: absolute;
  bottom: 5%;
}

.footer-container-flex {
  display: flex;
  justify-content: space-evenly;
}

.execute-button {
  width: 100px;
}

.scroll-dropdown {
  height: 32em;
  overflow-y: auto;
}
</style>

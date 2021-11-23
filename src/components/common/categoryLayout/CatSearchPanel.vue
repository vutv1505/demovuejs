<template>
  <transition name="fade">
    <div class="filter-panel" :class="{ close: !isSearchPanelOpen }">
      <div class="filter-panel-header">
        <div class="header-title">検索条件</div>
        <i
          @click.stop="isSearchPanelOpen = !isSearchPanelOpen"
          class="close-btn icon-arrow-right icons font-2xl d-block mt-4"
        ></i>
      </div>

      <div class="filter-regist-area">
        <b-row class="footer-regist-row">
          <b-col md="10" class="footer-regist-col">
            <validation-provider
              rules="required|max:100"
              name="登録検索条件名"
              vid="searchConditionName"
              v-slot="{ valid, errors }"
              ref="formHeader"
            >
              <b-input-group>
                <b-form-input
                  size="sm"
                  type="text"
                  v-model="searchConditionName"
                  placeholder="条件名を入力"
                  class="condition-name"
                  name="searchConditionName"
                  :state="valid"
                  v-b-popover.hover.bottom="errors[0]"
                ></b-form-input>
                <b-input-group-prepend>
                  <action-button
                    size="sm"
                    variant="primary"
                    class="input-right-search"
                    @click="registerSearchCondition()"
                    >保存</action-button
                  >
                </b-input-group-prepend>
              </b-input-group>
            </validation-provider>
          </b-col>
          <b-col md="1">
            <b-dropdown size="sm" class="drop-menu-area">
              <template slot="button-content">
                <i class="fa fa-flash drop-menu-btn"></i>
              </template>
              <b-dropdown-item
                @click.stop="initCondition"
                class="fm-font-standard"
                >検索条件追加</b-dropdown-item
              >
              <b-dropdown-item
                @click.stop="copyCondition"
                :disabled="!searchConditionId"
                class="fm-font-standard"
                >検索条件複製</b-dropdown-item
              >
              <b-dropdown-item
                @click.stop="isDeleteModalOpen = true"
                :disabled="!searchConditionId"
                class="fm-font-standard"
                >検索条件削除</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
        </b-row>
      </div>

      <validation-observer class="filter-panel-main" tag="form" ref="form">
        <slot></slot>
      </validation-observer>

      <div class="filter-panel-footer">
        <b-row class="footer-search-row">
          <b-btn
            size="sm"
            class="mr-4"
            variant="outline-primary"
            @click.stop="$emit('clear-search-panel')"
            >クリア</b-btn
          >
          <action-button
            size="sm"
            variant="primary"
            @click.stop="clickSearchButton()"
            >検索</action-button
          >
        </b-row>
      </div>

      <b-modal
        ref="modal"
        @shown="onShown"
        title="検索条件削除"
        v-model="isDeleteModalOpen"
        @close="isDeleteModalOpen = false"
        ok-title="削除"
        ok-variant="danger"
        cancel-title="キャンセル"
        @ok="delCondition"
        no-close-on-backdrop
        no-close-on-esc
      >
        <div class="text-center">
          <i class="cui-trash icons del-img-icon"></i>
          <div>選択した検索条件を削除します</div>
        </div>
      </b-modal>
    </div>
  </transition>
</template>

<script>
import miniToastr from 'mini-toastr'
import { mapActions, mapState } from '@/lib/store'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import modal from '@/lib/modal'
import actionUtil from '@/lib/actionUtil'

export default {
  name: 'CatSearchPanel',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    namespace: {
      required: true
    },
    kikankesaCondition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      conditionName: '',
      isDeleteModalOpen: false
    }
  },
  mounted() {
    // this.$emit('click-search-panel')
  },
  computed: {
    ...mapState({
      currentCondIdx: 'currentCondIdx',
      isSearchPanelOpen: 'isSearchPanelOpen',
      searchConditionName: 'searchCondition.text'
    }),
    ...mapState(
      { searchConditionId: 'searchCondition.value' },
      'namespace',
      true
    )
  },
  methods: {
    ...mapActions([
      'initSearchCondition',
      'copySearchCondition',
      'delSearchCondition',
      'saveDirectItemSearchList'
    ]),
    async registerSearchCondition() {
      // バリデートの判定
      const check = await this.$refs.formHeader.validate()
      if (check.valid) {
        //エラーがなかった時の処理を下に記述
        actionUtil.call(
          this,
          this.saveDirectItemSearchList(this.kikankesaCondition),
          this.onRegisterSearchConditionSuccess
        )
      } else {
        miniToastr.error(
          '不正な入力値があります',
          'バリデーションエラー',
          this.toastFadeTime
        )
      }
    },
    onRegisterSearchConditionSuccess() {
      miniToastr.success(
        '検索条件を登録しました',
        '正常終了',
        this.toastFadeTime
      )
    },
    initCondition() {
      this.initSearchCondition()
      this.currentCondIdx = null
    },
    copyCondition() {
      this.copySearchCondition()
      this.currentCondIdx = null
    },
    async delCondition() {
      await this.delSearchCondition()
      this.initCondition()
    },
    async clickSearchButton() {
      // バリデートの判定
      const valid = await this.$refs.form.validate()
      if (valid) {
        //エラーがなかった時の処理を下に記述
        this.$emit('click-search-panel')
      } else {
        miniToastr.error(
          '不正な入力値があります',
          'バリデーションエラー',
          this.toastFadeTime
        )
      }
    },
    onShown() {
      modal(this.$refs.modal.$refs)
    }
  }
}
</script>

<style scoped lang="scss">
.filter-panel {
  z-index: 220 !important;
}

.footer-search-row {
  justify-content: center;

  button {
    min-width: 80px;
  }
}
</style>

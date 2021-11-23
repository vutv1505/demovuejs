import * as _ from 'lodash'
import { mapGetters } from '@/lib/store'
import actionUtil, { defaultErrorHandle } from '@/lib/actionUtil'
import miniToastr from 'mini-toastr'
import modal from '@/lib/modal'

export default {
  data() {
    const listItemMenu = this.getListItemMenu()
    const showModalStatus = Object.keys(listItemMenu)
      .filter(key => listItemMenu[key].modal)
      .reduce((rs, actionName) => {
        rs[actionName] = false
        return rs
      }, {})
    return {
      currentAction: { action: null, actionName: null },
      selectedData: null,
      _fnSelectedData: null,
      showModal: showModalStatus
    }
  },
  props: {
    namespace: {
      type: String,
      required: true
    },
    fnSelectedData: {
      type: Function
    },
    mainComponent: {}
  },
  computed: {
    ...mapGetters(['toastFadeTime'], () => 'common'),
    menuModal() {
      if (!this.listItemMenu) {
        return []
      }
      return Object.keys(this.listItemMenu)
        .filter(key => this.listItemMenu[key].modal)
        .reduce((menuItemMap, menuName) => {
          menuItemMap[menuName] = this.listItemMenu[menuName]
          return menuItemMap
        }, {})
    }
  },
  created() {
    this._fnSelectedData = this.fnSelectedData
  },
  methods: {
    onClickBackModal() {
      const { action, actionName } = this.currentAction
      if (action.onBack) {
        if (typeof action.onBack === 'string') {
          this.onAction(
            [this.listItemMenu[action.onBack], action.onBack],
            document.getElementById('modalBody_' + actionName).__vue__
              .getInitData,
            this.listItemMenu[action.onBack].paramModeOnBack
          )
        }
      }
    },
    async onClickOkModal(e) {
      e.preventDefault()
      const { action } = this.currentAction
      const okTitle =
        action.modal && action.modal.okTitle ? action.modal.okTitle : '送信'
      let ok = true
      if (okTitle !== '次へ' && this.currentAction.action.showConfirmDialog) {
        ok = await this.mainComponent.$bvModal.msgBoxConfirm(
          `${okTitle}してよろしいですか？`,
          {
            title: '確認',
            okVariant: 'primary',
            okTitle: okTitle,
            cancelTitle: 'キャンセル',
            headerBgVariant: 'white',
            footerBgVariant: 'white',
            bodyClass: 'py-5 text-center',
            noCloseOnBackdrop: true,
            noCloseOnEsc: true,
            centered: true
          }
        )
      }
      if (ok) {
        const bodyModalComponent = document.getElementById(
          'modalBody_' + this.currentAction.actionName
        ).__vue__
        const onClickOkModalSuccess =
          typeof action.onSuccess === 'string'
            ? this.onNextStepModal
            : this.onClickOkModalSuccess
        actionUtil.call(
          bodyModalComponent,
          this.onClickOkModalProcess,
          onClickOkModalSuccess,
          this.onClickOkModalError
        )
      }
    },
    async onClickOkModalProcess() {
      const { actionName } = this.currentAction
      this.result = await document
        .getElementById('modalBody_' + actionName)
        .__vue__.submit()
      return this.result
    },
    onNextStepModal() {
      const { action, actionName } = this.currentAction
      this.onAction(
        [this.listItemMenu[action.onSuccess], action.onSuccess],
        () => this.result
      )
      this.showModal[actionName] = false
    },
    async onClickOkModalSuccess() {
      const { action, actionName } = this.currentAction
      action.onSuccess &&
        (await action.onSuccess(this.mainComponent, () => this.result))
      if (this.currentAction.action.messageSuccess) {
        miniToastr.success(
          this.currentAction.action.messageSuccess,
          '正常終了',
          this.toastFadeTime
        )
      }
      this.showModal[actionName] = false
    },
    onClickOkModalError(e) {
      defaultErrorHandle.call(this, e)
      const { actionName } = this.currentAction
      !document
        .getElementById('modalBody_' + actionName)
        .querySelector('input,textarea,select,.handsontable') &&
        (this.showModal[actionName] = false)
    },
    async onClickCancelModal(e) {
      const { action } = this.currentAction
      const title = action.modal.title.replace(/\s+/g, '')
      if (this.currentAction.action.showConfirmDialog) {
        e.preventDefault()
        this.mainComponent.$bvModal
          .msgBoxConfirm(title + '画面を閉じますか？', {
            title: '確認',
            okVariant: 'primary',
            okTitle: 'OK',
            cancelTitle: 'キャンセル',
            headerBgVariant: 'white',
            footerBgVariant: 'white',
            bodyClass: 'py-5 text-center',
            noCloseOnBackdrop: true,
            noCloseOnEsc: true,
            centered: true
          })
          .then(value => {
            if (value === true) {
              this.$nextTick(() => {
                this.mainComponent.$bvModal.hide(e.componentId)
              })
            }
          })
      }
    },
    onAction(
      [action, actionName],
      fnSelectedData = this._fnSelectedData,
      paramMode = action.paramMode
    ) {
      this.currentAction = { action, actionName }
      let selectedData
      if (fnSelectedData) {
        switch (paramMode) {
          case 'multi':
            selectedData = fnSelectedData()
            break
          case 'single':
            selectedData = fnSelectedData()[0]
            break
        }
      }
      this.selectedData = _.cloneDeep(selectedData)
      if (action.modal) {
        this.showModal[actionName] = true
      } else {
        action.handler(this.mainComponent, selectedData)
      }
    },
    disableAction(fnDisableByParamMode, selectedData, allData) {
      this.listItemMenu &&
        Object.values(this.listItemMenu).forEach(itemMenu => {
          itemMenu.button.disabled =
            fnDisableByParamMode(itemMenu.paramMode) ||
            (itemMenu.disableMenuCondition &&
              itemMenu.disableMenuCondition(selectedData, allData))
        })
    },
    onChangeOkDisable(status) {
      const action = this.currentAction.action
      action.modal.okDisabled = status
    },
    onShown() {
      modal(this.$refs['modal_' + this.currentAction.actionName].$refs)
    }
  }
}

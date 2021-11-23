export default {
  new: {
    button: {
      text: '新規',
      class: 'text-muted fm-width-button',
      disabled: true
    },
    modal: {
      okTitle: '保存',
      okVariant: 'primary btn-sm',
      cancelVariant: 'outline-primary btn-sm',
      cancelTitle: 'キャンセル',
      size: 'xl',
      class: 'custom-form',
      okDisabled: false
    },
    paramMode: 'none',
    messageSuccess: '登録が完了しました',
    showConfirmDialog: true
  },
  deplicate: {
    button: {
      text: '複製',
      class: 'text-muted fm-width-button',
      disabled: false
    },
    modal: {
      okTitle: '保存',
      okVariant: 'primary btn-sm',
      cancelTitle: 'キャンセル',
      cancelVariant: 'outline-primary btn-sm',
      size: 'xl',
      class: 'custom-form',
      okDisabled: false
    },
    paramMode: 'single',
    messageSuccess: '複製が完了しました',
    showConfirmDialog: true
  },
  update: {
    button: {
      text: '編集',
      class: 'text-muted fm-width-button',
      disabled: false,
      hidden: false
    },
    modal: {
      okTitle: '保存',
      okVariant: 'primary btn-sm',
      cancelVariant: 'outline-primary btn-sm',
      cancelTitle: 'キャンセル',
      size: 'xl',
      class: 'custom-form',
      okDisabled: false
    },
    paramMode: 'single',
    messageSuccess: '変更が完了しました',
    showConfirmDialog: true
  },
  delete: {
    button: {
      text: '削除',
      class: 'text-muted fm-width-button',
      disabled: false
    },
    modal: {
      okTitle: '削除',
      okVariant: 'danger btn-sm',
      cancelVariant: 'outline-primary btn-sm',
      cancelTitle: 'キャンセル',
      size: '',
      okDisabled: false
    },
    paramMode: 'multi',
    messageSuccess: '削除が完了しました',
    showConfirmDialog: false,
    onSuccess: mainComponent => mainComponent.onSearchData()
  },
  cancel: {
    button: {
      text: '取り消し',
      disabled: false
    },
    modal: {
      title: 'メーカー削除',
      okTitle: '取り消し',
      okVariant: 'danger btn-sm',
      cancelVariant: 'secondary',
      cancelTitle: 'キャンセル',
      size: '',
      okDisabled: false
    },
    paramMode: 'multi',
    showConfirmDialog: true,
    onSuccess: mainComponent => mainComponent.onChangeSelected()
  },
  import: {
    button: {
      text: 'インポート',
      class: 'text-muted fm-width-button',
      disabled: false
    }
  },
  refresh: {
    button: {
      class: 'text-muted ml-1 fm-color-refresh',
      icon: 'fa fa-repeat',
      disabled: false
    },
    handler: mainComponent => mainComponent.onSearchData()
  },
  download: {
    button: {
      class: 'text-muted ml-1 fm-color-download',
      icon: 'fa fa-download'
    },
    handler: mainComponent => mainComponent.downloadList()
  },
  openFilterPanel: {
    button: {
      class: 'text-muted ml-1 fm-color-open-filter-panel',
      icon: 'fa fa-search',
      disabled: false
    },
    handler: mainComponent =>
      (mainComponent.isSearchPanelOpen = !mainComponent.isSearchPanelOpen)
  },
  resetPassword: {
    button: {
      text: 'パスワードリセット',
      disabled: false
    },
    modal: {
      okTitle: 'リセット',
      okVariant: 'danger btn-sm',
      cancelVariant: 'outline-primary btn-sm',
      size: '',
      okDisabled: false,
      cancelTitle: 'キャンセル'
    },
    paramMode: 'single'
  },
  setDefault: {
    button: {
      text: '既定に設定',
      disabled: false
    },
    modal: {
      okTitle: '設定',
      okVariant: 'primary btn-sm',
      cancelVariant: 'outline-primary btn-sm',
      cancelTitle: 'キャンセル',
      size: '',
      okDisabled: false
    },
    paramMode: 'single'
  },
  back: {
    modal: {
      okTitle: '保存',
      okVariant: 'primary btn-sm',
      cancelTitle: 'キャンセル',
      cancelVariant: 'outline-primary btn-sm',
      backTitle: '戻る',
      backVariant: 'outline-primary btn-sm',
      size: 'xl',
      okDisabled: false
    },
    showConfirmDialog: false
  },
  openRightPanel: {
    button: {
      class: 'text-muted ml-1 fm-color-open-right-panel',
      disabled: false
    },
    handler: mainComponent =>
      (mainComponent.isRightPanelOpen = !mainComponent.isRightPanelOpen)
  }
}

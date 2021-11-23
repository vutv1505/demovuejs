import miniToastr from 'mini-toastr'

miniToastr.init()

export const configToast = {
  type: {
    success: 'success',
    error: 'error',
    info: 'info',
    warn: 'warn'
  },
  delay: {
    common: 3000
  },
  isShowIcon: true,
  showToast(type, title, description, delay) {
    miniToastr.config.icons = {}
    if (this.isShowIcon) {
      miniToastr.setIcon('error', 'i', { class: 'fa fa-times' })
      miniToastr.setIcon('warn', 'i', { class: 'fa fa-warning' })
      miniToastr.setIcon('info', 'i', { class: 'fa fa-info' })
      miniToastr.setIcon('success', 'i', { class: 'fa fa-check' })
    }
    miniToastr[type](description, title, delay)
  }
}

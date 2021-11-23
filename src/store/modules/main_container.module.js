const state = {
  showNotificationModal: false,
  showLogoutModal: false,
  showChangePasswordModal: false
}

const mutations = {
  showHideNotificationModal(state, isShow) {
    state['showNotificationModal'] = isShow
  },
  showHideLogoutModal(state, isShow) {
    state['showLogoutModal'] = isShow
  },
  showHideChangePasswordModal(state, isShow) {
    state['showChangePasswordModal'] = isShow
  }
}

export default {
  state,
  mutations
}

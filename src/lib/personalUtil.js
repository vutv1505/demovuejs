import store from '../store/index'

export async function hasPersonalinfoDisplayAuthority() {
  const userInfo = await store.dispatch('common/loadUserInfo')
  let hasPersonalinfoDisplayAuthority = false
  if (userInfo && userInfo.userResourceList) {
    hasPersonalinfoDisplayAuthority = userInfo.userResourceList
      .map(r => r.authority)
      .some(authority => authority === 'personalinfo:display')
  }
  return hasPersonalinfoDisplayAuthority
}

import miniToastr from 'mini-toastr'
import store from '../store'

const toastFadeTime = store.getters['common/toastFadeTime']

export function defaultSuccessHandle() {
  miniToastr.success('', '正常終了', toastFadeTime)
}

export function defaultErrorHandle(e) {
  if (!e) {
    return
  }
  if (e.data && e.data.error && e.data.error.errorMessage) {
    if (e.stack) console.error(e.stack)
    miniToastr.error(e.data.error.errorMessage, '異常終了', toastFadeTime)
  } else {
    if (e.stack) console.error(e.stack)
    miniToastr.error(e, '異常終了', toastFadeTime)
  }
}

function setLoading(loading) {
  if (this.isLoading != null) {
    this.isLoading = loading
  } else if (this.namespace) {
    store.commit(`${this.namespace}/setState`, ['isLoading', loading])
  }
}

async function run(process, successHandle, errorHandle) {
  !successHandle && (successHandle = defaultSuccessHandle)
  !errorHandle && (errorHandle = defaultErrorHandle)
  try {
    setLoading.call(this, true)
    let res
    if (typeof process === 'function') {
      res = await process()
    } else {
      res = await process
    }
    if (res && res.data && res.data.error) {
      await errorHandle.call(this, res)
    } else {
      await successHandle.call(this)
    }
  } catch (e) {
    await errorHandle.call(this, e)
  } finally {
    setLoading.call(this, false)
  }
}
export default run

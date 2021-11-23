import Vue from 'vue'
import LoadingOverRay from '../components/common/LoadingOverRay'
import CommonLoading from '../components/common/CommonLoading'

Vue.directive('loading', {
  inserted: (el, binding, vnode) => {
    const loadingComponent = Vue.extend(LoadingOverRay)
    const instance = new loadingComponent({
      propsData: {
        isLoading: binding.value
      }
    })
    vnode.context[`_loadingOverRayInstance${instance._uid}`] = instance
    instance.$mount()
    el.style.position = 'relative'
    el.appendChild(instance.$el)
    el.setAttribute('loading-instance-id', instance._uid)
  },
  update: (el, binding, vnode) => {
    const id = el.getAttribute('loading-instance-id')
    vnode.context[`_loadingOverRayInstance${id}`].$props.isLoading =
      binding.value
  }
})

Vue.directive('loading-spinner', {
  inserted: (el, binding, vnode) => {
    const loadingSpinner = Vue.extend(CommonLoading)
    const instance = new loadingSpinner({
      data: {
        isLoading: binding.value
      }
    })
    vnode.context[`_loadingSpinnerInstance${instance._uid}`] = instance
    instance.$mount()
    el.style.position = 'relative'
    el.appendChild(instance.$el)
    el.setAttribute('loading-spinner-id', instance._uid)
  },
  update: (el, binding, vnode) => {
    const id = el.getAttribute('loading-spinner-id')
    vnode.context[`_loadingSpinnerInstance${id}`].$data.isLoading =
      binding.value
  }
})

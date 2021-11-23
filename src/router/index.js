import Vue from 'vue'
import Router from 'vue-router'

const ApprovalList = () => import('../views/approval/ApprovalList')
const MainContainer = () => import('@/containers/MainContainer')
const Login = () => import('@/views/Login')
const Home = () => import('@/views/Home')
const OrderList = () => import('@/views/order/orderinfo/OrderList')
const OrderInquiry = () => import('@/views/order/inquiry/OrderInquiry')
const ImportFileList = () => import('@/views/filemanagement/ImportFileList')
const BillingInquiryList = () =>
  import('@/views/billingmanagement/BillingInquiryList')
const ArrivalList = () => import('@/views/arrivalmanagement/ArrivalList')
const InformationInquiry = () => import('@/views/billingmanagement/InformationInquiry')
const MovementInformationInquiry = () => import('@/views/billingmanagement/MovementInquiry')
Vue.use(Router)

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'link-active',
  linkExactActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'ホーム',
      // redirect: '/dashboard',
      component: MainContainer,
      children: [
        {
          path: 'dashboard',
          name: 'ダッシュボード',
          component: Home
        },
        {
          path: 'business-management',
          redirect: '/business-management/order-list',
          name: '発注管理',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'order-list',
              name: '発注計画',
              component: OrderList
            },
            {
              path: 'order-inquiry',
              name: '発注情報照会',
              component: OrderInquiry
            }
          ]
        },
        {
          path: 'arrival-management',
          redirect: '/arrival-management/arrival-list',
          name: '入荷管理',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'arrival-list',
              name: '入荷情報照会',
              component: ArrivalList
            }
          ]
        },
        {
          path: 'billing-management',
          redirect: '/billing-management/billing-inquiry',
          name: '請求管理',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'billing-inquiry',
              name: '請求情報照会',
              component: BillingInquiryList
            }
          ]
        },
        {
          path: 'business-management/inventory-control',
          name: '請求管理',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'information-inquiry',
              name: 'ロット番号情報照会',
              component: InformationInquiry
            },
            {
              path: 'movement-inquiry',
              name: '在庫移動情報照会',
              component: MovementInformationInquiry
            }
          ]
        },
        {
          path: 'import-file-management',
          redirect: '/import-file-management/list',
          name: 'IF管理',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'list',
              name: 'ファイル取込',
              component: ImportFileList
            }
          ]
        },
        {
          path: 'approval-management',
          redirect: '/approval-management/approval-list',
          name: 'ワークフロー管理',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'approval-list',
              name: '承認一覧',
              component: ApprovalList
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

const fPush = router.push
router.push = function(location, onComplete, onAbort) {
  router.currentRoute.query &&
    Object.keys(router.currentRoute.query).length &&
    router.replace({
      query: undefined
    })
  fPush.call(this, location, onComplete, onAbort)
}

export default router

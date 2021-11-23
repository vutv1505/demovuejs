<script>
export default {
  name: 'nav',
  computed: {
    sidebarItems() {
      return [
        {
          _name: 'CSidebarNav',
          _children: [
            {
              _name: 'CSidebarNavItem',
              name: 'ダッシュボード',
              to: '/dashboard',
              icon: 'cil-home'
            },
            {
              _name: 'CSidebarNavTitle',
              _children: ['発注・仕入業務']
            },
            {
              _name: 'CSidebarNavDropdown',
              name: '発注管理',
              to: '/business-management',
              icon: 'cil-clipboard',
              items: [
                {
                  name: '発注計画',
                  to: '/business-management/order-list'
                },
                {
                  name: '発注情報照会',
                  to: '/business-management/order-inquiry'
                }
              ]
            },
            {
              _name: 'CSidebarNavDropdown',
              name: '入荷管理',
              to: '/arrival-management/',
              icon: 'cil-clipboard',
              items: [
                {
                  name: '入荷情報照会',
                  to: '/arrival-management/arrival-list'
                }
              ]
            },
            {
              _name: 'CSidebarNavDropdown',
              name: '請求管理',
              to: '/billing-management',
              icon: 'cil-clipboard',
              items: [
                {
                  name: '請求情報照会',
                  to: '/billing-management/billing-inquiry'
                }
              ]
            },
            {
              _name: 'CSidebarNavDropdown',
              name: '在庫管理',
              to: '/business-management/inventory-control',
              icon: 'cil-clipboard',
              items: [
                {
                  name: 'ロット番号情報照会',
                  to: '/business-management/inventory-control/information-inquiry',
                },
                {
                  name: '在庫移動情報照会',
                  to: '/business-management/inventory-control/movement-inquiry',
                }
              ]
            },
            {
              _name: 'CSidebarNavDropdown',
              name: 'IF管理',
              to: '/import-file-management',
              icon: 'cil-clipboard',
              items: [
                {
                  name: 'ファイル取込',
                  to: '/import-file-management/list'
                }
              ]
            },
            {
              _name: 'CSidebarNavDropdown',
              name: 'ワークフロー管理',
              to: '/approval-management',
              icon: 'cil-clipboard',
              items: [
                {
                  name: '承認一覧',
                  to: '/approval-management/approval-list'
                }
              ]
            },
            {
              _name: 'CSidebarNavDivider',
              _class: 'm-3'
            },
            {
              _name: 'CSidebarNavTitle',
              _children: ['マスタ管理']
            },
            {
              _name: 'CSidebarNavDropdown',
              name: 'マスタ管理',
              icon: 'cil-settings',
              to: '/business-management/settings'
            }
          ]
        }
      ]
    }
  }
}
</script>

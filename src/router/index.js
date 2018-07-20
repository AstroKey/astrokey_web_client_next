import Vue from 'vue'
import Router from 'vue-router'

// Module routes
import MainRoutes from '@/modules/main/router'
import AuthRoutes from '@/modules/auth/router'
import WorkflowRoutes from '@/modules/workflow/router'
import UserRoutes from '@/modules/user/router'
import DeviceRoutes from '@/modules/device/router'
import ShortcutRoutes from '@/modules/shortcut/router'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    ...MainRoutes,
    ...AuthRoutes,
    ...UserRoutes,
    ...WorkflowRoutes,
    ...DeviceRoutes,
    ...ShortcutRoutes
  ]
})

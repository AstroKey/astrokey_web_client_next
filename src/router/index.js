import Vue from 'vue'
import Router from 'vue-router'

// Module routes
import MainRoutes from '@/modules/main/router'
import WorkflowRoutes from '@/modules/workflow/router'
import DeviceRoutes from '@/modules/device/router'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    ...MainRoutes,
    ...WorkflowRoutes,
    ...DeviceRoutes
  ]
})

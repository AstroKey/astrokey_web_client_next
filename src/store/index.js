import Vue from 'vue'
import Vuex from 'vuex'

import chrome_usb from './chrome_usb'
import web_usb from './web_usb'
import web_bluetooth from './web_bluetooth'

import notification from '@/modules/notification/store'
import auth from '@/modules/auth/store'
import workflow from '@/modules/workflow/store'
import user from '@/modules/user/store'
import device from '@/modules/device/store'
import shortcut from '@/modules/shortcut/store'

// Vuex Initialization
Vue.use(Vuex)

// Export Vuex store instance
export default new Vuex.Store({
  modules: {
    chrome_usb,
    web_usb,
    web_bluetooth,

    notification,
    auth,
    workflow,
    user,
    device,
    shortcut
  }
})

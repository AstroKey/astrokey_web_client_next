// import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import device from './device'
import chrome_usb from './chrome_usb'
import web_usb from './web_usb'
import web_bluetooth from './web_bluetooth'
import workflow from './workflow'
import notification from './notification'

// Vuex Initialization
// TODO - should this be done elsewhere?
Vue.use(Vuex)

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  modules: {
    device,
    chrome_usb,
    web_usb,
    web_bluetooth,
    workflow,
    notification
  }
  // plugins: [createPersistedState()]
})

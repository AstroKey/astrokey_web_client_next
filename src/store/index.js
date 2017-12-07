import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import device from './device'
import post from './post'
import user from './user'
import usb from './usb'
import notification from './notification'

// Vuex Initialization
// TODO - should this be done elsewhere?
Vue.use(Vuex)

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  modules: {
    auth,
    device,
    post,
    user,
    usb,
    notification
  }
})
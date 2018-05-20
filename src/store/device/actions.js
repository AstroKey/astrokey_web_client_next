// import ProjectFactory from './factory'
import store from '@/store'

// // // //

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {
  // fetchCollection: ({ commit }) => ProjectFactory.fetchCollection({ commit }),

  // fetchModel: ({ commit }, id) => ProjectFactory.fetchModel({ commit }, id),

  // create: ({ commit }, attributes) => ProjectFactory.create({ commit }, attributes),

  // update: ({ commit }, attributes) => ProjectFactory.update({ commit }, attributes),

  // destroy: ({ commit }, id) => ProjectFactory.destroy({ commit }, id)

  // connect
  // Invoked with store.commit('device/connect', { device })
  // TODO - change device to device.id, move into state
  connect: ({ commit }, { device }) => {
    // TODO - ACTIONS should be constantized
    // TODO - API for WebUSB and WebBluetooth should be consistent

    // Handles WebUSB & WebBluetooth devices
    // TODO - constantize 'web_usb'
    if (device.type === 'web_usb') {
      return store.dispatch('web_usb/openDevice', { device: device })
    }

    if (device.type === 'chrome_usb') {
      return store.dispatch('chrome_usb/openDevice', { device: device })
    }

    // Handles WebUSB & WebBluetooth devices
    // TODO - constantize 'web_bluetooth'
    if (device.type === 'web_bluetooth') {
      return store.dispatch('web_bluetooth/openDevice', { device: device })
    }
  },

  // disconnect
  // Invoked with store.commit('device/disconnect', { device })
  disconnect: ({ commit }, { device }) => {
    // Handles WebUSB & WebBluetooth devices
    // TODO - constantize 'web_usb'
    if (device.type === 'web_usb') {
      return store.dispatch('web_usb/closeDevice', { device: device })
    }

    // Handles WebUSB & WebBluetooth devices
    // TODO - constantize 'web_bluetooth'
    if (device.type === 'web_bluetooth') {
      return store.dispatch('web_bluetooth/closeDevice', { device: device })
    }
  }
}

// // // //

export default actions

import store from '@/store'
import _ from 'lodash'

// // // //

// WebUSB Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  collection (state, collection) {
    // Iterates over each WebBluetooth device
    _.each(collection, (device) => {
      store.commit('web_bluetooth/add', { instance: device })
    })
  },
  // TODO - most of this code method should live inside the ChromeWebUSBService
  add (state, options) {
    // Finds device if it exists in the store
    let devices = store.getters['device/collection']
    // let device = _.find(devices, { serialNumber: options.instance.id })
    let device = _.find(devices, { id: options.instance.id })

    console.log(options)
    // console.log(options.instance.gatt)
    if (device) {
      device.characteristics = device.characteristics || options.characteristics
      device.primary_service = device.primary_service || options.primary_service
      device.instance = options.instance || device.instance
      device.opened = options.instance.gatt.connected
      device.loading = options.loading || false
      return
    }

    // Isolates the requisite attributes
    let deviceAttributes = {
      type: 'web_bluetooth',
      characteristics: options.characteristics,
      primary_service: options.primary_service,
      instance: options.instance,
      loading: options.loading,
      serialNumber: options.instance.id,
      // productName: options.instance.name,
      productName: 'Lyrebird',
      // opened: options.instance.gatt.connected,
      deviceVersionMajor: 0,
      deviceVersionMinor: 0,
      deviceVersionSubminor: 1
    }

    // Adds the device to the centralized device store
    store.commit('device/add', deviceAttributes)
  }
}

// // // //

export default mutations

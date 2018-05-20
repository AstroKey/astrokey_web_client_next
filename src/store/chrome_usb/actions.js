import ChromeAppUsbService from './chrome_app_usb_service'
import store from '@/store'
import _ from 'lodash'
window.store = store

function getVuexDevice (usbDeviceInstance) {
  // Isolates the requisite attributes
  return {
    id: _.uniqueId('chrome_app_usb_'),
    type: 'chrome_usb',
    serialNumber: usbDeviceInstance.serialNumber,
    productName: usbDeviceInstance.productName,
    opened: usbDeviceInstance.opened || false,
    vendorId: usbDeviceInstance.vendorId,
    deviceVersionMajor: usbDeviceInstance.version,
    deviceVersionMinor: usbDeviceInstance.deviceVersionMinor,
    deviceVersionSubminor: usbDeviceInstance.deviceVersionSubminor
  }
}

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {

  // requestDevices
  // store.dispatch('chrome_usb/requestDevices')
  requestDevices: ({ state, commit }) => {
    commit('fetching', true)
    let vuexDevices = []
    return ChromeAppUsbService.getDevices()
    .then((devices) => {
      _.each(devices, (d) => {
        let device = _.find(state.collection, { serialNumber: d.serialNumber })
        if (device) return vuexDevices.push(device)
        return vuexDevices.push(getVuexDevice(d))
      })
      // console.log(devices)
      // console.log(vuexDevices)
      commit('collection', vuexDevices)
    })
  },

  // openDevice
  // store.dispatch('web_usb/openDevice', { device: UsbDevice })
  openDevice: ({ commit }, { device }) => {
    ChromeAppUsbService.openDevice(device.serialNumber).then((d) => { device.opened = true })
  },

  // closeDevice
  // store.dispatch('web_usb/closeDevice', { device: UsbDevice })
  closeDevice: ({ commit }, { device }) => {
    ChromeAppUsbService.closeDevice(device).then((d) => { device.opened = false })
  },

  // readMacro
  // store.dispatch('web_usb/readMacro', { device: UsbDevice, key: 0x0000 })
  readMacro: ({ commit }, { device, key }) => {
    ChromeAppUsbService.readMacro({ commit }, device, key)
  },

  // store.dispatch('web_usb/writeMacro', { device: UsbDevice, key: 0x0000, data: [ 1, 2, ... ] })
  // TODO - rename to writeWorkflow
  writeMacro: ({ commit }, { device, key, data }) => {
    ChromeAppUsbService.writeMacro({ commit }, device, key, data)
  }
}

// // // //

export default actions

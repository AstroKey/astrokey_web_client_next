import _ from 'lodash'
import store from '@/store'
import router from '@/router'
import { REQUEST_DEVICE_FILTERS, READ_MACRO_CONTROL_TRANSFER, WRITE_MACRO_CONTROL_TRANSFER, DEFAULT_CONTROL_TRANSFER } from './constants'
const USBDevices = []

// // // //
// NOTE - these are now CHROME-only WebUSB actions
// We need to make a separate file for FIREFOX WebUSB actions

// Builds a Vuex-friendly representation of a device
function buildVuexDevice (usbDevice) {
  return {
    id: usbDevice.id,
    productName: 'AstroKey',
    type: 'chrome_web_usb',
    opened: usbDevice.opened,
    fetching: false,
    keys: [
      { id: 'KEY_01', order: 0x0000, selected: false, workflow: {} },
      { id: 'KEY_02', order: 0x0001, selected: false, workflow: {} },
      { id: 'KEY_03', order: 0x0002, selected: false, workflow: {} },
      { id: 'KEY_04', order: 0x0003, selected: false, workflow: {} },
      { id: 'KEY_05', order: 0x0004, selected: false, workflow: {} }
    ]
  }
}

// Tracks a USBDevice instance in USBDevices
function trackUsbDevice (device) {
  let trackedDevice = _.find(USBDevices, { id: device.id })
  if (trackedDevice) return
  USBDevices.push(device)
}

// Pulls a USBDevice instance from USBDevices
function getUsbDevice (device_id) {
  return _.find(USBDevices, { id: device_id })
}

function getUniqueId () {
  return _.uniqueId('CWEB_USB_DEVICE_')
}

// // // //

// WebUSB Device 'connect' event handler
navigator.usb.addEventListener('connect', (usbConnectionEvent) => {
  let device = usbConnectionEvent.device
  device.id = getUniqueId()
  trackUsbDevice(device)
  store.dispatch('web_usb/resetCollection')
})

// WebUSB Device 'disconnect' event handler
navigator.usb.addEventListener('disconnect', (usbConnectionEvent) => {
  // USBDevices.push(usbConnectionEvent.device)
  // TODO - remove from USBDevices
  // TODO - these should JUST hit the 'device/add' directly
  // store.commit('web_usb/remove', usbConnectionEvent.device)
  // USBDevices.push(usbConnectionEvent.device)
  store.dispatch('web_usb/resetCollection')
})

// // // //

export default {
  // Invoked with:
  // store.dispatch('web_usb/requestDevices')
  // TODO - ensure that this function does not add duplicate devices to store.collection
  requestDevices: ({ dispatch }) => {
    return new Promise((resolve, reject) => {
      return navigator.usb.requestDevice({ filters: REQUEST_DEVICE_FILTERS })
      .then((device) => {
        trackUsbDevice(device)
        dispatch('resetCollection')
      })
      .catch((err) => {
        console.log('ERR - navigator.usb.requestDevice()')
        // throw err
        dispatch('handleError')
        return reject(err)
      })
    })
  },

  // resets state.collection to be up-to-date with all devices in USBDevices array
  resetCollection ({ commit, dispatch }) {
    let collection = []
    _.each(USBDevices, (d) => {
      collection.push(buildVuexDevice(d))
    })

    // Updates the collection
    commit('collection', collection)

    // Updates device.selectedDevice
    dispatch('updateSelectedDevice')
  },

  updateSelectedDevice ({ state, commit, rootGetters }) {
    let selectedDevice = rootGetters['device/selectedDevice']
    if (!selectedDevice.id) return

    console.log('UPDATE SELECTED DEVICE')
    console.log(selectedDevice.id)
    console.log(selectedDevice.opened)

    let updatedDevice = _.find(state.collection, { id: selectedDevice.id })
    if (!updatedDevice) return
    console.log('LATEST DEVICE?')
    console.log(updatedDevice.id)
    console.log(updatedDevice.opened)
    commit('device/selectedDevice', updatedDevice, { root: true })
  },

  // Invoked with:
  // store.dispatch('web_usb/getDevices')
  getDevices: ({ state, commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      return navigator.usb.getDevices()
      .then((deviceArray) => {
        _.each(deviceArray, (d) => {
          d.id = getUniqueId()
          trackUsbDevice(d)
        })

        dispatch('resetCollection')
        return resolve()
      })
      .catch((err) => {
        console.log('ERR - navigator.usb.getDevices()')
        // throw err
        dispatch('handleError')
        return reject(err)
      })
    })
  },

  // Invoked with:
  // store.dispatch('web_usb/openDevice', vuexDevice)
  openDevice: ({ dispatch }, vuexDevice) => {
    let usbDevice = getUsbDevice(vuexDevice.id)
    if (!usbDevice) return

    return new Promise((resolve, reject) => {
      return usbDevice.open().then(() => {
        // QUESTION - do we want to manage configuration selection in a separate method?
        return usbDevice.selectConfiguration(1).then(() => {
          dispatch('resetCollection')
        })
      })
      .catch((err) => {
        console.log('ERR - USBDevice.open() failure')
        // throw err
        dispatch('handleError')
        return reject(err)
      })
    })
  },

  // Invoked with:
  // store.dispatch('web_usb/closeDevice', { device: UsbDevice })
  closeDevice: ({ dispatch }, vuexDevice) => {
    let usbDevice = getUsbDevice(vuexDevice.id)
    if (!usbDevice) return

    return new Promise((resolve, reject) => {
      return usbDevice.close().then(() => {
        dispatch('resetCollection')
      })
      .catch((err) => {
        console.log('ERR - USBDevice.close() failure')
        // throw err
        dispatch('handleError')
        return reject(err)
      })
    })
  },

  // Invoked with:
  // store.dispatch('web_usb/readMacro', { device: UsbDevice, key: 0x0000 })
  readMacro: ({ commit, dispatch }, { device, key }) => {
    let usbDevice = getUsbDevice(device.id)
    if (!usbDevice) return

    // keyIndex in hex: `0x0000`
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      // Clones the READ_MACRO_CONTROL_TRANSFER request object
      // And adds custom `value` attribute to handle the index of the key we're reading from
      let READ_MACRO_OPTIONS = _.clone(READ_MACRO_CONTROL_TRANSFER)
      READ_MACRO_OPTIONS.value = key

      // NOTE - `device.controlTransferIn` READS DATA FROM DEVICE
      // TODO - '256' should be '128'
      // TODO - `256` should be moved into constants.js
      // QUESTION - what is this `256` again, expected return length?
      return usbDevice.controlTransferIn(READ_MACRO_OPTIONS, 256)
      .then((response) => {
        console.log('readMacro response:')
        console.log(new Uint8Array(response.data.buffer))
        return resolve(new Uint8Array(response.data.buffer))
      })
      .catch((err) => {
        console.log('readMacro error:')
        dispatch('handleError')
        return reject(err)
      })
    })
  },

  // Invoked with:
  // store.dispatch('web_usb/writeMacro', { device: UsbDevice, key: 0x0000, data: [ 1, 2, ... ] })
  // TODO - rename to writeWorkflow
  writeMacro: ({ commit, dispatch }, { device, key, data }) => {
    let usbDevice = getUsbDevice(device.id)
    if (!usbDevice) return

    return new Promise((resolve, reject) => {
      // Clones the READ_MACRO_CONTROL_TRANSFER request object
      // And adds custom `value` attribute to handle the index of the key we're reading from
      let WRITE_MACRO_OPTIONS = _.clone(WRITE_MACRO_CONTROL_TRANSFER)
      WRITE_MACRO_OPTIONS.value = key.order

      // NOTE - `device.controlTransferOut` WRITES DATA TO DEVICE
      return usbDevice.controlTransferOut(WRITE_MACRO_OPTIONS, new Uint8Array(data).buffer)
      .then((response) => {
        console.log('writeMacro response:')
        console.log(response)
        // return resolve(new Uint8Array(response.data.buffer))
        return resolve(response)
      })
      .catch((err) => {
        console.log('writeMacro error:')
        dispatch('handleError')
        return reject(err)
      })
    })
  },

  // controlTransferOut
  // Send arbitrary control transfers
  controlTransferOut ({ commit, dispatch }, { device }) {
    let usbDevice = getUsbDevice(device.id)
    if (!usbDevice) return
    console.log('CONTORL TRANSFER OUT')
  },

  // resetTransferPayload
  // Resets state.transferPayload
  resetTransferPayload ({ commit }) {
    commit('transferPayload', DEFAULT_CONTROL_TRANSFER)
  },

  handleError ({ commit }) {
    router.push('/devices')
    commit('notification/add', { message: 'A USB error has occured', context: 'danger', dismissible: true }, { root: true })
  }
}

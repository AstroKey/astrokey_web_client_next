import _ from 'lodash'
// import { REQUEST_DEVICE_FILTERS, READ_MACRO_CONTROL_TRANSFER, WRITE_MACRO_CONTROL_TRANSFER } from './constants'
import { READ_MACRO_CONTROL_TRANSFER, WRITE_MACRO_CONTROL_TRANSFER } from './constants'

// Meh
if (window.chrome && window.chrome.usb) {
  window.navigator.chrome_usb = window.chrome.usb
} else {
  window.navigator.chrome_usb = {
    getDevices () {},
    openDevice () {},
    closeDevice () {}
  }
}

// // // //

// ChromeAppUsbService class definition
// Responsible for managing USB devices
// - requesting permission to pair with devices
// - fetching paired devices
// - writing data to a device
// - reading data from a device
// - write firmware to a device (TODO)
class ChromeAppUsbService {
  // constructor
  // Manages the initial configuration of the class
  constructor (options) {
    this.options = options
    this.devices = [] // TODO - we don't need to maintain this.devices

    // WebUSB Device 'connect' event handler
    // navigator.usb.addEventListener('connect', (usbConnectionEvent) => {
    //   this.addDevice(usbConnectionEvent.device)
    // })

    // WebUSB Device 'disconnect' event handler
    // navigator.usb.addEventListener('disconnect', (usbConnectionEvent) => {
    //   this.removeDevice(usbConnectionEvent.device)
    // })

    // Performs initial fetch of devices
    // this.getDevices()

    return this
  }

  // addDevice
  // Adds a device to this.devices
  addDevice (usbDeviceInstance) {
    // TODO - Devices must maintain a unique attribute that can be
    // reliably used to single out a specific device
    console.log(usbDeviceInstance)
    this.devices.push(usbDeviceInstance)
    return usbDeviceInstance
  }

  // removeDevice
  // Adds a device to this.devices
  removeDevice (usbDeviceInstance) {
    console.log('REMOVING DEVICE')
    console.log(usbDeviceInstance)
    return usbDeviceInstance
  }

  // openDevice
  // Opens a single device
  openDevice (serialNumber) {
    let device = _.find(this.devices, { serialNumber })
    if (!device) return
    return new Promise((resolve, reject) => {
      return navigator.chrome_usb.openDevice(device, (e) => {
        return resolve(device)
      })
    })
  }

  // closeDevice
  // Closes a single device
  closeDevice (device) {
    return new Promise((resolve, reject) => {
      return navigator.chrome_usb.closeDevice(device, (e) => {
        return resolve(device)
      })
    })
  }

  // getDevices
  // Invokes navigator.chrome_usb.getDevices()
  // Used to populate state.collection with an array of paired devices
  getDevices () {
    return new Promise((resolve, reject) => {
      // { filters: REQUEST_DEVICE_FILTERS }
      return navigator.chrome_usb.getDevices({ }, (deviceArray) => {
        _.each(deviceArray, (d) => { this.addDevice(d) })
        return resolve(this.devices)
      })
    })
  }

  // readMacro
  // Reads a raw macro from an opened device
  readMacro ({ commit }, deviceInstance, keyIndex) {
    console.log(deviceInstance)
    console.log(keyIndex)

    // keyIndex in hex: `0x0000`
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      // Clones the READ_MACRO_CONTROL_TRANSFER request object
      // And adds custom `value` attribute to handle the index of the key we're reading from
      let READ_MACRO_OPTIONS = _.clone(READ_MACRO_CONTROL_TRANSFER)
      READ_MACRO_OPTIONS.value = keyIndex

      // NOTE - `device.controlTransferIn` READS DATA FROM DEVICE
      // TODO - '256' should be '128'
      // TODO - `256` should be moved into constants.js
      // QUESTION - what is this `256` again, expected return length?
      return deviceInstance.controlTransferIn(READ_MACRO_OPTIONS, 256)
      .then((response) => {
        console.log('readMacro response:')
        console.log(new Uint8Array(response.data.buffer))
        return resolve(new Uint8Array(response.data.buffer))
      })
      .catch((err) => {
        console.log('readMacro error:')
        return reject(err)
      })
    })
  }

  // writeMacro
  // Writes a raw macro to an opened device
  writeMacro ({ commit }, deviceInstance, keyIndex, data) {
    // keyIndex in hex: `0x0000`
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      // Clones the READ_MACRO_CONTROL_TRANSFER request object
      // And adds custom `value` attribute to handle the index of the key we're reading from
      let WRITE_MACRO_OPTIONS = _.clone(WRITE_MACRO_CONTROL_TRANSFER)
      WRITE_MACRO_OPTIONS.value = keyIndex

      // NOTE - `device.controlTransferOut` WRITES DATA TO DEVICE
      return deviceInstance.controlTransferOut(WRITE_MACRO_OPTIONS, new Uint8Array(data).buffer)
      .then((response) => {
        console.log('writeMacro response:')
        console.log(response)
        // return resolve(new Uint8Array(response.data.buffer))
        return resolve(response)
      })
      .catch((err) => {
        console.log('writeMacro error:')
        return reject(err)
      })
    })
  }
}

// // // //

export default new ChromeAppUsbService()

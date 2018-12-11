import _ from 'lodash'
// import { REQUEST_DEVICE_FILTERS, READ_MACRO_CONTROL_TRANSFER, WRITE_MACRO_CONTROL_TRANSFER } from './constants'
import { SERIAL_NUMBER, GET_DEVICE_OPTIONS, READ_MACRO_CONTROL_TRANSFER, WRITE_MACRO_CONTROL_TRANSFER } from './constants'

// // // //

const handleError = () => {
  if (window.chrome.runtime.lastError) {
    // console.log('CAPTURED LAST ERROR: ', window.chrome.runtime.lastError.message)
  }
}

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
    // console.log(usbDeviceInstance)

    let devicePresent = false
    this.devices = _.map(this.devices, (d) => {
      // TODO - constantize 'serialNumber'
      if (d[SERIAL_NUMBER] === usbDeviceInstance[SERIAL_NUMBER]) {
        devicePresent = true
        return usbDeviceInstance
      } else {
        return d
      }
    })

    if (!devicePresent) {
      this.devices.push(usbDeviceInstance)
    }

    return usbDeviceInstance
  }

  // removeDevice
  // Adds a device to this.devices
  removeDevice (usbDeviceInstance) {
    // console.log('REMOVING DEVICE')
    // console.log(usbDeviceInstance)
    return usbDeviceInstance
  }

  // openDevice
  // Opens a single device
  openDevice ({ device }) {
    handleError()

    let deviceInstance = _.find(this.devices, { serialNumber: device[SERIAL_NUMBER] })
    if (!deviceInstance) return
    return new Promise((resolve, reject) => {
      return window.chrome.usb.openDevice(deviceInstance, (connectionHandle) => {
        // console.log('OPENED')
        // console.log('device', device)
        // console.log('connectionHandle', connectionHandle)

        // Updates deviceInstance with `opened` and `connectionHandle`
        deviceInstance.opened = true
        deviceInstance.connectionHandle = connectionHandle

        // Re-adds the device to this.devices
        this.addDevice(deviceInstance)

        // Resovles with
        if (!connectionHandle) { return reject(false) }
        return resolve(deviceInstance)
      })
    })
  }

  // closeDevice
  // Closes a single device
  closeDevice (device) {
    return new Promise((resolve, reject) => {
      return window.chrome.usb.closeDevice(device, (e) => {
        if (!e) { return reject(false) }
        return resolve(device)
      })
    })
  }

  // getDevices
  // Invokes window.chrome.usb.getDevices()
  // Used to populate state.collection with an array of paired devices
  getDevices () {
    handleError()

    return new Promise((resolve, reject) => {
      return window.chrome.usb.getDevices(GET_DEVICE_OPTIONS, (deviceArray) => {
        _.each(deviceArray, (d) => {
          this.addDevice(d)
        })
        if (!deviceArray) { return reject(false) }
        return resolve(this.devices)
      })
    })
  }

  // readMacro
  // Reads a raw macro from an opened device
  // TODO - this should open and close the device each time it's invoked.
  readMacro ({ device, key }) {
    handleError()

    // Isolates the deviceInstance from this.devices
    // TODO - handle error if deviceInstance is not defined?
    const deviceInstance = _.find(this.devices, { serialNumber: device[SERIAL_NUMBER] })

    // keyIndex in hex: `0x0000`
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      // Clones the READ_MACRO_CONTROL_TRANSFER request object
      // And adds custom `value` attribute to handle the index of the key we're reading from
      let READ_MACRO_OPTIONS = _.clone(READ_MACRO_CONTROL_TRANSFER)
      READ_MACRO_OPTIONS.value = key.order

      // NOTE - `device.controlTransferIn` READS DATA FROM DEVICE
      window.chrome.usb.controlTransfer(deviceInstance.connectionHandle, READ_MACRO_OPTIONS, (response) => {
        // console.log('readMacro response:')
        // console.log(response)
        // TODO - handle response code -> 1 == success, else == error
        // console.log(new Uint8Array(response.data))
        if (response) {
          return resolve(new Uint8Array(response.data))
        }
        return reject(false)
      })
      // .catch((err) => {
      //   console.log('readMacro error:')
      //   return reject(err)
      // })
    })
  }

  // writeMacro
  // Writes a raw macro to an opened device
  // TODO - this should open and close the device each time it's invoked
  writeMacro ({ device, key, data }) {
    handleError()

    // Isolates the deviceInstance from this.devices
    // TODO - handle error if deviceInstance is not defined?
    const deviceInstance = _.find(this.devices, { serialNumber: device[SERIAL_NUMBER] })

    // keyIndex in hex: `0x0000`
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      // Clones the READ_MACRO_CONTROL_TRANSFER request object
      // And adds custom `value` attribute to handle the index of the key we're reading from
      let WRITE_MACRO_OPTIONS = _.clone(WRITE_MACRO_CONTROL_TRANSFER)
      WRITE_MACRO_OPTIONS.value = key.order
      WRITE_MACRO_OPTIONS.data = new Uint8Array(data).buffer

      // NOTE - `device.controlTransferOut` WRITES DATA TO DEVICE
      // return deviceInstance.controlTransferOut(WRITE_MACRO_OPTIONS, new Uint8Array(data).buffer)
      return window.chrome.usb.controlTransfer(deviceInstance.connectionHandle, WRITE_MACRO_OPTIONS, (response) => {
        // console.log('writeMacro response:')
        // console.log(response)
        // TODO - handle response code -> 1 == success, else == error
        // return resolve(new Uint8Array(response.data.buffer))
        if (response) {
          return resolve(response)
        }
        return reject(false)
      })
      // TODO - integrate error handling
      // .catch((err) => {
      //   console.log('writeMacro error:')
      //   return reject(err)
      // })
    })
  }
}

// // // //

export default new ChromeAppUsbService()

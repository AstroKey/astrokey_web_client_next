import ChromeWebUsbService from './chrome_web_usb_service'
import FirefoxWebUSBService from './firefox_web_usb_service'

// Handles Chrome & Firefox WebUSB service classes
let WebUsbService
if (window.chrome) {
  WebUsbService = new ChromeWebUsbService()
} else {
  WebUsbService = new FirefoxWebUSBService()
}

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {

  // Invoked with:
  // store.dispatch('usb/requestDevices')
  requestDevices: ({ commit }) => WebUsbService.requestDevices({ commit }),

  // Invoked with:
  // store.dispatch('usb/getDevices')
  getDevices: ({ commit }) => WebUsbService.getDevices({ commit }),

  // Invoked with:
  // store.dispatch('usb/openDevice', { device: UsbDevice })
  openDevice: ({ commit }, { device }) => WebUsbService.openDevice({ commit }, device),

  // Invoked with:
  // store.dispatch('usb/closeDevice', { device: UsbDevice })
  closeDevice: ({ commit }, { device }) => WebUsbService.closeDevice({ commit }, device),

  // Invoked with:
  // store.dispatch('usb/readMacro', { device: UsbDevice, key: 0x0000 })
  readMacro: ({ commit }, { device, key }) => WebUsbService.readMacro({ commit }, device, key),

  // Invoked with:
  // store.dispatch('usb/writeMacro', { device: UsbDevice, key: 0x0000, data: [ 1, 2, ... ] })
  writeMacro: ({ commit }, { device, key, data }) => WebUsbService.writeMacro({ commit }, device, key, data)
}

// // // //

export default actions

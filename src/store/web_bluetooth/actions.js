import ChromeWebBluetoothService from './chrome_web_bluetooth_service'

export default {

  // Invoked with:
  // store.dispatch('web_bluetooth/requestDevices')
  requestDevices: ({ commit }) => ChromeWebBluetoothService.requestDevices({ commit }),

  // Invoked with:
  // store.dispatch('web_bluetooth/getDevices')
  getDevices: ({ commit }) => ChromeWebBluetoothService.getDevices({ commit }),

  // Invoked with:
  // store.dispatch('web_bluetooth/openDevice', { device: UsbDevice })
  openDevice: ({ commit }, { device }) => ChromeWebBluetoothService.connect({ commit }, device),

  // Invoked with:
  // store.dispatch('web_bluetooth/closeDevice', { device: UsbDevice })
  closeDevice: ({ commit }, { device }) => ChromeWebBluetoothService.disconnect({ commit }, device),

  // Invoked with:
  // store.dispatch('web_bluetooth/write', { characteristic: BluetoothRemoteGATTCharacteristic, packet: [ 1, 2, ... ] })
  write: ({ commit }, { characteristic, packet }) => ChromeWebBluetoothService.write({ commit }, characteristic, packet)
}

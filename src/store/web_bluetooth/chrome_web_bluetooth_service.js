import _ from 'lodash'
import { REQUEST_DEVICE_OPTIONS, PRIMARY_SERVICE_UUID } from './constants'
let WebBluetoothDevices = require('./WebBluetoothDevices')

// // // //

// Integrate auto-reconnection
// https://googlechrome.github.io/samples/web-bluetooth/automatic-reconnect.html

// ChromeWebBluetoothService class definition
// Responsible for managing USB devices
// - requesting permission to pair with devices
// - fetching paired devices/
// - writing data to a device
// - reading data from a device
// - write firmware to a device (TODO)
class ChromeWebBluetoothService {
  // constructor
  // TODO - is this needed?
  constructor (options) {
    // this.options = options
    // this.messages = options.messages // TODO - support default messages
    // this.API_ROOT = options.API_ROOT
    return this
  }

  // updateDevice
  // This is used to update the master record of the device with
  // the latest data that was fetched asynchronously
  // TODO - figure out whether or not this is _actually_ needed
  updateDevice ({ commit }, options) {
    console.log(options)
    console.log(options.instance.id)
    console.log(WebBluetoothDevices)
    options.instance = _.find(WebBluetoothDevices, { id: options.instance.id })
    return commit('add', options)
  }

  // onDisconnected
  // Invoked after a device is unexpectedly disconnected
  // TODO - this _should_ do an auto-reconnect (maybe rename to autoReconnect)
  onDisconnected ({ commit }, event) {
    console.log('onDisconnected')
    // console.log(event)
    // console.log(event.target)
    return this.updateDevice({ commit }, { instance: event.target, loading: false })
  }

  // connect
  // Invokes BluetoothRemoteGATTServer.open() method
  // Opens a single device
  connect ({ commit }, deviceInstance) {
    return new Promise((resolve, reject) => {
      // Sets loading
      this.updateDevice({ commit }, { instance: deviceInstance, loading: true })
      // console.log(deviceInstance.id)
      deviceInstance = _.find(WebBluetoothDevices, { id: deviceInstance.id })

      return deviceInstance.gatt.connect()
      .then((g) => {
        // Sets loading
        // this.updateDevice({ commit }, { loading: true })
        // Sets up disconnection listener
        deviceInstance.ongattserverdisconnected = (e) => this.onDisconnected({ commit }, e)

        // TODO - do we want to manage configuration selection in a separate method?
        // TODO - we SHOULD manage this in a separate method
        deviceInstance.gatt.getPrimaryService(PRIMARY_SERVICE_UUID)
        .then((gattService) => {
          console.log('GOT PRIMARY SERVICE')
          console.log(gattService)
          // Invokes BluetoothRemoteGATTService.getCharacteristics()
          gattService.getCharacteristics()
          .then((characteristics) => {
            console.log(characteristics)
            // Refreshes device list
            return resolve(this.updateDevice({ commit }, { instance: deviceInstance, primary_service: gattService, characteristics: characteristics }))
          })
        })
      })
      .catch((err) => {
        console.log('ERR - BluetoothRemoteGATTServer.open() failure')
        // throw err
        return reject(err)
      })
    })
  }

  // disconnect
  // Invokes BluetoothRemoteGATTServer.disconnect() method
  // Closes a single device
  disconnect ({ commit }, deviceInstance) {
    deviceInstance.gatt.disconnect()
    return this.updateDevice({ commit }, { instance: deviceInstance })
  }

  // write
  // Invokes BluetoothRemoteGATTService.writeValue()
  write ({ commit }, gattService, packet) {
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      return gattService.writeValue(packet)
      .then((device) => {
        console.log('WROTE TO DEVICE')
        // commit('collection', [device])
        return resolve(true)
      })
      .catch((err) => {
        console.log('ERR - BluetoothRemoteGATTService.write()')
        // throw err
        return reject(err)
      })
    })
  }

  // // // //
  // // // //

  // // Builds packets
  // let keydownPacket = [3,0,0,0,0,0,0,4] // 'a'
  // // let keydownPacket = [3,0,0,0,0,0,2,4] // 'A'
  // let keyupPacket = [3,0,0,0,0,0,0,0]

  // // Writes packets
  // let downPacket = new Uint8Array(keydownPacket).buffer
  // let upPacket = new Uint8Array(keyupPacket).buffer

  // primary.writeValue(downPacket).then((resp) => {
  //   console.log('WROTE')
  //   console.log(resp)

  //   packet = new Uint8Array(keydownPacket).buffer

  //   primary.writeValue(upPacket).then((resp) => {
  //     console.log('WROTE AGAIN')
  //     console.log(resp)
  //   })

  // })

  // // // //
  // // // //

  // requestDevices
  // Invokes navigator.bluetooth.requestDevice()
  // Used to find available devices that may not have already been paired
  requestDevices ({ commit }) {
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      return navigator.bluetooth.requestDevice(REQUEST_DEVICE_OPTIONS)
      .then((device) => {
        WebBluetoothDevices.push(device)
        commit('collection', [device])
        return resolve(true)
      })
      .catch((err) => {
        console.log('ERR - navigator.bluetooth.requestDevice()')
        // throw err
        return reject(err)
      })
    })
  }
}

// // // //

// TODO - this should export the constructor, rather than an instance
export default new ChromeWebBluetoothService()

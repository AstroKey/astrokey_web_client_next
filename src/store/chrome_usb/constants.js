export const SERIAL_NUMBER = 'serialNumber'

export const GET_DEVICE_OPTIONS = {
  vendorId: 4292
}

export const READ_MACRO_CONTROL_TRANSFER = {
  'direction': 'in',
  'requestType': 'vendor',
  'recipient': 'device',
  'request': 0x03,
  'index': 0x02,
  'length': 256
  // 'value': 0,
  // 'length': 128
  // TODO - '256' should be '128'
  // TODO - `256` should be moved into constants.js
  // QUESTION - what is this `256` again, expected return length?
}

export const WRITE_MACRO_CONTROL_TRANSFER = {
  'direction': 'out',
  'requestType': 'vendor',
  'recipient': 'device',
  'request': 0x03, // TODO - document (B-REQUEST)
  // 'value': keyIndex, // NOTE - `value` attribute is assigned in the ChromeWebUSBService.writeMacro() method
  'index': 0x01 // TODO - We can use index for the key the macro corresponds to (low-byte = key, high-byte = number of actions in the macro)
}

export const KEY_IDS = [
  0x00,
  0x01,
  0x02,
  0x03,
  0x04
]

export const REQUEST_DEVICE_FILTERS = [
  { vendorId: 0x10c4 }
]

export const READ_MACRO_CONTROL_TRANSFER = {
  'requestType': 'vendor',
  'recipient': 'device',
  'request': 0x03,
  // 'value': keyIndex, // NOTE - `value` attribute is assigned in the ChromeWebUSBService.readMacro() method
  'index': 0x02
}

// wIndex - Request type (0x01 for set macro)
// wValue - Macro index (0 - 4 inclusive)
// bRequest - 3 (hardcoded)
// wLength - number of bytes (should be macro length * 2)
export const WRITE_MACRO_CONTROL_TRANSFER = {
  'requestType': 'vendor',
  'recipient': 'device',
  'request': 0x03, // TODO - document (B-REQUEST)
  // 'value': keyIndex, // NOTE - `value` attribute is assigned in the ChromeWebUSBService.writeMacro() method
  'index': 0x01 // TODO - We can use index for the key the macro corresponds to (low-byte = key, high-byte = number of actions in the macro)
}

// Default control transfer object
export const DEFAULT_CONTROL_TRANSFER = {
  'requestType': 'vendor',
  'recipient': 'device',
  'request': 0x03,
  'value': 0x0004,
  'index': 0x01
}

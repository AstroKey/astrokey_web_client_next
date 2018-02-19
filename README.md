# astrokey_web_client_next
AstroKey Web Client Application in VueJS


## Linux UDEV Rule
/etc/udev/rules.d/astrokey.rules

```
SUBSYSTEMS=="usb", ATTR{idVendor}=="10c4", ATTR{idProduct}=="fe02", MODE:="0666"

```

(make sure there's a newline at the EOF)


Working Chrome.USB - READ_MACRO
```
chrome.usb.getDevices({ }, (devs) => {
  window.devs = devs
})

chrome.usb.openDevice(devs[0], (e) => { window.chandle = e })

READ_MACRO = {
  'direction': 'in',
  'requestType': 'vendor',
  'recipient': 'device',
  'request': 0x03,
  'value': 0,
  'index': 0x02,
  'length': 128
}

chrome.usb.controlTransfer(chandle, READ_MACRO, (resp) => {
  console.log(resp)
  window.resp = resp
})
```

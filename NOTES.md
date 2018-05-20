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

###
NodeWebkit / NWBuilder docs - add npm task..
Options:
  -p, --platforms      Platforms to build, comma-sperated, can be: win32,win64,osx32,osx64,linux32,linux64   ['osx64', 'win32', 'win64']
  -v, --version        The nw version, eg. 0.8.4                                             [default: "latest"]
  -r, --run            Runs NW.js for the current platform                                   [default: false]
  -o, --buildDir       The build folder                                                      [default: "./build"]
  -f, --forceDownload  Force download of NW.js                                               [default: false]
  --cacheDir           The cache folder
  --quiet              Disables logging                                                      [default: false]


nwbuild -p win32,win64,osx32,osx64,linux32,linux64 -v latest ./dist
nwbuild -p linux64 -v latest ./dist

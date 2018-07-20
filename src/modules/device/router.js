// Device Containers
import DeviceList from './views/device_list'
import DeviceShow from './views/device_show'
import DeviceInterface from './views/device_interface'

const DeviceListRoute = {
  path: '/devices',
  component: DeviceList,
  props: true
}

const DeviceShowRoute = {
  path: '/devices/developer',
  component: DeviceShow
}

const DeviceInterfaceRoute = {
  path: '/devices/interface',
  component: DeviceInterface
}

export default [
  DeviceListRoute,
  DeviceShowRoute,
  DeviceInterfaceRoute
]

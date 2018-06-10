// Device Containers
import DeviceList from '@/containers/device_list'
import DeviceShow from '@/containers/device_show'
import DeviceInterface from '@/containers/device_interface'

export const DeviceListRoute = {
  path: '/devices',
  component: DeviceList,
  props: true
}

export const DeviceShowRoute = {
  path: '/devices/developer',
  component: DeviceShow
}

export const DeviceInterfaceRoute = {
  path: '/devices/interface',
  component: DeviceInterface
}

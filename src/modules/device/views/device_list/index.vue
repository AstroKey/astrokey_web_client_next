<!-- CAN'T USE SERIALNUMBER, PRODUCTNAME, MANUFACTURER NAME -->
<template>
  <div class="container-fluid">

    <PageHeader title="Devices" />
    <DeviceList />

    <!-- TODO - maybe pull these out into a separate component... -->
    <div class="row mt-4">
      <div class="col-lg-12">
        <button class='btn btn-light btn-block' @click="requestDevices">
          <i class="fa fa-fw fa-usb mr-1"></i>
          Pair WebUSB Devices
        </button>
      </div>
    </div>
      <!-- <div class="col-lg-6"> -->
        <!-- <button class='btn btn-primary btn-block' @click="scanBluetooth"> -->
          <!-- <i class="fa fa-fw fa-bluetooth-b mr-1"></i> -->
          <!-- Pair WebBluetooth Devices -->
        <!-- </button> -->
      <!-- </div> -->

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'
import PageHeader from '@/components/PageHeader'
import DeviceList from './components/DeviceList'

export default {
  metaInfo: {
    title: 'Devices'
  },
  components: {
    PageHeader,
    DeviceList
  },
  created () {
    this.getDevices()
  },
  methods: mapActions({
    requestDevices: 'web_usb/requestDevices',
    getDevices: 'web_usb/getDevices'
    // scanBluetooth: 'web_bluetooth/requestDevices'
  })
}
</script>

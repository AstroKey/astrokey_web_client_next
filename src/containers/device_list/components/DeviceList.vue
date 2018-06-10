<template>
  <div class='row'>

    <DeviceChild v-for="device in collection" :device="device" v-bind:key="device.id" />

    <div class="col-lg-12" v-if="!collection[0]">
      <div class="card card-body text-center bg-dark border-light text-light">
        <p class="lead mb-0">No Devices currently available</p>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import DeviceChild from './DeviceChild'
import { mapGetters } from 'vuex'

export default {
  components: {
    DeviceChild
  },
  computed: mapGetters({
    collection: 'web_usb/collection'
  })
}
</script>

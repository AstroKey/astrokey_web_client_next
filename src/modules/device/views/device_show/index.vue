
<template>
  <div class="container-fluid">

    <PageHeader title="Developer Interface" />

    <div class="row">
      <div class="col-lg-12">

        <OpenDeviceButton :device="device" />
        <CloseDeviceButton :device="device" />

        <div class="card card-body">
          <div class="row">
            <div class="col-lg-12">
              <p class="card-text lead">
                {{ device.productName }}
                <small class='text-muted'>({{device.id}})</small>
              </p>
            </div>
          </div>

          <ControlTransferForm :device="device" />

        </div>
      </div>
    </div>

  </div>

</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import PageHeader from '@/components/PageHeader'
import OpenDeviceButton from '@/components/OpenDeviceButton'
import CloseDeviceButton from '@/components/CloseDeviceButton'
import ControlTransferForm from './components/ControlTransferForm'

// TODO - much of this is repeated from `device_show`
export default {
  metaInfo: {
    title: 'Device - Developer Interface'
  },
  components: {
    PageHeader,
    OpenDeviceButton,
    CloseDeviceButton,
    ControlTransferForm
  },
  created () {
    this.ensureDevice()
  },
  beforeDestroy () {
    this.clearDevice()
  },
  computed: mapGetters({
    device: 'device/selectedDevice'
  }),
  methods: mapActions({
    ensureDevice: 'device/ensureSelectedDevice',
    clearDevice: 'device/clearSelectedDevice'
  })
}
</script>

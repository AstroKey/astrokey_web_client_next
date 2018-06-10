
<template>
  <div class="container-fluid">
    <div class="row h-100">

      <!-- Device Mockup -->
      <div class="col-lg-4 d-flex justify-content-center flex-column align-items-center">
        <DeviceControls :device="device" />
      </div>

      <!-- WelcomeMessage and Workflow -->
      <div class="col-lg-8 selected-key-detail">
        <WelcomeMessage v-if="!selectedKey.id"/>
        <WorkflowControls v-else :device="device" />
      </div>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import DeviceControls from './components/DeviceControls'
import WelcomeMessage from './components/WelcomeMessage'
import WorkflowControls from './components/WorkflowControls'

// TODO - much of this is repeated from `device_show`
export default {
  metaInfo: {
    title: 'Device - Interface'
  },
  components: {
    DeviceControls,
    WelcomeMessage,
    WorkflowControls
  },
  created () {
    this.ensureDevice()
  },
  beforeDestroy () {
    this.clearDevice()
  },
  computed: mapGetters({
    device: 'device/selectedDevice',
    selectedKey: 'device/selectedKey'

  }),
  methods: mapActions({
    ensureDevice: 'device/ensureSelectedDevice',
    clearDevice: 'device/clearSelectedDevice'
  })
}
</script>

<!-- // // // //  -->

<style lang="sass" scoped>
@import '../../sass/vendor.sass'

.selected-key-detail
  border-left: 1px solid theme-color('light')

</style>

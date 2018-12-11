<template>
  <div class="row">
    <div class="col-lg-12">
      <p class="lead">Control Transfer Form</p>
      <pre class="bg-dark text-light">{{transferPayload}}</pre>

      <input class='form-control' type='text' v-model="transferPayload.requestType">
      <input class='form-control' type='text' v-model="transferPayload.request">
      <input class='form-control' type='number' v-model="transferPayload.request">
      <input class='form-control' type='number' v-model="transferPayload.value">
      <input class='form-control' type='number' v-model="transferPayload.index">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ControlTransferForm',
  created () {
    this.resetTransferPayload()
  },
  methods: mapActions({
    controlTransferOut: 'web_usb/controlTransferOut',
    controlTransferIn: 'web_usb/controlTransferIn',
    resetTransferPayload: 'web_usb/resetTransferPayload'
  }),
  computed: mapGetters({
    transferPayload: 'web_usb/transferPayload'
  })
}
</script>

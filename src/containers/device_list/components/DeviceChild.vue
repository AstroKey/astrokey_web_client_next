<!-- CAN'T USE SERIALNUMBER, PRODUCTNAME, MANUFACTURER NAME -->
<template>
  <div class='col-lg-12 mt-2'>
    <div class="card card-body bg-dark border-light text-light">
      <div class="row d-flex align-items-center">

        <div class="col-lg-8">

          <!-- Device URL -->
          <a href @click.prevent="showWorkflowInterface(device)">{{ device.productName }}</a>

          <!-- Device ID -->
          <!-- NOTE - DEBUG ONLY -->
          <small class='text-muted'>({{device.id}})</small>
        </div>

        <div class="col-lg-4 text-right">

          <!-- Developer Interface -->
          <button class="btn btn-sm btn-outline-light" @click="showDeveloperInterface(device)">
            <i class="fa fa-fw fa-code mr-1"></i>
            Developer
          </button>

          <!-- Workflow Interface -->
          <button class="btn btn-sm btn-outline-info" @click="showWorkflowInterface(device)">
            <i class="fa fa-fw fa-cog mr-1"></i>
            Interface
          </button>

          <!-- Loading -->
          <!-- <span class='badge badge-dark' v-if="device.fetching"> -->
            <!-- <i class="p-1 fa fa-spinner fa-spin"></i> -->
          <!-- </span> -->

        </div>

      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['device'],
  methods: mapActions({
    showDeveloperInterface: 'device/showDeveloperInterface',
    showWorkflowInterface: 'device/showWorkflowInterface'
  })
}
</script>

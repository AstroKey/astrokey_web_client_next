<template>
  <div class="row mt-4 align-items-center">
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg-12" v-if="!selectedStep">

          <button class="btn btn-sm btn-outline-light" v-if="!selectedStep" @click="clearSelectedKey">
            <i class="fa fa-fw fa-times mr-1"></i>
            Back
          </button>

          <button class="btn btn-sm btn-outline-success mr-2" @click="writeSelectedKey">
            <i class="fa fa-fw fa-save mr-1"></i>
            Save Workflow
          </button>
        </div>
        <div class="col-lg-12">
          <WorkflowEditor :workflow="selectedKeyWorkflow" />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import WorkflowEditor from '../../workflow_edit/components/layout.vue'

export default {
  props: ['device'],
  components: {
    WorkflowEditor
  },
  computed: mapGetters({
    selectedKeyWorkflow: 'device/selectedKeyWorkflow',
    selectedStep: 'workflow/selectedStep'
  }),
  methods: mapActions({
    clearSelectedKey: 'device/clearSelectedKey',
    writeSelectedKey: 'device/writeSelectedKey'
  })
}
</script>

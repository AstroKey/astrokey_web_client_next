
<template>
  <div class="container-fluid">
    <a href="#/workflows">Back</a>
    <h2>{{workflow.label}}</h2>
    <hr>

    <div class="row">
      <div class="col-lg-12">
        <WorkflowViewer :workflow="workflow" />
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import WorkflowViewer from '@/modules/workflow/components/WorkflowViewer'

export default {
  props: ['id'],
  metaInfo: {
    title: 'Workflow - Show'
  },
  components: {
    WorkflowViewer
  },
  computed: {
    workflow () {
      let workflows = this.$store.getters['workflow/collection']
      return _.find(workflows, { _id: this.id })
    }
  }
}
</script>



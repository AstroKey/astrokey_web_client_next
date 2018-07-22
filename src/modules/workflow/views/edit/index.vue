
<template>
  <div class="container mt-4 pt-4">
    <WorkflowForm :workflow="workflow"/>
  </div>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import WorkflowForm from '@/modules/workflow/components/WorkflowForm'

export default {
  props: ['id'],
  components: {
    WorkflowForm
  },
  metaInfo: {
    title: 'Workflow - Edit'
  },
  computed: {
    workflow () {
      let workflows = this.$store.getters['workflow/collection']
      return _.find(workflows, { _id: this.id })
    }
  }
}
</script>



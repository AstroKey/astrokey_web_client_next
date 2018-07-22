
<template>
  <div class="container-fluid">
    <PageHeader title="New Workflow" />

    <div class="row">
      <div class="col-lg-12">
        <WorkflowForm :workflow="workflow" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageHeader from '@/components/PageHeader'
import WorkflowForm from '../../components/WorkflowForm'

export default {
  name: 'WorkflowNew',
  metaInfo: {
    title: 'Workflow - New'
  },
  components: {
    PageHeader,
    WorkflowForm
  },
  created () {
    this.resetNew()
  },
  methods: mapActions({
    resetNew: 'workflow/reset_new_workflow'
  }),
  computed: mapGetters({
    workflow: 'workflow/newModel'
  })
}
</script>



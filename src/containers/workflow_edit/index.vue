
<template>
  <div class="container mt-4 pt-4">
    <LayoutView :workflow="workflow"/>
  </div>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
import LayoutView from './components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Workflow - Edit' // title is now "AstroKey - Workflow - Edit"
  },
  props: ['id'],
  computed: {
    workflow () {
      let workflows = store.getters['workflow/collection']
      return _.find(workflows, { _id: this.id })
    }
  }
}
</script>



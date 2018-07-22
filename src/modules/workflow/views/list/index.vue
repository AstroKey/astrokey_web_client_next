
<template>
  <div class="container-fluid">
    <h2>Workflows</h2>
    <hr>

    <div class='row'>
      <div v-for="workflow in collection" v-bind:key="workflow.serialNumber" class='col-lg-12 mt-2'>
        <div class="card card-body">
          <div class="row">

            <div class="col-lg-8">
              <!-- workflow URL -->
              <a v-bind:href="'#/workflows/' + workflow._id">{{workflow.label}}</a>
            </div>

            <div class="col-lg-4 text-right">
              <!-- Open workflow -->
              <a class='btn btn-sm btn-outline-light' v-bind:href="'#/workflows/' + workflow._id + '/edit'">
                <i class="fa fa-pencil mr-1"></i>
                Edit
              </a>

            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-lg-12">
        <a class="btn btn-block btn-outline-success" href="#/workflows/new">
          <i class="fa fa-fw fa-plus mr-2"></i>
          New Workflow
        </a>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'

export default {
  metaInfo: {
    title: 'Workflows'
  },
  computed: mapGetters({
    collection: 'workflow/collection'
  })
}
</script>

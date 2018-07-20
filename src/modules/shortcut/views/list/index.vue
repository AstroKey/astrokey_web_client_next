
<template>
  <div class="container-fluid">
    <h2>Shortcuts</h2>
    <hr>

    <div class='row'>
      <div v-for="shortcut in collection" v-bind:key="shortcut.serialNumber" class='col-lg-12 mt-2'>
        <div class="card card-body">
          <div class="row">

            <div class="col-lg-8">
              <!-- shortcut URL -->
              <a v-bind:href="'#/shortcuts/' + shortcut._id">{{shortcut.label}}</a>
            </div>

            <div class="col-lg-4 text-right">
              <!-- Open shortcut -->
              <a class='btn btn-sm btn-outline-light' v-bind:href="'#/shortcuts/' + shortcut._id + '/edit'">
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
        <a class="btn btn-block btn-outline-success" href="#/shortcuts/new">
          <i class="fa fa-fw fa-plus mr-2"></i>
          New Shortcut
        </a>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShortcutList',
  metaInfo: {
    title: 'Shortcuts'
  },
  computed: mapGetters({
    collection: 'shortcut/collection'
  })
}
</script>

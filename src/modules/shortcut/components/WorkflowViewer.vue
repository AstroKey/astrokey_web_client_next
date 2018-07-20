<template>
  <div class="card card-body">
    <div class="row">
      <div class="col-lg-8">
        <p class="card-text lead">Workflow</p>
      </div>
      <div class="col-lg-4 text-right">
        <!-- <a class="btn btn-sm btn-outline-warning mr-2" v-bind:href="'#/workflows/' + workflow._id + '/edit'"><i class="fa fa-fw fa-pencil"></i></a> -->
        <!-- <button class="btn btn-sm btn-outline-secondary mr-2"><i class="fa fa-fw fa-clone"></i></button> -->
        <!-- <button class="btn btn-sm btn-outline-danger"><i class="fa fa-fw fa-trash"></i></button> -->
      </div>
      <div class="col-lg-12">
        <!-- <pre class="bg-dark text-light">{{ workflow }}</pre> -->
        <ul class="list-group">
          <li class='list-group-item' v-for="step in workflow.steps" :key="step.id">
            <i class="'fa ' + step.icon "></i>
            {{ step.type }}
            |||
            {{ step.value || 'N/A' }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkflowViewer',
  props: ['workflow']
}
</script>

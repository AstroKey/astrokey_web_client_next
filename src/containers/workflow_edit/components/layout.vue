
<template>
  <div class="row">
    <div class="col-lg-12">

      <!-- Editor Card Header -->
      <div class="row mb-4">
        <!-- <p class="card-text lead" v-if="editing">Edit Step</p> -->
        <!-- <p class="card-text lead" v-if="!editing">Edit Workflow</p> -->

        <!-- <div class="col-lg-12" v-if="!editing"> -->
          <!-- <button class="btn btn-sm btn-outline-light" v-if="!editing"> -->
            <!-- <i class="fa fa-fw fa-times mr-1"></i> -->
            <!-- Back -->
          <!-- </button> -->

          <!-- <button class="btn btn-sm btn-outline-success mr-2" v-if="!editing"> -->
            <!-- <i class="fa fa-fw fa-save mr-1"></i> -->
            <!-- Save -->
          <!-- </button> -->
        <!-- </div> -->

        <!-- Macro Editor Controls -->
        <div class="col-lg-12 justify-content-center d-flex" v-if="editing">

          <button class="btn btn-sm btn-outline-secondary mx-2 px-4" @click="clearSelected()">
            <i class="fa fa-fw fa-2x mx-4 fa-angle-left"></i>
          </button>

          <button class="btn btn-sm btn-outline-success mx-2 px-4" @click="updateSelected(editing)">
            <i class="fa fa-fw fa-2x mx-4 fa-check-circle-o"></i>
          </button>

          <!-- <button  class="btn btn-sm btn-outline-light mx-2 px-4"><i class="fa fa-fw fa-2x mx-4 fa-save"></i></button> -->
          <!-- <button  class="btn btn-sm btn-outline-info mx-2 px-4"><i class="fa fa-fw fa-2x mx-4 fa-folder-open-o"></i></button> -->
          <button  class="btn btn-sm btn-outline-warning mx-2 px-4" v-if="editing.type === 'MACRO'" @click="clearSelectedMacro()">
            <i class="fa fa-fw fa-2x mx-4 fa-times"></i>
          </button>

          <button  class="btn btn-sm btn-outline-danger mx-2 px-4" @click="startRecording()" v-if="editing.type == 'MACRO' && !recording">
            <i class="fa fa-fw fa-2x mx-4 fa-circle"></i>
          </button>

          <button  class="btn btn-sm btn-outline-danger mx-2 px-4" @click="stopRecording()" v-if="editing.type == 'MACRO' && recording">
            <i class="fa fa-fw fa-2x mx-4 fa-circle-o-notch fa-spin"></i>
          </button>

        </div>
      </div>

      <!-- Editor Card Body -->
      <div class="row">

        <!-- Workflow Step Editor -->
        <div class="col-lg-12" v-if="editing">

          <!-- MACRO Editor -->
          <MacroEditor :editing="editing" v-if="editing.type === 'MACRO'"/>

          <!-- TEXT Editor -->
          <div class="row" v-if="editing.type === 'TEXT'">
            <div class="col-lg-12">
              <p class="lead mb-0">TEXT: {{ editing.value }}</p>
              <small>TODO - this should be integrated into the WorkflowItem View</small>
              <input class="form-control" type='text' :value="editing.value" @input="editing.value = $event.target.value"></input>
            </div>
          </div>

          <!-- DELAY Editor -->
          <!-- TODO - build DELAY Editor into WorkflowStepChild -->
          <div class="row" v-if="editing.type === 'DELAY'">
            <div class="col-lg-12">
              <p class="lead mb-0">DELAY: {{editing.value * 10}} ms</p>
              <small>TODO - this should be integrated into the WorkflowItem View</small>
              <input class="form-control" type='number' min="0" max="255" step="1" :value="editing.value" @input="editing.value = $event.target.value"></input>
            </div>
          </div>

        </div>

        <!-- Workflow Editor -->
        <div class="col-lg-12" v-if="!editing">
          <ul class="list-group">
            <WorkFlowItem :item="{ type: 'KEY_DOWN', label: 'Start' }" :remove="removeStep" :edit="editStep"/>
            <draggable v-model='steps' :options="sortableOptions">
              <WorkFlowItem v-for="each in steps" :item="each" :key="each.id" :remove="removeStep" :edit="editStep" :clone="cloneStep"/>
            </draggable>
            <WorkFlowItem :item="{ type: 'FINISH', label: 'Finish' }" :remove="removeStep" :edit="editStep" />
          </ul>
        </div>

        <!-- HR Break -->
        <div class="col-lg-12 mt-2" v-if="!editing">
          <hr>
        </div>

        <!-- Editor Card Footer -->
        <div class="col-lg-12 mt-2">

          <!-- Workflow Editor Controls -->
          <div class="btn-group w-100 justify-content-center" v-if="!editing">
            <button class="btn btn-outline-light w-25" @click="addStep('TEXT')">TEXT</button>
            <button class="btn btn-outline-light w-25" @click="addStep('MACRO')">MACRO</button>
            <button class="btn btn-outline-light w-25" @click="addStep('DELAY')">DELAY</button>
            <!-- <button class="btn btn-outline-light w-25" @click="addStep('KEY')">KEY</button> -->
            <button class="btn btn-outline-light w-25" @click="addStep('KEYUP')">KEYUP</button>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
import draggable from 'vuedraggable'
import WorkFlowItem from './workflow_item'
import MacroEditor from './macro_editor'

export default {
  props: ['workflow'],
  components: {
    draggable,
    WorkFlowItem,
    MacroEditor
  },
  methods: {
    addStep (type) {
      store.commit('workflow/addStep', { workflow: this.workflow, step_type: type })
    },
    cloneStep (step) {
      store.commit('workflow/cloneStep', { workflow: this.workflow, step: step })
    },
    removeStep (step) {
      store.commit('workflow/removeStep', { workflow: this.workflow, step: step })
    },
    editStep (step) {
      store.commit('workflow/selectStep', { step })
    },
    clearSelected () {
      store.commit('workflow/clearSelectedStep')
    },
    updateSelected (step) {
      store.commit('workflow/updateSelectedStep', { workflow: this.workflow, step: step })
    },
    cycleMacroKeyPosition (macroStep) {
      store.commit('workflow/cycleMacroStepPosition', { macroStep: macroStep })
    },
    startRecording () {
      store.commit('workflow/startRecording')
    },
    stopRecording () {
      store.commit('workflow/stopRecording')
    },
    clearSelectedMacro () {
      store.commit('workflow/clearMacro')
    }
  },
  computed: {
    recording () {
      return store.getters['workflow/recording']
    },
    sortableOptions () {
      return {
        draggable: '.draggable',
        animation: 150,
        fallbackTolerance: 100
      }
    },
    editing () {
      return store.getters['workflow/selectedStep']
    },
    steps: {
      get () {
        if (!this.workflow) return []
        // TODO - this should be moved into Vuex store
        this.workflow.steps = _.orderBy(this.workflow.steps, ['order'], ['asc'])
        return this.workflow.steps
      },
      set (value) {
        _.each(value, (s, i) => { s.order = i })
      }
    }
  }
}
</script>

<style lang='sass' scoped>
</style>

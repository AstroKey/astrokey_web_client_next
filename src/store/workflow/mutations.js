import _ from 'lodash'
import store from '@/store'
import { KEYS } from './keys'
import { TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEY_WORKFLOW_STEP, KEYUP_WORKFLOW_STEP, KEY_DN_POSITION, KEY_UP_POSITION, KEY_PR_POSITION } from './constants'

// // // //

// Stops Keyboard recording after a predetermined timeout
const debounceStopRecording = _.debounce(() => {
  store.commit('workflow/stopRecording')
}, 1500)

function onKeyAction (event) {
  // Prevents default behavior
  event.preventDefault()

  // Finds the pressed key
  let key = _.clone(_.find(KEYS, { keycode: event.which }))
  if (!key) return

  // Handles KeyDown action
  if (event.type === 'keydown') {
    if (_.indexOf(['Control', 'Meta', 'Alt', 'Shift'], event.key) > -1) {
      key.position = KEY_DN_POSITION
      store.commit('workflow/addRecordedKey', { key })
    } else {
      key.position = KEY_PR_POSITION
      store.commit('workflow/addRecordedKey', { key })
    }
  }

  // Handles KeyUp action
  if (event.type === 'keyup') {
    if (_.indexOf(['Control', 'Meta', 'Alt', 'Shift'], event.key) > -1) {
      key.position = KEY_UP_POSITION
      store.commit('workflow/addRecordedKey', { key })
    }
  }

  // Debounces stopRecoring
  debounceStopRecording()
}

// // // //

// Project Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  sync (state, collection) {
    state.collection = _.sortBy(collection, (s) => { return s.order })
  },
  current (state, attributes) {
    state.current = attributes
  },
  removeStep (state, { workflow, step }) {
    workflow.steps = _.chain(workflow.steps).filter((s) => { return s.id !== step.id }).each((s, i) => { s.order = i }).sortBy('order').value()
  },
  selectStep (state, { step }) {
    state.selectedStep = _.cloneDeep(step)
  },
  clearSelectedStep (state) {
    state.selectedStep = null
  },
  // updateSelectedStep
  // Inserts the updated step into
  // it's correct position in workflow.steps
  updateSelectedStep (state, { workflow, step }) {
    workflow.steps = _.chain(workflow.steps)
      .map((s) => {
        if (s.id !== step.id) {
          return s
        } else {
          return step
        }
      })
      .value()

    // Clears state.selected step
    state.selectedStep = null
  },

  // addStep
  // Adds a new step to the workflow
  addStep (state, { workflow, step_type }) {
    function getStep (type) {
      switch (type) {
        case 'TEXT': // TODO - CONSTANTIZE
          return TEXT_WORKFLOW_STEP
        case 'MACRO': // TODO - CONSTANTIZE
          return MACRO_WORKFLOW_STEP
        case 'DELAY': // TODO - CONSTANTIZE
          return DELAY_WORKFLOW_STEP
        case 'KEY': // TODO - CONSTANTIZE
          return KEY_WORKFLOW_STEP
        case 'KEYUP': // TODO - CONSTANTIZE
          return KEYUP_WORKFLOW_STEP
      }
    }

    let new_step = _.cloneDeep(getStep(step_type))
    new_step.order = workflow.steps.length
    new_step.id = _.uniqueId('st')
    workflow.steps.push(new_step)
  },

  // cloneStep
  // Clones an individual workflow step
  cloneStep (state, { workflow, step }) {
    // Clones the step
    let cloned_step = _.cloneDeep(step)

    // Sets the order & id attributes
    cloned_step.order = workflow.steps.length
    cloned_step.id = _.uniqueId('st')

    // Adds the step to the workflow
    workflow.steps.push(cloned_step)
  },

  // cycleMacroStepPosition
  // Determines next position for an individual macroStep
  cycleMacroStepPosition (state, { macroStep }) {
    function cyclePosition (oldPosition) {
      switch (oldPosition) {
        // KEY_DN_POSITION -> KEY_UP_POSITION
        case KEY_DN_POSITION:
          return KEY_UP_POSITION

        // KEY_UP_POSITION -> KEY_PR_POSITION
        case KEY_UP_POSITION:
          return KEY_PR_POSITION

        // KEY_PR_POSITION -> KEY_DN_POSITION
        case KEY_PR_POSITION:
          return KEY_DN_POSITION
      }
    }
    macroStep.position = cyclePosition(macroStep.position)
  },
  // addMacroKey
  // Adds an additional key to the currently selected macro
  // TODO - move this out of mutations and into actions
  addMacroKey (state, { macro, key }) {
    // Add KEY_DOWN & KEY_UP positions if a modifier key has been added
    if (key.isModifier) {
      // KEY_DOWN Modifier
      let downKey = _.cloneDeep(key)
      downKey.order = macro.value.length
      downKey.position = KEY_DN_POSITION
      downKey.id = _.uniqueId('macrostep_')
      macro.value.push(downKey)

      // KEY_UP Modifier
      let upKey = _.cloneDeep(key)
      upKey.order = macro.value.length + 1
      upKey.position = KEY_UP_POSITION
      upKey.id = _.uniqueId('macrostep_')
      macro.value.push(upKey)
    } else {
      let newKey = _.cloneDeep(key)
      newKey.order = macro.value.length
      newKey.position = KEY_PR_POSITION
      newKey.id = _.uniqueId('macrostep_')
      macro.value.push(newKey)
    }
  },

  // TODO - merge with the above method?
  addRecordedKey (state, { key }) {
    let macro = state.selectedStep
    key.order = macro.value.length
    key.id = _.uniqueId('macrostep_')
    macro.value.push(key)
  },

  // removeMacroStep
  // Removes an individual macro step from currently edited Macro
  removeMacroStep (state, { macro, macroStep }) {
    macro.value = _.filter(macro.value, (s) => { return s.id !== macroStep.id })
  },

  // startRecording
  // Starts recording by listening for global keystroke events
  startRecording (state) {
    state.recording = true
    window.addEventListener('keydown', onKeyAction)
    window.addEventListener('keyup', onKeyAction)
  },

  // stopRecording
  // Stops global keystroke recording
  stopRecording (state) {
    window.removeEventListener('keydown', onKeyAction)
    window.removeEventListener('keyup', onKeyAction)
    state.recording = false
  },

  clearMacro (state) {
    store.commit('workflow/stopRecording')
    state.selectedStep.value = []
  }
}

// // // //

export default mutations

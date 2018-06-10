import _ from 'lodash'
import { KEYS } from './keys'
import { randomId } from './helpers'
import {
  KEY_UP_POSITION,
  KEY_PR_POSITION,
  KEY_DN_POSITION,
  WORKFLOW_STEP_DELAY,
  WORKFLOW_STEP_MACRO,
  WORKFLOW_STEP_KEYUP,
  WORKFLOW_STEP_TEXT,
  TEXT_WORKFLOW_STEP,
  MACRO_WORKFLOW_STEP,
  DELAY_WORKFLOW_STEP,
  KEYUP_WORKFLOW_STEP
} from './constants'

// 1,2,3 - KEY ACTIONS
// 224-254 - Encapsulation delimiters
// 255 - RESERVED - INDICATES END OF MACRO
// const STEP_INITIATOR = 1 // STEP_INITIATOR
const STEP_TERMINATOR = 224 // STEP_TERMINATOR

const DELAY_INITIATOR = 16 // WORKING
const KEYUP_INITIATOR = 128 // TEST KEYUP
const MACRO_INITIATOR = 253 // WORKING
const TEXT_INITIATOR = 254 // WORKING

// WORKFLOW SIZE LIMIT = 4096

// // // //

// TODO - Abstract into WorkflowParser & WorkflowSerializer classes
class WorkflowParser {
  // constructor
  constructor (options) {
    this.options = options
    return this
  }

  // parse
  // Parses a workflow data buffer read from the device into the database-level abstraction
  parse (data) {
    // Stores the parsed workflow
    let workflowSteps = []

    // Compacts the data array
    // QUESTION - will we ever have zeros between each key stroke?
    // Doesn't look like it - but keep it in mind here.
    data = _.compact(data)
    data = _.pull(data, 255)

    // persistWorkflowStep helper function
    // Adds an ID to the currentWorkflow step
    const persistWorkflowStep = (step) => {
      // Isolates the STEP_INITIATOR variable
      let STEP_INITIATOR = step.shift()

      // Defines variable for the current workflow step
      let workflowStep

      switch (STEP_INITIATOR) {
        case (DELAY_INITIATOR):
          // console.log('DELAY')
          // console.log(step)
          workflowStep = _.clone(DELAY_WORKFLOW_STEP)
          workflowStep.value = step[0]
          break

        case (MACRO_INITIATOR):
          // console.log('MACRO')
          // console.log(step)
          workflowStep = _.clone(MACRO_WORKFLOW_STEP)
          workflowStep.value = step // TODO - add call to this.parseMacro
          break
        case (TEXT_INITIATOR):
          // console.log('TEXT')
          // console.log(step)
          workflowStep = _.clone(TEXT_WORKFLOW_STEP)
          workflowStep.value = this.parseText(step)
          break
        case (KEYUP_INITIATOR):
          // console.log('KEYUP')
          // console.log(step)
          workflowStep = _.clone(KEYUP_WORKFLOW_STEP)
          break
      }

      // Adds an individual step to the workflow
      workflowStep.id = randomId()
      workflowStep.order = workflowSteps.length
      workflowSteps.push(workflowStep)
    }

    // // // //

    // Pops off the traling STEP_TERMINATOR
    data.pop()

    // Splits into individual workflow steps
    let steps = data.join(',').split(`,${STEP_TERMINATOR},`)

    // Splits each step BACK into an array
    steps = _.map(steps, (s) => {
      let step = s.split(',')
      return step.map(i => Number(i))
    })

    // Parses each workflow step
    _.each(steps, (step) => { persistWorkflowStep(step) })

    // Returns the array of Workflow steps
    console.log('workflowSteps')
    console.log(workflowSteps)
    return { steps: workflowSteps }
  }

  // parseText
  // Parses a string of text from an array of integers
  parseText (value) {
    // Defines variables for textValue and shiftFlag
    let textValue = ''
    let shiftFlag = false

    // Splits text value into pairs
    let keys = _.chunk(value, 2)

    // Iterates over each key pair
    _.each(keys, (pair) => {
      // Captures key position
      let position = pair[0]

      // Finds key object
      // TODO - abstract this into a helper function
      let key = _.find(KEYS, { dec: pair[1] }) // TODO - CONSTANTIZE INDEX HERE

      // Handles invalid key
      if (!key) {
        console.log('ALERT - KEY NOT FOUND!')
        return
      }

      // Handles key shift
      if (key.key === 'SHIFT') {
        if (position === KEY_DN_POSITION) {
          shiftFlag = true
          return
        } else {
          shiftFlag = false
          return
        }
      }

      // Handles SPACE, key, and shift_key
      if (key.key === 'SPACE') {
        textValue += ' '
      } else if (shiftFlag) {
        textValue += key.shift_key
      } else {
        textValue += key.key
      }
    })

    // Logs and returns textValue
    console.log(textValue)
    return textValue
  }

  // serializeText
  // serialzes a text workflow step
  serializeText (text) {
    const macroKeys = []

    // cloneKey
    // clones an object from KEYS
    function cloneKey (macro, attrs = { position: 3 }) {
      // Clones and returns the macro object
      return _.merge(_.clone(macro), attrs)
    }

    // TODO - ABSTRACT TO CONSTANTS?
    const SHIFT_KEY = _.find(KEYS, { key: 'SHIFT' })

    // Iterates over each character in the text
    // and stores it in it's KEY representation
    for (var index = 0; index < text.length; index++) {
      // Isolaets the character
      const char = text[index]

      // DEBUG
      // console.log(char)

      // Finds the macro
      // Adds shiftt characters for upper/lower case
      let macro = _.find(KEYS, { key: char })
      if (macro) {
        macroKeys.push(cloneKey(macro))
        continue
      }

      // Checks for shifted macro
      if (!macro) {
        macro = _.find(KEYS, { shift_key: char })
      }

      // Applies key with SHIFT to capitalize
      if (macro) {
        macroKeys.push(cloneKey(SHIFT_KEY, { position: 1 })) // KEY_DN
        macroKeys.push(cloneKey(macro))
        macroKeys.push(cloneKey(SHIFT_KEY, { position: 2 })) // KEY_UP
        continue
      }

      // 'SPACE' character printed when not found
      // TODO - ensure ^ doesn't happen
      if (!macro) { macro = _.find(KEYS, { key: 'SPACE' }) }

      // Appends macro to macroKeys array
      macroKeys.push(cloneKey(macro))
    }

    // console.log(JSON.stringify(macroKeys, null, 2))

    // Parses the individual macro keys into their decimal values
    // and returns the resulting array
    return this.serializeKeys(macroKeys)
  }

  // serializeKeys
  // Serializes a single key into its decimal format
  serializeKeys (macroKeys) {
    // console.log('SERIALIZE KEYS')
    // console.log(macroKeys)
    let serialized_values = []

    _.each(macroKeys, (key) => {
      // TODO - turn into switch statement on key.position

      // KEY_DN_POSITION
      if (key.position === KEY_DN_POSITION) {
        serialized_values.push(KEY_DN_POSITION)
        serialized_values.push(key.dec || 4) // TODO - constantize default
      }

      // # KEY_UP_POSITION
      if (key.position === KEY_UP_POSITION) {
        serialized_values.push(KEY_UP_POSITION)
        serialized_values.push(key.dec || 4) // TODO - constantize default
      }

      // # KEY_PR_POSITION
      if (key.position === KEY_PR_POSITION) {
        serialized_values.push(KEY_PR_POSITION)
        serialized_values.push(key.dec || 4) // TODO - constantize default
      }
    })

    return serialized_values
  }

  // serialize
  // serializes a workflow from the database-level abstraction into a data buffer to be sent to a device
  serialize (workflow) {
    let data = []

    // Iterates over each workflow step and serializes each one
    _.each(workflow.steps, (step) => {
      switch (step.type) {
        case (WORKFLOW_STEP_DELAY):
          data.push(DELAY_INITIATOR)
          data.push(step.value) // 1 - 255 (i.e. 5 = 5 x 100ms = 500ms)
          break

        case (WORKFLOW_STEP_KEYUP):
          data.push(KEYUP_INITIATOR)
          break

        case (WORKFLOW_STEP_TEXT):
          data.push(TEXT_INITIATOR)
          data = _.concat(data, this.serializeText(step.value))
          break

        case (WORKFLOW_STEP_MACRO):
          data.push(MACRO_INITIATOR)
          data = _.concat(data, this.serializeKeys(step.value))
          break
      }

      // Adds STEP_TERMINATOR character
      data.push(STEP_TERMINATOR)
    })

    console.log('workflow/serialize: ')
    console.log(data)
    return data
  }
}

// // // //

// export default new WorkflowParser()
const parser = new WorkflowParser()
window.parser = parser
export default parser

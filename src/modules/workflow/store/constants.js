// Key Position Constants
export const KEY_DN_POSITION = 1
export const KEY_UP_POSITION = 2
export const KEY_PR_POSITION = 3

// WorkflowStep Tyoe Constants
export const WORKFLOW_STEP_DELAY = 'DELAY'
export const WORKFLOW_STEP_TEXT = 'TEXT'
export const WORKFLOW_STEP_KEY = 'KEY'
export const WORKFLOW_STEP_MACRO = 'MACRO'
export const WORKFLOW_STEP_KEYUP = 'KEY_UP'

// Workflow New Model
export const DEFAULT_WORKFLOW = {
  _id: '',
  label: 'My New Workflow',
  author: 'aeksco',
  created_by: 'created_by_user_id',
  public: true, // PUBLICLY VISIBLE BOOLEAN
  steps: []
}

// WorkflowStep primatives
export const TEXT_WORKFLOW_STEP = {
  order: null,
  icon: 'fa-paragraph',
  label: 'Type',
  type: 'TEXT',
  value: 'Hello, AstroKey!'
}

export const MACRO_WORKFLOW_STEP = {
  order: null,
  icon: 'fa-play-circle',
  label: 'Run Macro',
  type: 'MACRO',
  value: [
    { id: '1', key: 'SHIFT', position: 1 },
    { id: '2', key: 'a', position: 3 },
    { id: '3', key: 'SHIFT', position: 2 }
  ]
}

export const DELAY_WORKFLOW_STEP = {
  order: null,
  icon: 'fa-clock',
  label: 'Delay',
  type: 'DELAY',
  value: 2
}

export const KEY_WORKFLOW_STEP = {
  order: null,
  icon: 'fa-cube',
  type: 'KEY',
  value: 2
}

export const KEYUP_WORKFLOW_STEP = {
  order: null,
  type: 'KEY_UP',
  value: 2
}

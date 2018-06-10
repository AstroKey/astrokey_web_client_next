import { DEFAULT_CONTROL_TRANSFER } from './constants'

// USB Module State
const state = {
  collection: [], // TODO - rename to 'devices' (?)
  fetching: false,
  transferPayload: DEFAULT_CONTROL_TRANSFER
}

export default state

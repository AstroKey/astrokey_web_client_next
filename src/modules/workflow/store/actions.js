import _ from 'lodash'
import { DEFAULT_WORKFLOW } from './constants'

import WorkflowParser from './parser'

export default {
  reset_new_workflow ({ commit }) {
    commit('new_model', _.cloneDeep(DEFAULT_WORKFLOW))
  },
  serialize ({ commit }, { workflow }) {
    return WorkflowParser.serialize(workflow)
  },
  parse ({ commit }, { data }) {
    return WorkflowParser.parse(data)
  }
}

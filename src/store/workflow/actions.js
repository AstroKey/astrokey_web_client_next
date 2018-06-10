import WorkflowParser from './parser'

// // // //

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {
  // serialize
  serialize ({ commit }, { workflow }) {
    return WorkflowParser.serialize(workflow)
  },

  // parse
  parse ({ commit }, { data }) {
    return WorkflowParser.parse(data)
  }
}

// // // //

export default actions

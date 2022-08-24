const state = {
  nodeElements: []
}

const mutations = {
  nodeElements: (state, nodeElements) => {
    state.nodeElements.push(nodeElements)
    debugger
  }
}
const actions = {
  nodeElements: ({ commit }, nodeElements) => {
    commit('nodeElements', nodeElements)
  }
}

export default { state, mutations, actions }

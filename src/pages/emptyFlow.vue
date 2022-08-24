//empty flows with vuex

<template>
  <div style="width: 700px; height: 700px" class="q-py-md">
    <VueFlow v-model="nodeElements">
      <MiniMap />
      <Controls />
      <Background :variant="backgroundVariant.Lines" />
      <button type="button" :style="{ position: 'absolute', left: '10px', top: '10px', zIndex: 4 }" @click="addRandomNode">
        add node
      </button>
    </VueFlow>
  </div>
</template>

<script>
import { VueFlow, useVueFlow, BackgroundVariant, Background, Controls, MiniMap } from '@braks/vue-flow'
import { mapState, useStore } from 'vuex'
export default {
  name: 'emptyNode',
  components: {
    VueFlow,
    MiniMap,
    Controls,
    Background
  },
  setup () {
    const store = useStore()
    const backgroundVariant = BackgroundVariant
    const { nodes, addNodes, edges, addEdges, onConnect, onPaneReady, onNodeDragStop, dimensions } = useVueFlow()
    onConnect((params) => addEdges([params]))
    onPaneReady((flowInstance) => console.log('flow loaded:', flowInstance))
    onNodeDragStop((node) => console.log('drag stop', node))
    const addRandomNode = () => {
      const nodeId = (nodes.value.length + 1).toString()
      const newNode = {
        id: nodeId,
        label: `Node: ${nodeId}`,
        position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height }
      }
      addNodes([newNode])
      store.dispatch('nodeElements', newNode)
    }
    return {
      nodes,
      addNodes,
      edges,
      addEdges,
      onConnect,
      onPaneReady,
      onNodeDragStop,
      dimensions,
      addRandomNode,
      backgroundVariant,
      store
    }
  },
  computed: {
    ...mapState({
      nodeElements: state => state.vueFlowStore.nodeElements // get stored nodes
    })
  }
}
</script>

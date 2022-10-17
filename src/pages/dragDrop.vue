<template>
  <div style=" display: grid; grid-template-columns: 200px 600px; height: 600px">
    <div>
      <dragableComponent/>
    </div>
    <div class="dndflow" @drop="onDrop" style="background: #ccc">
      <VueFlow class="customnodeflow" @dragover="onDragOver">
        <template #edge-custom="props">
          <CustomEdge v-bind="props" />
        </template>
        <template #edge-custom2="props">
          <CustomEdge2 v-bind="props" />
        </template>
        <customNode/>
      </VueFlow>
    </div>
  </div>
</template>

<script>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import dragableComponent from 'components/dragableComponent'
import CustomEdge from 'components/customEdge'
import CustomEdge2 from 'components/customEdge2'
import CustomEdgeLabel from 'components/customEdgeLabel'
import customNode from 'components/customNode1'
import { h } from 'vue'
export default {
  components: {
    dragableComponent,
    VueFlow,
    CustomEdge,
    CustomEdge2,
    customNode
  },
  setup () {
    let id = 0
    const getId = () => `dndnode_${id++}`
    const { onConnect, addEdges, addNodes, project } = useVueFlow({
      nodes: [
        {
          id: '1',
          type: 'custom',
          position: { x: 250, y: 25 },
          label: () => h(CustomEdgeLabel, { label: 'custom label text' })
        }
      ]
    })
    const onDragOver = (event) => {
      event.preventDefault()
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
    onConnect((params) => addEdges([params]))
    const onDrop = (event) => {
      const type = event.dataTransfer?.getData('application/vueflow')
      const position = project({ x: event.clientX - 40, y: event.clientY - 18 })
      const newNode = {
        id: getId(),
        type,
        position,
        label: `${type} node`
      }
      addNodes([newNode])
    }
    return{
      onDragOver,
      onDrop
    }
  }
}
</script>

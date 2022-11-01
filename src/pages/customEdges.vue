<script setup>
import { Background, Controls, MiniMap } from '@vue-flow/additional-components'
import { MarkerType, VueFlow } from '@vue-flow/core'
import { h, ref } from 'vue'
import CustomEdge from 'components/customEdge'
// import CustomEdge2 from 'components/customEdge2'
import CustomEdgeLabel from 'components/customEdgeLabel'

const elements = ref([
  { id: '1', type: 'input', label: 'Start', position: { x: 50, y: 0 }, style: { borderColor: '#10b981' } },
  { id: '2', label: 'Node 2', position: { x: 150, y: 100 } },
  { id: '2a', label: 'Node 2a', position: { x: 0, y: 180 } },
  { id: '3', label: 'Node 3', position: { x: 250, y: 200 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 300 } },
  { id: '3a', label: 'Node 3a', position: { x: 175, y: 300 } },
  { id: '5', label: 'Node 5', position: { x: 200, y: 400 } },
  { id: '6', type: 'output', label: 'Output 6', position: { x: 0, y: 350 } },
  { id: '7', type: 'output', label: 'Output 7', position: { x: 50, y: 600 } },
  { id: '8', type: 'output', label: 'Output 8', position: { x: 350, y: 600 } },
  { id: '9', type: 'output', label: 'Output 9', position: { x: 550, y: 400 } },
  { id: 'e1-2', source: '1', target: '2', label: 'bezier edge (default)', class: 'normal-edge' },
  { id: 'e2-2a', source: '2', target: '2a', type: 'smoothstep', label: 'smoothstep edge' },
  { id: 'e2-3', source: '2', target: '3', type: 'step', label: 'step edge' },
  { id: 'e3-4', source: '3', target: '4', type: 'straight', label: 'straight edge' },
  {
    id: 'e3-3a',
    source: '3',
    target: '3a',
    label: () => h(CustomEdgeLabel, { label: 'Test label' }),
    labelStyle: { fill: '#1a1196', fontWeight: 700 },
    markerEnd: MarkerType.Arrow
  },
  {
    id: 'e3-5',
    source: '4',
    target: '5',
    animated: true,
    label: () => h(CustomEdgeLabel, { label: 'my label' }),
    labelStyle: { fill: '#eae0de', fontWeight: 700 },
    labelBgStyle: { fill: '#ab2b27' },
    markerEnd: MarkerType.Arrow
  },
  {
    id: 'e2a-6',
    source: '2a',
    target: '6',
    label: () => h(CustomEdgeLabel, { label: 'custom label text' }),
    labelStyle: { fill: '#10b981', fontWeight: 700 },
    markerEnd: MarkerType.Arrow
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    label: 'label with bg',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#b5d9f3', color: '#fff', fillOpacity: 0.7 },
    markerEnd: MarkerType.ArrowClosed
  },
  {
    id: 'e5-8',
    source: '5',
    target: '8',
    label: 'test4',
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#52f1c7', color: '#fff', fillOpacity: 0.7 }
  },
  {
    id: 'e4-9',
    source: '4',
    target: '9',
    label: 'test2',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#069a57', color: '#fff', fillOpacity: 0.7 }
  },
  {
    id: 'e3a-5',
    source: '3a',
    target: '5',
    label: 'test2',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#06779a', color: '#fff', fillOpacity: 0.7 }
  }
])
</script>

<template>
  <div style="height: 500px">
    <VueFlow v-model="elements" :fit-view-on-init="true" :snap-to-grid="true">
      <template #edge-custom="props">
        <CustomEdge v-bind="props" />
      </template>
<!--      <template #edge-custom2="props">-->
<!--        <CustomEdge v-bind="props" />-->
<!--      </template>-->
      <MiniMap />
      <Controls />
      <Background />
    </VueFlow>
  </div>
</template>
<style>
.vue-flow .vue-flow__edges {
  pointer-events: none;
  overflow: visible;
}
.vue-flow__edge-text{
  font-size: 13px;
}
</style>

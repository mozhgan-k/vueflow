//custom node

<template>
  <q-page class="flex flex-center q-py-md">
    <div style="width: 100%; height: 500px">
      <VueFlow
        v-model="elements"
        class="customnodeflow"
        :connection-mode="connection_mode.Loose"
        :class="[gradient ? 'animated-bg-gradient' : '']"
        :connection-line-style="connectionLineStyle"
        :style="{backgroundColor: bgColor}"
        :default-zoom="1.5"
        :fit-view-on-init="true"
      >
        <template #node-custom="props">
          <CustomNode v-bind="props" @change="onChange" @gradient="onGradient" :data="elements"/>
        </template>
<!--        <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor"/>-->
      </VueFlow>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, h } from 'vue'
import CustomNode from 'components/customNode'
import { VueFlow, useVueFlow, Position, ConnectionMode } from '@braks/vue-flow'
import { presets } from 'src/store/presets'

export default defineComponent({
  name: 'IndexPage',
  components: {
    CustomNode,
    // MiniMap,
    VueFlow
  },
  data () {
    return {
      gradient: false,
      elements: [
        {
          id: '1',
          type: 'custom',
          data: { color: this.bgColor },
          position: { x: 0, y: 50 }
        },
        {
          id: '2',
          type: 'output',
          label: this.outputNameLabel,
          position: { x: 350, y: 25 },
          targetPosition: Position.Left
        },
        {
          id: '3',
          type: 'output',
          label: this.outputColorLabel,
          position: { x: 350, y: 200 },
          targetPosition: Position.Left
        },
        {
          id: 'e1a-2',
          source: '1',
          sourceHandle: 'a',
          target: '2',
          animated: true,
          style: () => ({
            stroke: this.bgColor,
            filter: 'invert(100%)'
          })
        },
        {
          id: 'e1b-3',
          source: '1',
          sourceHandle: 'b',
          target: '3',
          animated: false,
          style: () => ({
            stroke: this.bgColor,
            filter: 'invert(100%)'
          })
        }
      ]
    }
  },
  setup () {
    const { getNode } = useVueFlow()
    const bgColor = ref(presets.byakuroku)
    const bgName = ref('byakuroku')
    const connection_mode = ConnectionMode
    const connectionLineStyle = { stroke: '#fff' }
    const outputColorNode = computed(() => {
      const node = getNode.value('3')
      return node
    })
    const nodeStroke = (n) => {
      if (n.type === 'input') return presets.fuji
      if (n.type === 'custom') return presets.ayame
      if (n.type === 'output') return presets.syojyohi
      return '#eee'
    }
    const nodeColor = (n) => {
      if (n.type === 'custom') return bgColor.value
      return '#fff'
    }
    const outputColorLabel = () => h('div', {}, bgColor.value)
    const outputNameLabel = () => h('div', {}, bgName.value)
    return{
      getNode,
      outputColorNode,
      bgColor,
      bgName,
      connectionLineStyle,
      nodeStroke,
      nodeColor,
      connection_mode,
      outputNameLabel,
      outputColorLabel
    }
  },
  methods: {
    onChange (color) {
      this.gradient = false
      this.bgColor = color.value
      this.bgName = color.name

      // this.outputColorNode.value.hidden = false
    },
    onGradient () {
      this.gradient = true
      this.bgColor = null
      this.bgName = 'gradient'

      // this.outputColorNode.value.hidden = true
    }
  }
})
</script>

//custom node

<template>
  <q-page class="flex flex-center q-py-md">
    <div style="width: 800px; height: 500px">
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
        <div class="q-mt-md q-mx-md" style="width: 250px;">
          <CustomNode @change="onChange" @gradient="onGradient" :data="elements"/>
        </div>
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
      elements: []
    }
  },
  setup () {
    const { getNode } = useVueFlow()
    const bgColor = ref(presets.byakuroku)
    const bgName = ref('byakuroku')
    const gradient = ref(false)
    const connection_mode = ConnectionMode
    const connectionLineStyle = { stroke: '#fff' }
    const outputColorNode = computed(() => {
      return getNode.value('3')
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
      gradient,
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
  mounted () {
    this.elements = [
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
          stroke: this.bgColor.value,
          filter: 'invert(100%)'
        })
      },
      {
        id: 'e1b-3',
        source: '1',
        sourceHandle: 'b',
        target: '3',
        animated: true,
        style: () => ({
          stroke: this.bgColor.value,
          filter: 'invert(100%)'
        })
      }
    ]
  },
  methods: {
    onChange (color) {
      this.gradient.value = false
      this.bgColor.value = color.value
      this.bgName.value = color.name

      this.outputColorNode.value.hidden = false
    },
    onGradient () {
      this.gradient.value = true
      this.bgColor.value = null
      this.bgName.value = 'gradient'

      this.outputColorNode.value.hidden = true
    }
  }
})
</script>

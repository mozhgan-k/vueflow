<template>
  <q-card class="bg-white q-pa-sm" flat>
    <div>Select a color</div>
    <div class="custom-component">
      <div v-for="color of colors" :key="color.name">
        <button :title="color.name" :style="{ backgroundColor: color.value }" type="button"
                @click="onSelect(color)"></button>
      </div>
      <button class="animated-bg-gradient" title="gradient" type="button" @click="onGradient"></button>
    </div>
    <Handle id="a" type="source" :position="position.Right" :style="sourceHandleStyleA"/>
    <Handle id="b" type="source" :position="position.Right" :style="sourceHandleStyleB"/>
  </q-card>
</template>

<script>
import { Handle, Position } from '@braks/vue-flow'
import { computed } from 'vue'
import { presets } from 'src/store/presets'

export default {
  components: {
    Handle
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    debugger
    const position = Position
    const colors = computed(() => {
      return Object.keys(presets).map((color) => {
        return {
          name: color,
          value: presets[color]
        }
      })
    })
    const sourceHandleStyleA = computed(() => ({
      backgroundColor: props.data.color,
      filter: 'invert(100%)',
      top: '10px'
    }))
    const sourceHandleStyleB = computed(() => ({
      backgroundColor: props.data.color,
      filter: 'invert(100%)',
      bottom: '10px',
      top: 'auto'
    }))
    return {
      colors,
      // selectedColor,
      sourceHandleStyleB,
      sourceHandleStyleA,
      position
    }
  },
  computed: {
    selectedColor () {
      let colors = []
      for (const data of this.$props.data) {
        if (data.type === 'custom') {
          const find = this.colors.value.find((color) => color.value === data.data.color)
        }
        colors.push(find)
      }
      return {
        colors
      }
    },
    methods: {
      onSelect (color) {
        debugger
        this.$emit('change', color)
      },
      onGradient () {
        this.$emit('gradient')
      },
      onConnect (params) {
        console.log('handle onConnect', params)
      }
    }
  }
  }
</script>

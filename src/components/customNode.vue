<template>
  <div>Select a color</div>
  <div
    style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; max-width: 90%; margin: auto; gap: 3px"
  >
    <template v-for="color of colors" :key="color.name">
      <button :title="color.name" :style="{ backgroundColor: color.value }" type="button" @click="onSelect(color)"></button>
    </template>
    <button class="animated-bg-gradient" title="gradient" type="button" @click="onGradient"></button>
  </div>
  <Handle id="a" type="source" :position="position.Right" :style="sourceHandleStyleA" />
  <Handle id="b" type="source" :position="position.Right" :style="sourceHandleStyleB" />
</template>

<script>
import { Handle, Position } from '@braks/vue-flow'
import { computed } from 'vue'
import { presets } from 'src/store/presets'

export default {
  components: {
    Handle
  },
  setup () {
    const props = defineProps({
      data: {
        type: Object,
        required: true
      }
    })
    const position = Position
    const emit = defineEmits(['change', 'gradient'])

    const onConnect = (params) => console.log('handle onConnect', params)

    const onSelect = (color) => {
      emit('change', color)
    }
    const onGradient = () => {
      emit('gradient')
    }
    const colors = computed(() => {
      return Object.keys(presets).map((color) => {
        return {
          name: color,
          value: presets[color]
        }
      })
    })
    const selectedColor = computed(() => {
      return colors.value.find((color) => color.value === props.data.color)
    })
    const sourceHandleStyleA = computed(() => ({ backgroundColor: props.data.color, filter: 'invert(100%)', top: '10px' }))
    const sourceHandleStyleB = computed(() => ({
      backgroundColor: props.data.color,
      filter: 'invert(100%)',
      bottom: '10px',
      top: 'auto'
    }))
    return {
      props,
      onConnect,
      onSelect,
      onGradient,
      colors,
      selectedColor,
      sourceHandleStyleB,
      sourceHandleStyleA,
      position
    }
  }
}
</script>

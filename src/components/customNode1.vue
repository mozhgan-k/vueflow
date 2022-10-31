<template>
  <div class="custom-component ">
    <q-card class="q-pa-md flex flex-center items-center" flat >
      <span>test</span>
      <Handle id="a" type="source" :position="position.Right" :style="sourceHandleStyleA"/>
      <Handle id="b" type="source" :position="position.Right" :style="sourceHandleStyleB"/>
    </q-card>
  </div>
</template>

<script>
import { Handle, Position } from '@braks/vue-flow'
import { computed } from 'vue'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    Handle
  },
  setup (props, { emit }) {
    const position = Position
    const sourceHandleStyleA = computed(() => ({
      filter: 'invert(100%)',
      top: '50px'
    }))
    const sourceHandleStyleB = computed(() => ({
      filter: 'invert(100%)',
      bottom: '10px',
      top: 'auto'
    }))
    return {
      sourceHandleStyleB,
      sourceHandleStyleA,
      position
    }
  }
}
</script>

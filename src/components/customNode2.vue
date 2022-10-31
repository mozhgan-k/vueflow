<template>
  <div class="custom-component ">
    <div class="flex flex-center items-center">
      <div class="img-container">
        <img style="width: 100%; height: 100%" src="../assets/email.png">
      </div>
      <span>test</span>
    </div>
    <!--    <Handle id="a" type="source" :position="position.Bottom" :style="sourceHandleStyleA"/>-->
    <!--    <Handle id="b" type="source" :position="position.Right" :style="sourceHandleStyleB"/>-->
  </div>
</template>

<script>
import { Position } from '@braks/vue-flow'
import { computed } from 'vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  // components: {
  //   Handle
  // },
  setup (props, { emit }) {
    const position = Position
    const sourceHandleStyleA = computed(() => ({
      filter: 'invert(100%)',
      bottom: '1px'
    }))
    const sourceHandleStyleB = computed(() => ({
      filter: 'invert(100%)',
      bottom: '15px',
      top: 'auto',
      right: '0'
    }))
    return {
      sourceHandleStyleB,
      sourceHandleStyleA,
      position
    }
  }
}
</script>

<style lang="scss">
.img-container {
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  padding: 8px;
}
</style>

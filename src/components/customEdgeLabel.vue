<template>
  <tspan dy="10" x="0">{{ props.label }}</tspan>
</template>

<script>
export default {
  setup () {
    const props = defineProps({
      label: {
        type: String,
        required: true
      }
    })
    return {
      props
    }
  }
}
</script>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <tspan dy="5" x="0" style="font-size: 13px">{{ props.label }}</tspan>
</template>

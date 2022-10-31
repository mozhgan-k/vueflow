<template>
  <q-card flat class="q-pa-sm">
    <q-list dense>
      <q-item @dragstart="onDragStart($event, 'custom')" :draggable="true">
        <div class="flex items-center">
          <div style="width: 20px; height: 20px">
            <img style="width: 100%; height: 100%" src="../assets/database.png">
          </div>
          <span class="q-mx-sm">Read list</span>
        </div>
      </q-item>
      <q-item @dragstart="onDragStart($event, 'input')" :draggable="true">
        <div class="flex items-center">
          <div style="width: 20px; height: 20px">
            <img style="width: 100%; height: 100%" src="../assets/database.png">
          </div>
          <span class="q-mx-sm">Read list</span>
        </div>
      </q-item>
      <q-item @dragstart="onDragStart($event, 'custom2')" :draggable="true">
        <div class="flex items-center">
          <div style="width: 20px; height: 20px">
            <img style="width: 100%; height: 100%" src="../assets/database.png">
          </div>
          <span class="q-mx-sm">Read list</span>
        </div>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  setup () {
    const onDragStart = (event, nodeType) => {
      if (event.dataTransfer) {
        event.dataTransfer.setData('application/vueflow', nodeType)
        event.dataTransfer.effectAllowed = 'move'
      }
    }
    return{
      onDragStart
    }
  }
}
</script>

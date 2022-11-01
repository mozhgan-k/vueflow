<template>
<!--  <div style="height: 200px">-->
<!--    <div id="demo" @contextmenu.prevent="openMenu($event)">-->
<!--      <h1 class="center">-->
<!--        Right click anywhere to bring up a menu.-->
<!--      </h1>-->
<!--      <ul id="right-click-menu" tabindex="-1" @blur="closeMenu">-->
<!--        <li>First list item</li>-->
<!--        <li>Second list item</li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </div>-->
  <div style=" display: grid; grid-template-columns: 200px 600px; height: 600px">
    <div>
      <dragableComponent/>
    </div>
    <div class="dndflow" @drop="onDrop" style="background: #e1e1e1">
      <VueFlow class="customnodeflow" @dragover="onDragOver">
        <template #node-custom="props">
          <customNode :data="props"/>
        </template>
        <template #node-custom2="props">
          <customNode2 :data="props"/>
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<script>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import dragableComponent from 'components/dragableComponent'
import customNode from 'components/customNode1'
import customNode2 from 'components/customNode2'
import { nextTick } from 'vue'
export default {
  components: {
    dragableComponent,
    VueFlow,
    customNode,
    customNode2
  },
  data: () => ({
    viewMenu: false,
    top: '0px',
    left: '0px'
  }),
  setup () {
    let id = 0
    const getId = () => `dndnode_${id++}`
    const { onConnect, addEdges, addNodes, project } = useVueFlow({
      nodes: [
        {
          id: '1',
          type: 'custom',
          position: { x: 250, y: 25 }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' }
      ]
    })
    const onDragOver = (event) => {
      event.preventDefault()
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
    onConnect((params) => addEdges([params]))
    const onDrop = (event) => {
      const type = event.dataTransfer?.getData('application/vueflow')
      const position = project({ x: event.clientX - 40, y: event.clientY - 18 })
      const newNode = {
        id: getId(),
        type,
        position,
        label: `${type} node`
      }
      addNodes([newNode])
    }
    return{
      onDragOver,
      onDrop
    }
  },
  methods: {
    setMenu: function (top, left) {
      let largestHeight = window.innerHeight - this.$$.right.offsetHeight - 25
      let largestWidth = window.innerWidth - this.$$.right.offsetWidth - 25

      if (top > largestHeight) top = largestHeight

      if (left > largestWidth) left = largestWidth

      this.top = top + 'px'
      this.left = left + 'px'
    },

    closeMenu: function () {
      this.viewMenu = false
    },

    openMenu: function (e) {
      this.viewMenu = true

      nextTick(function () {
        this.$$.right.focus()

        this.setMenu(e.y, e.x)
      }.bind(this))
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss">
.customnodeflow .vue-flow__node-custom {
  background: transparent;
  border: none;
}
h1 {
  font-size: 3em;
}

.center {
  text-align: center;
}

#demo {
  width: 100%;
  height: 100%;
}

#right-click-menu{
  background: #FAFAFA;
  border: 1px solid #BDBDBD;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 250px;
  z-index: 999999;
}

#right-click-menu li {
  border-bottom: 1px solid #E0E0E0;
  margin: 0;
  padding: 5px 35px;
}

#right-click-menu li:last-child {
  border-bottom: none;
}
</style>

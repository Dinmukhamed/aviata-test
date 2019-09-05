<template>
  <transition-group
    name="list"
    :css="false"
    :before-enter="beforeEnter"
    :enter="enter"
    :leave="leave"
  >
    <slot></slot>
  </transition-group>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script>
  export default {
    name: "CustomTransition",
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150
        //setTimeout(function () {
          Velocity(
            el,
            { opacity: 1, height: '1.6em' },
            { complete: done },{ duration: 150 }
          )
        //}, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150
        //setTimeout(function () {
          Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done },{ duration: 150 }
          )
        //}, delay)
      }
    }
  }
</script>

<style scoped>

</style>
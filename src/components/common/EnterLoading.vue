<template>
<transition>
  <div class="loading line-scale-pulse-out">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <slot></slot>
  </div>
</transition>
</template>
<script>
import 'loaders.css';

export default {};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #1c1c1c;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  transition: all 3s;
}
.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: opacity 1s;
}
.v-leave-to {
  opacity: 0;
}
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 1s;
}
.v-enter-to {
  opacity: 1;
}
</style>

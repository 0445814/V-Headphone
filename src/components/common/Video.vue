<template>
  <div class="bg-video d-none d-md-block">
    <video id="video" src="@/static/ath-video.mp4" @ended="delay" autoplay muted></video>
    <slot name="content"></slot>
    <slot name="scroll-btn"></slot>
  </div>
</template>

<script>
export default {
  methods: {
    delay() {
      setTimeout(() => {
        const video = document.getElementById('video');
        video.play();
      }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/customMixins.scss";
.bg-video {
  position: relative;
  height: 80vh;
  min-height: 25rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -10;
    transform: translateX(-50%) translateY(-50%);
  }

  @include BS-xl {
    height: 75vh;
  }
}
</style>

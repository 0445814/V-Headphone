<template>
  <section
    id="parallax"
    class="position-relative mb-5"
  >
    <div
      class="parallax-intro ml-5 mt-8 mt-md-0"
      v-scroll-reveal="{origin: 'left'}"
    >
      <h2 class="text-light mb-5">
        MDR-1ADAC
        <a
          class="play-button text-light ml-3 d-none d-sm-inline-block"
          href="/"
          @click.prevent="isShow = !isShow"
        >
          <i class="fal fa-play-circle"></i>
        </a>
      </h2>
      <p class="text-light mb-5">
        SONY 最新平價旗艦上市，忠實呈現每個音符
        <i class="fal fa-music-alt"></i>
      </p>
      <router-link
        class="btn btn-outline-light"
        to="/product/-Lyvy-sBt1swIcjr1imQ"
      >查看細節</router-link>
    </div>
    <div
      class="youTube-intro d-none d-sm-block"
      :class="{'youTube-show' : isShow}"
    >
      <iframe
        src="https://www.youtube.com/embed/ve1DO12jLsg?start=9"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgUrl:
        'https://i.pinimg.com/originals/03/0f/f8/030ff804d7399059b4a8cf531a1e5350.jpg',
      //  是否顯示 YouTube
      isShow: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/customMixins.scss";

// 視差背景圖
#parallax {
  background: url(https://i.pinimg.com/originals/03/0f/f8/030ff804d7399059b4a8cf531a1e5350.jpg)
    fixed no-repeat;
  background-position: bottom bottom;
  background-size: cover;
  min-height: 500px;
  overflow: hidden;

  @include BS-xl {
    background-position: center center;
  }
}

// YouTube 顯示按鈕
.play-button {
  transition: all 2s;
  &:hover {
    i {
      transform: rotateY(360deg);
      transition: all 1.5s;
    }
  }
}

.parallax-intro {
  position: absolute;
  top: 30%;
}

.youTube-intro {
  position: absolute;
  top: 30%;
  right: -101%;
  transition: all 1s;

  iframe {
    width: 450px;
    height: 250px;
    @include BS-md {
      width: 270px;
      height: 150px;
    }
  }
}

.youTube-show {
  right: 3%;
  @include BS-lg {
    right: 5%;
  }
}
</style>

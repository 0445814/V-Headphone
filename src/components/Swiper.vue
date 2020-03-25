<template>
  <div class="position-relative">
    <!-- swiper -->
    <swiper id="swiper" :options="swiperOption">
      <swiper-slide v-for="banner in banners" :key="banner">
        <img class :src="banner" alt="swiper-image" />
      </swiper-slide>
    </swiper>
    <div class="swiper-intro p-2 d-none d-sm-block position-absolute">
      <h3 class="text-white" style="font-family: 'Noto Serif JP', serif;">V ヘッドホン</h3>
      <p class="text-white mt-3" style="font-family: 'Noto Serif JP', serif;">
        すべての人にいい音を
      </p>
    </div>
    <ScrollBtn class="d-md-none" />
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import '../../node_modules/swiper/css/swiper.css';

export default {
  data() {
    return {
      // ? 如果是從資料庫取得圖片再渲染，進入畫面會有跳動問題
      // ? 並且開始輪播的圖片不是從陣列的第一張開始播放
      // ? 但如果是一開始給予圖片，就不會跳動，並且可按照順序播放
      banners: [
        'https://i.imgur.com/5kQW3K1.jpg',
        'https://i.imgur.com/lXzRxGw.jpg',
        'https://i.imgur.com/5EzoaF5.jpg',
        'https://i.imgur.com/hUSffAm.jpg',
      ],
      // 輪播設定
      swiperOption: {
        loop: true,
        autoplay: 3000,
        speed: 1500,
        autoplayDisableOnInteraction: false,
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
    ScrollBtn: () => import('@/components/common/ScrollButton.vue'),
  },

  // ! 若使用資料庫存到 VueX 有畫面跳動問題
  // computed: {
  //   banners() {
  //     return this.$store.state.banners;
  //   },
  // },
  // created() {
  //   this.$store.dispatch('getBanners');
  // },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/customMixins.scss";

#swiper {
  img {
    width: 100%;
    // 瀏覽器高
    height: 100vh;
    // 物件契合
    object-fit: cover;
    // background-size: cover;
    // background-position: center center;
    // 其他裝置下只有一半高
    @include BS-xl {
      height: 50vh;
    }

    @include BS-lg {
      height: 75vh;
    }
  }
}
.swiper-intro {
  top: 60%;
  left: 15%;
  z-index: 10;
}
</style>

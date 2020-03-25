<template>
  <div>
    <keep-alive>
    <Video>
      <div slot="content" class="text-white p-3">
      </div>
      <ScrollBtn slot="scroll-btn" class="d-none d-md-block" />
    </Video>
    </keep-alive>
    <!-- 輪播圖 -->
    <Swiper />

    <!-- 首頁介紹 -->
    <Intro />

    <!-- 首頁卡片元件 -->
    <div id="product-type">
      <h3 class="h5 text-secondary text-center m-5">
        <span class="border-bottom">PRODUCTS</span>
      </h3>
      <div class="d-flex flex-wrap justify-content-center mb-5 pb-5" style="overflow: hidden;">
        <card
          data-image="https://theheadphonelist.com/wp-content/uploads/2019/11/ADX5K-9-W2.jpg"
          v-scroll-reveal="{ origin: 'right' }"
        >
          <h3 slot="header" class="h2">Headphone</h3>
          <p slot="content" class="ml-5 mb-4">--最好的耳機都在這裡</p>
          <div slot="footer" class="text-center">
            <button class="btn btn-outline-light btn-sm" type="button" @click="goPage('Headphone')">
              立即前往
            </button>
          </div>
        </card>
        <card
          data-image="https://www.fostexinternational.com/public/images/news_img/hp_a8_main.jpg"
          v-scroll-reveal="{ origin: 'right' }"
        >
          <h3 slot="header" class="h2">DAC</h3>
          <p slot="content" class="ml-4 mb-4">--耳機擴大機，好聲的重要推手</p>
          <div slot="footer" class="text-center">
            <button class="btn btn-outline-light btn-sm" type="button" @click="goPage('DAC')">
              立即前往
            </button>
          </div>
        </card>
      </div>
    </div>

    <!-- 視差背景 -->
    <Parallax />

    <!-- 新品上市 -->
    <NewArrival />

    <!-- EVENT -->
    <Event />

    <!-- Follow Us -->
    <FollowUs />
  </div>
</template>

<script>
export default {
  methods: {
    goPage(selectedCategory) {
      this.$store.dispatch('changeCategory', selectedCategory);
      this.$router.push('/product');
    },
  },

  components: {
    // 背景影片
    Video: () => import('@/components/common/Video.vue'),
    ScrollBtn: () => import('@/components/common/ScrollButton.vue'),
    // 輪播圖
    Swiper: () => import('@/components/Swiper'),
    // 首頁介紹
    Intro: () => import('@/components/Intro'),
    // 新品上市
    NewArrival: () => import('@/components/NewArrival'),
    // PRODUCTS 的卡片元件
    card: () => import('@/components/PrdouctType'),
    // 視差背景
    Parallax: () => import('@/components/Parallax'),
    // EVENT
    Event: () => import('@/components/Event'),
    // Follow Us
    FollowUs: () => import('@/components/FollowUs'),
  },

  updated() {
    // this.$store.commit('ENTERLOADING', false);
  },
};
</script>

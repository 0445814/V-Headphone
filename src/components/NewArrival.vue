<template>
  <section id="new-arrival" class="container my-5 pt-5" v-scroll-reveal="{origin: 'bottom'}">
    <div class="row">
      <div class="col">
        <h3 class="h5 text-secondary text-center m-5">
          <span class="border-bottom">NEW ARRIVAL</span>
        </h3>
        <!-- swiper -->
        <swiper class="mb-5 pb-5" :options="swiperOption">
          <template v-for="(item,index) in newArrival">
            <swiper-slide :key="item.id" v-if="index < 6">
              <router-link
                :to="`/product/${item.id}`"
                class="d-block h5 text-dark mb-3 hvr-border-fade"
              >
                <img :src="item.imageUrl" class="d-block mb-3 mx-auto" alt="newArrival-picture" />
              </router-link>
              <hr />
              <router-link :to="`/product/${item.id}`" class="d-block h5 text-dark mb-3">
                <span
                  class="hvr-underline-reveal"
                  style="font-family: 'Cormorant Garamond', serif;"
                >{{item.title}}</span>
              </router-link>
              <p>{{item.description}}</p>
            </swiper-slide>
          </template>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </section>
</template>


<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import '../../node_modules/swiper/css/swiper.css';

export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        loopFillGroupWithBlank: true,
        // autoplay: 1500,
        // autoplayDisableOnInteraction: false,
        speed: 1500,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 1,
          },
        },
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  computed: {
    newArrival() {
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch('getProducts');
  },
};
</script>
<style lang="scss" scoped>
img {
  height: 200px;
  max-width: 330px;
}

.hvr-border-fade:hover,
.hvr-border-fade:focus,
.hvr-border-fade:active {
  box-shadow: inset 0 0 0 4px gray;
}
</style>

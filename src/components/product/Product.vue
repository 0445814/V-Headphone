<template>
  <div>
    <!-- jumbotron -->
    <div class="jumbotron text-white">
      <div class="container text-right mt-5">
        <div class="row">
          <div class="col">
            <h2>V-Headphone 開幕回饋</h2>
            <p class="lead">
              即刻輸入優惠碼，享折扣價與額外
              <span class="font-weight-bold">6 個月</span>
              保固
            </p>
            <button class="btn btn-outline-light btn-sm" @click="showCoupon">立刻索取</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <!-- 左方產品分類 -->
        <div class="col-lg-3 d-none d-lg-block">
          <div class="list-group sticky-top mb-5">
            <a
              href="#"
              class="list-group-item list-group-item-action text-black font-weight-bold"
              :class="{'list-group-item-dark': nowCategory === 'Headphone'}"
              @click.prevent="changeCategory('Headphone')"
            >
              <i class="fal fa-headphones"></i>
              Headphones
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action text-black pl-5"
              :class="{'list-group-item-black': nowCategory === category}"
              v-for="category in this.$store.state.brands.Headphone"
              :key="category"
              @click.prevent="changeCategory(category)"
            >{{category}}</a>
            <a
              href="#"
              class="list-group-item list-group-item-action text-black font-weight-bold"
              :class="{'list-group-item-dark': nowCategory === 'DAC'}"
              @click.prevent="changeCategory('DAC')"
            >
              <i class="fal fa-hdd"></i>
              DAC
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action text-black pl-5"
              :class="{'list-group-item-dark': nowCategory === category}"
              v-for="category in this.$store.state.brands.DAC"
              :key="category"
              @click.prevent="changeCategory(category)"
            >{{category}}</a>
            <a class="list-group-item list-group-item-action pl-5 text-muted" disabled>
              BARTÓK(接洽中)
              </a>
          </div>
        </div>

        <!-- 右方產品 -->
        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-4" v-for="item in allProducts" :key="item.id">
              <div class="card border-0 w-100 h-100 mb-5" style="width: 18rem;">
                <router-link class="mb-3" :to="`/product/${item.id}`">
                  <img
                    :src="item.imageUrl"
                    class="d-block card-img-top hvr-grow"
                    alt="..."
                  />
                </router-link>

                <div class="card-body">
                  <p class="card-text text-center m-0">
                    <router-link :to="`/product/${item.id}`" class="text-dark">
                      <span
                        class="font-weight-bold hvr-underline-from-center"
                        style="font-family: 'Cormorant Garamond', serif;"
                      >{{item.title}}</span>
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coupon: '',
    };
  },
  methods: {
    // 取得所有產品資訊
    getAllProducts() {
      this.$store.dispatch('getAllProducts');
    },
    changeCategory(selectedCategory) {
      this.$store.dispatch('changeCategory', selectedCategory);
    },
    // 取得優惠券資料
    getCouponCode() {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=1`;

      vm.$store.dispatch('updateLoading', true);
      axios.get(apiUrl).then((response) => {
        vm.coupon = response.data.coupons;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    showCoupon() {
      this.$bus.$emit('sweet-alert-info', {
        icon: 'info',
        title: '複製優惠碼: V-Headphone',
      });
    },
  },
  computed: {
    allProducts() {
      const vm = this;
      // 監測 VueX，並過濾資料
      return vm.$store.state.allProducts
        .filter(item => (vm.$store.state.selectedCategory === item.type
          ? vm.$store.state.selectedCategory === item.type
          : vm.$store.state.selectedCategory === item.category))
        .reverse();
    },
    nowCategory() {
      return this.$store.state.selectedCategory;
    },
  },
  created() {
    this.getAllProducts();
  },

};
</script>

<style lang="scss" scoped>
.jumbotron {
  background: url(https://i.imgur.com/6p36vB1.jpg)
    no-repeat;
  background-position: center center;
  background-size: cover;
}

.sticky-top{
  top:58px;
}
</style>

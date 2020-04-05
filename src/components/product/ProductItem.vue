<template>
  <div class="container mt-5">
    <br />
    <br />
    <br />
    <br />

    <div class="row mb-5">
      <div class="col-lg-6">
        <zoom-on-hover :img-normal="product.imageUrl" :scale="1.5"></zoom-on-hover>
      </div>
      <div class="col-lg-6 d-flex flex-column">
        <h2>{{ product.title }}</h2>
        <p class="h4 text-right" v-if="product.price">{{ product.price | currency }}</p>
        <p class="border-bottom mb-5"></p>
        <p class="mb-5 font-weight-bold h4" style="line-height: 1.5">{{ product.description }}</p>
        <ul class="mb-5" style="list-style-type: circle">
          <li class="mb-3" v-for="(content, key) in product.content" :key="key">{{ content }}</li>
        </ul>
        <div class="d-flex justify-content-between ">
          <div
            class="col-4 col-lg-3 btn-group d-flex align-items-center p-0"
            style="border-bottom: 1px solid #343a40"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              class="btn text-left"
              :class="{ 'not-allowed': qty === 1 }"
              :disabled="qty === 1"
              @click="decreaseQty"
            >
              -
            </button>
            <p class="m-0">{{ qty }}</p>
            <button type="button" class="btn text-right" @click="increaseQty">+</button>
          </div>
          <button type="button" class="btn btn-outline-dark" @click="addToCart(product.id)">
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      qty: 1,
    };
  },
  methods: {
    // 取得單一產品細節
    getProduct() {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.$route.params.productId}`;
      vm.$store.dispatch('updateLoading', true);
      axios.get(apiUrl).then((response) => {
        vm.product = response.data.product;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    addToCart(productId) {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;

      const cart = {
        product_id: productId,
        qty: vm.qty,
      };
      vm.$store.dispatch('updateLoading', true);
      axios
        .post(apiUrl, {
          data: cart,
        })
        .then(() => {
          vm.$bus.$emit('sweet-alert', {
            icon: 'success',
            title: '已成功加入購物車',
          });
          vm.$store.dispatch('getCarts');
          vm.$store.dispatch('updateLoading', false);

          // *API 沒有失敗回傳，所以無法配合 if else 使用下段
          //   console.log(response);
          //   vm.sweetAlert("error", "加入失敗請稍後再試 :(", 3000);
          //   vm.$store.dispatch("getCarts");
          //   vm.$store.dispatch("updateLoading", false);
          // }
        });
    },
    decreaseQty() {
      if (this.qty !== 1) {
        this.qty -= 1;
      }
    },
    increaseQty() {
      this.qty += 1;
    },
  },

  created() {
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
.not-allowed {
  cursor: default;
}

// 取消 button 的 focus 樣式
.btn:focus {
  box-shadow: none;
}
</style>

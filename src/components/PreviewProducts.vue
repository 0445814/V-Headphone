<template>
  <div>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.key">
        <div class="card border-0 shadow-sm">
          <!-- 動態加入背景圖片，注意格式 -->
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
              <del class="h6" v-if="item.price">定價 {{ item.origin_price | currency }}</del>
              <div class="h5" v-if="item.price">{{ item.price | currency }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="card border-0 shadow-sm">
                <div
                  style="height: 150px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${product.imageUrl})` }"
                ></div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{ product.catefory }}</span>
                  <h5 class="card-title">
                    <a href="#" class="text-dark">{{ product.title }}</a>
                  </h5>
                  <p class="card-text">{{ product.content }}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!product.price">
                      {{ product.origin_price | currency }}
                    </div>
                    <del class="h6" v-if="product.price"
                      >定價 {{ product.origin_price | currency }}</del
                    >
                    <div class="h5" v-if="product.price">{{ product.price | currency }}</div>
                  </div>
                </div>
                <select name class="form-control mt-3" v-model="product.num">
                  <option :value="num" v-for="num in 10" :key="num"
                    >選購 {{ num }} {{ product.unit }}</option
                  >
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm ml-auto"
                @click="addToCart(product.id, product.num)"
              >
                <i class="fas fa-spinner fa-spin"></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5 justify-content-center" v-if="carts.total > 0">
      <div class="col-6">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in carts.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="deleteCart(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{ carts.total | currency }}</td>
              </tr>
              <tr v-if="carts.total !== carts.final_total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ carts.final_total | currency }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
              v-model="couponCode"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            v-validate="'required|email'"
            placeholder="請輸入 Email"
          />
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first("email") }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            v-validate="'required'"
            :class="{ 'is-invalid': errors.has('name') }"
            placeholder="輸入姓名"
          />
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors.has('tel') }"
            id="usertel"
            name="tel"
            v-model="form.user.tel"
            v-validate="'required'"
            placeholder="請輸入電話"
          />
          <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
        </div>

        <div class="form-group">
          <label for="user-address">收件人地址</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.has('address') }"
            name="address"
            id="user-address"
            v-model="form.user.address"
            v-validate="'required'"
            placeholder="請輸入地址"
          />
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
            placeholder="歡迎留下訊息或建議給我們"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      carts: [],
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;

      axios.get(apiUrl).then((response) => {
        vm.products = response.data.products;
      });
    },
    // 取得單一商品資訊
    getProduct(item) {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${item.id}`;

      vm.status.loadingItem = item.id;
      axios.get(apiUrl).then((response) => {
        vm.product = response.data.product;
        vm.product.num = 1;
        vm.status.loadingItem = '';
        $('#productModal').modal('show');
      });
    },

    addToCart(id, qty = 1) {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        productId: id,
        qty,
      };

      axios.post(apiUrl, { data: cart }).then(() => {
        vm.status.loadingItem = '';
        vm.getCarts();
        $('#productModal').modal('hide');
      });
    },

    getCarts() {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;

      axios.get(apiUrl).then((response) => {
        vm.carts = response.data.data;
      });
    },

    deleteCart(id) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;

      axios.delete(apiUrl).then(() => {
        this.getCarts();
      });
    },
    addCouponCode() {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;

      const couponCode = {
        code: vm.couponCode,
      };

      axios.post(apiUrl, { data: couponCode }).then(() => {
        this.getCarts();
      });
    },

    createOrder() {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;

      vm.$validator.validate().then((valid) => {
        if (valid) {
          axios.post(apiUrl, { data: order }).then((response) => {
            if (response.data.success) {
              vm.$router.push(`/cart/checkout/${response.data.orderId}`);
            }
          });
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.getCarts();
  },
};
</script>

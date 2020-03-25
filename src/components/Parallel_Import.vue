<template>
  <div class="container mb-5 mt-9">
    <h2 class="text-center">找不到想要的商品 ? 自己來訂購吧!</h2>
    <div class="row justify-content-center">
      <div class="col-md-5">
        <p class="text-secondary text-center p-3">
          我們將在確認商品可進貨後聯絡您
          <br />平行輸入也有
          <a
            class="text-dark font-weight-bold border-bottom"
            href="#/warranty"
            target="_blank"
          >保固</a>
          喔
        </p>

        <!-- 表單 -->
        <form @submit.prevent="uploadOrder">
          <div class="form-group">
            <div class="input-group border-bottom">
              <div class="input-group-prepend">
                <div class="input-group-text bg-white border-0">
                  <i class="fal fa-user"></i>
                </div>
              </div>
              <input
                type="text"
                class="form-control border-0"
                placeholder="您的真實姓名"
                v-model="customOrder.name"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group border-bottom">
              <div class="input-group-prepend">
                <div class="input-group-text bg-white border-0">
                  <i class="fal fa-envelope"></i>
                </div>
              </div>
              <input
                type="email"
                class="form-control border-0"
                placeholder="Email"
                v-model="customOrder.email"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group border-bottom">
              <div class="input-group-prepend">
                <div class="input-group-text bg-white border-0">
                  <i class="fal fa-mobile-alt pl-1"></i>
                </div>
              </div>
              <input
                type="tel"
                class="form-control border-0"
                placeholder="市話或手機"
                v-model="customOrder.tel"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="input-group border-bottom">
              <div class="input-group-prepend">
                <div class="input-group-text bg-white border-0">
                  <i class="fal fa-copyright"></i>
                </div>
              </div>
              <input
                type="text"
                name="product-name"
                class="form-control border-0"
                placeholder="請輸入商品品牌"
                v-model="customOrder.brand"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group border-bottom">
              <div class="input-group-prepend">
                <div class="input-group-text bg-white border-0">
                  <i class="fal fa-headphones"></i>
                </div>
              </div>
              <input
                type="text"
                name="product-name"
                class="form-control border-0"
                placeholder="請輸入商品型號"
                v-model="customOrder.product"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="input-group border-bottom">
              <div class="input-group-prepend">
                <div class="input-group-text bg-white border-0">
                  <i class="fal fa-window"></i>
                </div>
              </div>
              <input
                type="text"
                name="product-name"
                class="form-control border-0"
                placeholder="商品參考網址(選填，建議填寫加速作業)"
                v-model="customOrder.website"
              />
            </div>
          </div>
          <textarea
            class="form-control"
            cols="30"
            rows="10"
            placeholder="歡迎留下額外訂單要求或細節"
            v-model="customOrder.message"
          ></textarea>

          <div class="text-right my-5">
            <button
              type="submit"
              class="btn btn-outline-dark rounded-0"
            >詢價訂購</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customOrder: {
        createTime: '',
        name: '',
        email: '',
        tel: '',
        brand: '',
        product: '',
        website: '',
        message: '',
        isDone: false,
      },
    };
  },
  methods: {
    // 送出表單
    uploadOrder() {
      const vm = this;
      // firebase 路徑
      const databaseRef = firebase.database().ref('parallel');
      // 取得建立時間
      vm.customOrder.createTime = Date.now();
      // 上傳 firebase
      databaseRef.push(vm.customOrder).then((res) => {
        vm.$bus.$emit('sweet-alert', {
          icon: 'success',
          title: '已成功送出表單',
        });

        // 每筆資料加入將 firebase 的隨機 id
        databaseRef.child(`${res.key}/id`).set(res.key);

        // 3秒後轉址
        setTimeout(() => {
          vm.$router.push(`/parallel_import/${res.key}`);
        }, 3000);
      });
    },
  },
};
</script>

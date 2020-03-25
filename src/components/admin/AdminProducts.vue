<template>
  <div>
    <div class="text-right mt-3">
      <button class="btn btn-primary" @click="openModal('createNewProduct')">建立新產品</button>
    </div>
    <div class="table-responsive">
      <table class="table table-hover mt-3">
        <thead class="thead-light">
          <th class="text-center" width="60">類型</th>

          <th class="text-center" width="120">品牌</th>
          <th class="text-center">產品型號</th>
          <th class="text-right" width="130">售價</th>
          <th class="text-right" width="100">是否啟用</th>
          <th class="text-center" width="150">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td class="text-center">
              <i class="fas fa-headphones" v-if="item.type === 'Headphone'"></i>
              <i class="far fa-hdd" v-else></i>
            </td>
            <td class="text-center">{{ item.category }}</td>
            <td class="text-center">{{ item.title }}</td>
            <td class="text-right">{{item.price | currency}}</td>
            <td class="text-right">
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="text-right d-flex justify-content-around">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openModal('editProduct', item)"
              >編輯</button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openModal('deleteProduct',item)"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分頁元件 -->
    <Pagination v-if="this.$store.state.products.length" />

    <!-- 產品新增、修改 Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productModalLabel">
              <span>{{modalTitle}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileLoading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    @change="uploadFile"
                    ref="files"
                  />
                </div>
                <img
                  :src="tempProduct.imageUrl"
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-row">
                  <div class="form-grop col-md-8">
                    <label for="category">品名</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="tempProduct.title"
                      placeholder="請輸入商品名稱"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="type">類型</label>
                    <select name="type" id="type" class="form-control" v-model="tempProduct.type">
                      <option :value="tempProduct.default" disabled>商品類型</option>
                      <option :value="item" v-for="item in type" :key="item">{{item}}</option>
                    </select>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">品牌</label>

                    <!-- 耳機品牌 -->
                    <select
                      name="category"
                      id="category"
                      class="form-control"
                      v-model="tempProduct.category"
                    >
                      <!-- 開頭初始值不知為什麼需要動態 value 才能顯示 -->
                      <option disabled :value="tempProduct.default">請選擇品牌</option>
                      <template v-if="tempProduct.type === 'Headphone'">
                        <option
                          :value="brand"
                          v-for="brand in brands.Headphone"
                          :key="brand"
                        >{{brand}}</option>
                      </template>
                      <option v-if="!tempProduct.type" disabled>請先選擇類型</option>
                      <template v-if="tempProduct.type ==='DAC'">
                        <option :value="brand" v-for="brand in brands.DAC" :key="brand">{{brand}}</option>
                      </template>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <div class="input-group border-bottom">
                    <input
                      type="text"
                      class="form-control border-0 mb-1"
                      v-model="tempProduct.description"
                      placeholder="請輸入產品描述"
                    />
                  </div>
                </div>
                <div class="form-group border-bottom">
                  <label for="content">產品特色</label>
                  <!-- // ! v-model 不能直接在寫成 tempProduct.content[0] 不知原因   -->
                  <div class="input-group border-bottom">
                    <input type="text" class="form-control border-0 mb-1" v-model="content[0]" />
                  </div>
                  <div class="input-group border-bottom">
                    <input type="text" class="form-control border-0 mb-1" v-model="content[1]" />
                  </div>
                  <div class="input-group border-bottom">
                    <input type="text" class="form-control border-0 mb-1" v-model="content[2]" />
                  </div>
                </div>

                <div class="custom-control custom-checkbox ml-2 mb-4">
                  <!-- 注意 true、false value -->
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="defaultChecked"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="custom-control-label" for="defaultChecked">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除 Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delProductModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import Vue 是為了能使用 Vue.set()
import Vue from 'vue';

export default {
  data() {
    return {
      tempProduct: {},
      content: [],
      modalTitle: '',
      isDoing: '',
      status: {
        fileLoading: false,
      },
    };
  },
  components: {
    Pagination: () => import('@/components/Pagination'),
  },
  computed: {
    // 監看 VueX 所有產品、類型、品牌
    products() {
      return this.$store.state.products;
    },
    type() {
      return this.$store.state.types;
    },
    brands() {
      return this.$store.state.brands;
    },
  },
  methods: {
    // Modal 事件
    openModal(isDoing, item) {
      const vm = this;
      // 判斷是建立新產品、編輯或刪除
      switch (isDoing) {
        case 'createNewProduct':
          vm.tempProduct = {};
          //*  需要使用 set 才能雙向綁定，若沒有設置，則建立產品時選擇 '未啟用商品'會出錯，原因是沒有傳送 is_enabled
          Vue.set(vm.tempProduct, 'is_enabled', 1);
          vm.content = [];
          vm.isDoing = 'createNewProduct';
          vm.modalTitle = '新增產品';
          $('#productModal').modal('show');
          break;
        case 'editProduct':
          vm.tempProduct = Object.assign({}, item);
          vm.content = item.content;

          vm.isDoing = 'editProduct';
          vm.modalTitle = '編輯產品';
          $('#productModal').modal('show');
          break;
        default:
          vm.tempProduct = Object.assign({}, item);
          vm.isDoing = 'deleteProduct';
          $('#delProductModal').modal('show');
          break;
      }
    },
    // 確認新增或修改產品
    updateProduct() {
      const vm = this;
      let apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let axiosMethod = 'post';

      vm.$store.dispatch('updateLoading', true);
      vm.tempProduct.content = vm.content;
      // 當它不是建立新產品時，切換 apiUrl 路徑，並將方法換成 put
      if (vm.isDoing === 'editProduct') {
        apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        axiosMethod = 'put';
      }

      axios[axiosMethod](apiUrl, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.$store.dispatch('getProducts');
          vm.$store.dispatch('updateLoading', false);
        } else {
          $('#productModal').modal('hide');
          vm.$store.dispatch('getProducts');
          vm.$store.dispatch('updateLoading', false);
        }
      });
    },
    deleteProduct() {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;

      axios.delete(apiUrl).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('getProducts');
          $('#delProductModal').modal('hide');
        }
      });
    },
    uploadFile() {
      const vm = this;
      // 注意檔案路徑
      const uploadedFile = vm.$refs.files.files[0];
      // * formData 物件，上傳圖片是以表單形式送出
      const formData = new FormData();
      // * 使用 append 新增欄位，欄位與 headers 會對應到六角的 API
      formData.append('file-to-upload', uploadedFile);
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;

      vm.$store.dispatch('updateLoading', true);
      vm.status.fileLoading = true;
      axios
        .post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.success) {
            // 這樣不會雙向綁定
            // vm.tempProduct.imageUrl = response.data.imageUrl;

            // ! 要使用 set 才能雙向綁定
            // 物件、屬性、寫入的資料
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
            vm.status.fileLoading = false;
            vm.$store.dispatch('updateLoading', false);
          } else {
            // TODO: 了解 BUS 課堂96
            vm.$bus.$emit('message:push', response.data.message, 'success');
            vm.$store.dispatch('updateLoading', false);
          }
        });
    },
  },

  created() {
    // 取得所有產品資訊
    this.$store.dispatch('getProducts');
  },
};
</script>

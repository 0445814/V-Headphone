<template>
  <div class="mt-5">
    <h2 class="mb-3">更新前台 Swiper 圖片</h2>
    <p class="text-danger">從 firebase 取得圖片網址再渲染時，進入畫面會有問題，詳 Swiper.vue</p>
    <div class="row mb-8">
      <div
        class="col-md-3 d-flex justify-content-center mb-3"
        v-for="(banner, index) in banners"
        :key="banner.id"
      >
        <div
          class="card"
          style="width: 18rem;"
        >
          <img
            :src="banner.image"
            class="card-img-top"
            height="200"
          >
          <div>
            <p>圖片順序 : {{index + 1}}</p>
          </div>
          <div class="card-body d-flex justify-content-between">
            <button
              class="btn btn-outline-primary"
              @click="openModal('updateBanner',banner)"
            >更換圖片</button>
            <button
              class="btn btn-outline-danger"
              @click="openModal('deleteBanner',banner)"
            >刪除</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <p class="h3 mb-3">預覽圖片</p>
        <img
          class="img-fluid"
          :src="newBanner"
          alt=""
        >
      </div>
      <div class="col-md-6">
        <form @submit.prevent="uploadBanner">
          <div class="form-group">
            <label
              class="h4 mb-3"
              for="banner-input"
            >新增圖片</label>
            <input
              type="text"
              id="banner-input"
              class="form-control mb-3"
              placeholder="請貼上圖片網址"
              v-model="newBanner"
            >
            <div class="text-right">
              <button
                type="submit"
                class="btn btn-warning"
              >上傳</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 更換圖片 Modal -->
    <div
      class="modal fade"
      id="updateModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="updateModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5
              class="modal-title"
              id="updateModalLabel"
            >更新圖片</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <h3>原本圖片</h3>
                <img
                  class="img-fluid"
                  height="200"
                  :src="oriBanner.image"
                  alt=""
                >
              </div>
              <div class="col-md-6">
                <h3>替換圖片</h3>
                <img
                  class="img-fluid"
                  height="200"
                  :src="tempBanner"
                  alt=""
                >
              </div>
              <input
                class="form-control mt-5"
                type="text"
                placeholder="請貼上圖片網址"
                v-model="tempBanner"
              >
            </div>

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-warning"
              @click="updateBanner"
            >更新</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5
              class="modal-title text-white"
              id="deleteModalLabel"
            >刪除圖片</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>確定要刪除這張圖片嗎?</h3>
            <img
              class="img-fluid"
              :src="oriBanner.image"
            >
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteBanner"
            >確定刪除</button>
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
      // 全部圖片
      banners: [],
      // 新增圖片
      newBanner: '',
      // 原本圖片
      oriBanner: '',
      // 欲替換圖片
      tempBanner: '',
    };
  },
  methods: {
    // 取得前台 Swiper 的全部圖片
    getBanners() {
      const vm = this;
      const databaseRef = firebase.database().ref('banners');

      vm.banners = [];

      databaseRef.once('value', (snapshot) => {
        snapshot.forEach((item) => {
          vm.banners.push(item.val());
        });
      });
    },
    // 新增圖片
    uploadBanner() {
      const vm = this;
      const databaseRef = firebase.database().ref('banners');
      databaseRef.push({ image: vm.newBanner }).then((res) => {
        // 每筆資料加入將 firebase 的隨機 id
        databaseRef.child(`${res.key}/id`).set(res.key);
      });
      vm.newBanner = '';
      vm.getBanners();
    },

    openModal(isDoing, banner) {
      const vm = this;
      switch (isDoing) {
        case 'updateBanner':
          vm.oriBanner = banner;
          vm.tempBanner = '';
          $('#updateModal').modal('show');
          break;
        default:
          vm.oriBanner = banner;
          $('#deleteModal').modal('show');
          break;
      }
    },

    updateBanner() {
      const vm = this;
      const databaseRef = firebase.database().ref('banners');
      databaseRef.child(`${vm.oriBanner.id}/image`).set(vm.tempBanner);
      $('#updateModal').modal('hide');
      vm.getBanners();
    },

    deleteBanner() {
      const vm = this;
      const databaseRef = firebase.database().ref('banners');
      databaseRef.child(vm.oriBanner.id).remove();
      $('#deleteModal').modal('hide');
      vm.getBanners();
    },
  },

  created() {
    this.getBanners();
  },
};
</script>

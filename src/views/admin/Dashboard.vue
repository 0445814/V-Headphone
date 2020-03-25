<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <button
          class="hamburger hamburger--collapse navbar-toggler border-0 d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          :class="{'is-active':isActive}"
          @click="isActive = !isActive"
        >
          <span class="hamburger-box">
            <span
              class="hamburger-inner"
              style
            ></span>
          </span>
        </button>
        <router-link
          to="/admin/products"
          class="navbar-brand"
          href="#"
        ><i class="fas fa-cog fa-spin mr-3 d-none d-lg-inline-block"></i>控制台 v4.7</router-link>
        <span
          class="text-white ml-auto"
          v-if="loginTime.length"
        >
          <i class="fal fa-clock"></i>
          上次登入
          {{loginTime[loginTime.length -2] | dateFormateDetail }}
        </span>
      </nav>
    </header>
    <main>
      <div class="container-fluid">
        <div class="row position-relative">
          <nav
            id="sidebar"
            class="sidebar col-md-2 bg-light"
            :class="{'active': isActive}"
          >
            <!-- 管理功能 -->
            <h5 class="mt-3 mb-0 text-muted">管理員</h5>
            <ul class="nav flex-column pt-3">
              <li class="nav-item">
                <router-link
                  class="nav-link rounded hvr-outline-in py-3"
                  :class="{'bg-dark':this.$route.path === '/admin/products' , 'text-white' : this.$route.path === '/admin/products'}"
                  to="/admin/products"
                >
                  <i class="fal fa-headphones mr-2"></i>
                  產品列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link rounded hvr-outline-in py-3"
                  :class="{'bg-dark':this.$route.path === '/admin/orders' , 'text-white' : this.$route.path === '/admin/orders'}"
                  to="/admin/orders"
                >
                  <i class="fal fa-list-alt mr-2"></i>
                  訂單列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link rounded hvr-outline-in py-3"
                  :class="{'bg-dark':this.$route.path === '/admin/parallel' , 'text-white' : this.$route.path === '/admin/parallel'}"
                  to="/admin/parallel"
                >
                  <i class="fal fa-exchange mr-2"></i>
                  平行輸入
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link rounded hvr-outline-in py-3"
                  :class="{'bg-dark':this.$route.path === '/admin/members' , 'text-white' : this.$route.path === '/admin/members'}"
                  to="/admin/members"
                >
                  <i class="fal fa-user-circle mr-2"></i>
                  會員資料
                </router-link>
              </li>
            </ul>

            <!-- 一般功能 -->
            <h5 class="mt-3 mb-0 text-muted">一般功能</h5>
            <ul class="nav flex-column pt-3">
              <li class="nav-item">
                <router-link
                  class="nav-link rounded hvr-outline-in py-3"
                  :class="{'bg-dark':this.$route.path === '/admin/coupons' , 'text-white' : this.$route.path === '/admin/coupons'}"
                  to="/admin/coupons"
                >
                  <i class="fal fa-money-check-edit-alt mr-2"></i>
                  優惠券
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link rounded hvr-outline-in py-3"
                  :class="{'bg-dark':this.$route.path === '/admin/uploadImages' , 'text-white' : this.$route.path === '/admin/uploadImages'}"
                  to="/admin/uploadImages"
                >
                  <i class="fal fa-images mr-2"></i>
                  更新圖片
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link rounded hvr-outline-in py-3"
                  :class="{'bg-dark':this.$route.path === '/admin/uploadPosts' , 'text-white' : this.$route.path === '/admin/uploadPosts'}"
                  to="/admin/uploadPosts"
                >
                  <i class="fal fa-file-signature mr-2"></i>
                  上傳文章
                </router-link>
              </li>
            </ul>

            <a
              class="d-block text-danger rounded hvr-outline-in py-3 pl-3 mt-5"
              href="#"
              @click.prevent="logout"
            >
              <i class="fal fa-running mr-2"></i>
              登出
            </a>
          </nav>

          <div
            id="adminContent"
            class="col-md-10"
          >
            <router-view></router-view>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isActive: false,
      loginTime: [],
    };
  },
  watch: {
    $route() {
      this.isActive = false;
    },
  },
  methods: {
    // 取得上次登入時間
    getLastLoginTime() {
      const databaseRef = firebase.database().ref('loginTime');
      databaseRef.once('value', (snapshot) => {
        snapshot.forEach((item) => {
          this.loginTime.push(item.val().time);
        });
      });
    },

    // 登出
    logout() {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/logout`;
      axios.post(apiUrl).then((res) => {
        if (res.data.success) {
          vm.$router.push('/');
        } else {
          vm.$bus.$emit('sweet-alert', {
            icon: 'error',
            title: '登出失敗，請稍後再試',
          });
        }
      });
    },
  },
  created() {
    this.getLastLoginTime();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/customMixins.scss";
@import "~hamburgers/_sass/hamburgers/hamburgers.scss";

.sidebar {
  height: 150vh;
  transition: all 0.5s ease-in-out;
  @include BS-md {
    position: absolute;
    left: -101%;
  }
  z-index: 10;
}
.active {
  left: 0%;
}

#adminContent {
  @include BS-md {
    position: absolute;
    right: 0%;
  }
}
a {
  color: black;
}
.hamburger-inner,
.hamburger-inner::after,
.hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after,
.hamburger.is-active .hamburger-inner::before {
  background: white !important;
}
</style>

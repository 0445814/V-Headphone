<template>
  <nav class="sidebar" :class="{ active: isActive, 'box-shadow': isActive }">
    <div class="sidebar-content w-100">
      <div class="close-btn text-secondary" @click="sidebarClose" v-show="isActive">
        <i class="fal fa-times fa-2x"></i>
      </div>

      <ul class="d-flex justify-content-center list-unstyled p-0 mt-6 mb-0">
        <router-link class="sidebar-item nav-link w-100" to="/user/login" tag="li">會員登入</router-link>
        <router-link class="sidebar-item nav-link w-100" to="/user/register" tag="li">註冊</router-link>
      </ul>

      <ul class="list-unstyled">
        <li class="sidebar-item">
          <a class="nav-link text-black py-4" href="#" @click.prevent="sidebarGo">
            新品上市
          </a>
        </li>
        <li class="py-4 px-3" :class="{ 'sidebar-item': !isRotate }" @click="isShow">
          代理品牌 <i class="arrow fal fa-angle-down pl-1" :class="{ rotate: isRotate }"></i>
        </li>
        <ul class="sidebar-brand-list list-unstyled">
          <a
            class="d-block py-2 pr-2 pl-5"
            v-for="category in this.$store.state.brands.Headphone"
            tag="li"
            @click="changeCategory(category)"
            :key="category"
          >
            {{ category }}</a
          >
          <a
            class="d-block py-2 pr-2 pl-5"
            v-for="category in this.$store.state.brands.DAC"
            tag="li"
            @click="changeCategory(category)"
            :key="category"
          >
            {{ category }}</a
          >
        </ul>
        <router-link class="sidebar-item nav-link text-black py-4 px-3" to="/parallel_import">
          平輸代購
        </router-link>
        <router-link class="sidebar-item nav-link text-black py-4 px-3 mb-5" to="/warranty">
          支援
        </router-link>

        <div class="sidebar-follow d-flex justify-content-center align-items-center flex-column">
          <h3 class="h6"><span>Connect With Us</span></h3>
          <div>
            <a
              class="facebook text-black h4 p-2"
              href="https://github.com/0445814/V-Headphone"
              title="Facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              class="twitter text-black h4 p-2"
              href="https://github.com/0445814/V-Headphone"
              title="Twitter"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              class="instagram text-black h4 p-2"
              href="https://github.com/0445814/V-Headphone"
              title="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              class="youTube text-black h4 p-2"
              href="https://github.com/0445814/V-Headphone"
              title="YouTube"
            >
              <i class="fab fa-youtube"></i>
            </a>

            <a
              class="github text-black h4 p-2"
              href="https://github.com/0445814/V-Headphone"
              title="Github"
            >
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isRotate: false,
    };
  },
  props: ['isActive'],
  methods: {
    sidebarGo() {
      this.$emit('sidebarGo');
    },
    sidebarClose() {
      this.$emit('sidebarClose');
    },
    changeCategory(selectedCategory) {
      const vm = this;
      vm.$store.dispatch('changeCategory', selectedCategory).then(() => {
        // 當前若不是 /product 路由，則轉址
        if (vm.$route.path !== '/product') {
          vm.$router.push('/product');
        }
        vm.sidebarClose();
      });
    },
    isShow() {
      $('.sidebar-brand-list')
        .stop()
        .slideToggle();

      this.isRotate = !this.isRotate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/customMixins.scss";

.sidebar {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-101%);
  transition: all 0.5s;
  width: 80%;
  max-width: 330px;
  height: 100%;
  background: white;
  color: black;
  z-index: 99999;

  @include BS-sm {
    width: 65%;
  }

  .sidebar-content {
    overflow: auto;
    height: 100%;
  }
  .sidebar-item {
    border-bottom: 1px solid silver;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .sidebar-brand-list {
    display: none;
    border-bottom: 1px solid silver;
    a {
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .close-btn {
    position: absolute;
    top: 15px;
    left: 110%;
  }
}

.box-shadow {
  box-shadow: 1px 10px 20px 0px silver;
}

.active {
  // display: inline-block;
  transform: translateX(0%);
  transition: all 0.5s;
}

.arrow {
  transition: all 0.5s;

  &.rotate {
    transform: rotate(-180deg);
    transition: all 0.5s;
  }
}
</style>

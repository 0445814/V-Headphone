<template>
  <div id="app">
    <!-- 進入特效 -->
    <EnterLoading v-if="isEnterLoading">
      <p class="text-white h3 ml-3">歡迎進入發燒世界</p>
    </EnterLoading>
    <router-view  />
    <!-- 過場特效 -->
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
export default {
  components: {
    EnterLoading: () => import('@/components/common/EnterLoading'),
  },
  computed: {
    isEnterLoading() {
      return this.$store.state.isEnterLoading;
    },
    // 過場特效
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  /**
   ** ***** 全域註冊 Event bus *****
   *
   * 1. Sweet alert 事件，參數為 icon (成功或失敗)、title (顯示的文字訊息)
   *
   * 2. goTop 事件，滾動至網頁頂部(避免轉換頁面時，畫面跑掉)，並藉由 Navbar.vue 的 watch 監聽在每次切換路由時滾動至頂部
   */
  created() {
    const vm = this;

    window.onload = () => {
      vm.$store.commit('ENTERLOADING', false);
    };

    // Sweet alert 成功或失敗
    vm.$bus.$on('sweet-alert', (params) => {
      vm.$swal.fire({
        position: 'top-end',
        ...params,
        showConfirmButton: false,
        timer: 2000,
        allowOutsideClick: false,
      });
    });

    // Sweet alert 傳達訊息
    vm.$bus.$on('sweet-alert-info', (params) => {
      vm.$swal.fire({
        ...params,
        showCloseButton: false,
        confirmButtonText: '已複製',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-dark btn-lg',
        },
      });
    });

    // goTop
    vm.$bus.$on('goTop', () => {
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $('html,body').offset().top,
          },
          1000,
        );
    });
  },
};
</script>

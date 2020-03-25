<template>
  <section class="container mb-5 mt-9">

    <h2 class="h3 text-center my-5">
      <span class="border-bottom">{{formTitle}}</span>
    </h2>
    <p
      class="text-center mb-4"
      v-if="formTitle === '新會員註冊'"
    >請輸入您的 Email，並於信箱中取得「註冊密碼」後輸入於下方確認註冊欄</p>

    <div class="row justify-content-center">
      <div class="col-lg-5 col-10">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  watch: {
    // 監聽切換路由，當路由是 /user/login 時，觸發 VueX 去改變表單的 title
    $route() {
      const vm = this;
      if (vm.$route.path === '/user/login') {
        vm.$store.dispatch('changeFormTitle', '會員登入');
      }
    },
  },
  computed: {
    formTitle() {
      return this.$store.state.formTitle;
    },
  },
};
</script>

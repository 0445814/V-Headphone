<template>
  <section class="row">
    <h2 class="h3 text-center my-5">
      會員登入
    </h2>
    <div class="flex-column align-items-center">
      <div class="col-md-6">
        <form class="mb-5">
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
                id="account"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="input-group border-bottom mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text bg-white border-0">
                  <i class="fal fa-key"></i>
                </div>
              </div>
              <input
                id="password"
                type="password"
                class="form-control border-0"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div class="custom-control custom-checkbox ml-2 mb-4">
            <input type="checkbox" class="custom-control-input" id="defaultUnchecked" />
            <label class="custom-control-label" for="defaultUnchecked">記住我</label>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-outline-dark rounded-0 px-5 mb-5">登入</button>
          </div>
        </form>
        <hr />
      </div>
      <div class="text-center">
        <router-link to="/user/register" class="text-center text-secondary">還沒註冊 ?</router-link>
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
  // computed: {
  //   formTitle() {
  //     return this.$store.state.formTitle;
  //   },
  // },
};
</script>

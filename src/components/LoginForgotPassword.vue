<template>
  <form @submit.prevent="sendMail">
    <h2 class="h6 text-secondary text-center mb-5">請輸入您的 Email 或是 手機號碼</h2>
    <div class="form-group mb-4">
      <div class="input-group border-bottom">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white border-0">
            <i class="fal fa-envelope mr-1"></i>
            <i class="fal fa-mobile-android-alt ml-1"></i>
          </div>
        </div>
        <input
          type="text"
          class="form-control border-0"
          placeholder="Email 或 手機號碼"
          v-model="email"
          required
        />
      </div>
      <div class="text-center  my-5">
        <button
          type="submit"
          class="btn btn-outline-dark rounded-0 px-5"
        >送出</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    sendMail() {
      // TODO 實作 Email 寄送
      this.$router.push('/');
    },
  },
  created() {
    this.$store.dispatch('changeFormTitle', '讓我們幫您找回帳號或密碼');
  },
};
</script>

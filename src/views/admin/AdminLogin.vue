<template>
  <div
    id="adminLogin"
    class="container-fluid w-100"
  >
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-lg-3 col-md-6">
        <form
          @submit.prevent="adminLogin"
          class="p-4"
        >
          <h2 class="text-center text-white mb-4">後台登入</h2>
          <div class="form-group mb-4">
            <label
              for="adminAccount"
              class="text-white"
            >帳號</label>
            <input
              type="email"
              class="form-control"
              id="adminAccount"
              v-model="adminData.username"
              placeholder="V-Headphone@gmail.com"
              required
            />
          </div>
          <div class="form-group mb-4">
            <label
              for="adminPassword"
              class="text-white"
            >密碼</label>
            <input
              type="password"
              class="form-control"
              id="adminPassword"
              placeholder="Password"
              v-model="adminData.password"
              required
            />
          </div>
          <div class="form-group mb-5 d-flex justify-content-between">
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                class="custom-control-input"
                id="root"
                name="authority"
                required
              >
              <label
                class="custom-control-label text-white"
                for="root"
              >管理員</label>

            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                class="custom-control-input"
                id="general"
                name="authority"
                required
              >
              <label
                class="custom-control-label text-white"
                for="general"
              >一般員工</label>
            </div>

          </div>
          <button
            type="submit"
            class="btn btn-outline-light btn-block"
          ><i
              class="fas fa-spinner fa-pulse mr-1"
              v-if="isLoading"
            ></i>登入</button>
        </form>
        <router-link
          class="d-block h5 text-white p-3"
          to="/"
        ><i class="fad fa-sign-out mr-1"></i>回首頁</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 背景圖案
#adminLogin {
  background: url(https://images.unsplash.com/photo-1481207727306-1a9f151fca7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)
    no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  opacity: 0.95;
}

form {
  background: rgb(0, 0, 0, 0.55);
  border-radius: 3%;
}
</style>

<script>
// TODO: 回首頁按鈕
export default {
  data() {
    return {
      adminData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    adminLogin() {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/admin/signin`;


      // axios 登入
      axios.post(apiUrl, vm.adminData).then((response) => {
        vm.$store.dispatch('updateLoading', true);
        // 登入成功則進入 Dashboard
        if (response.data.success) {
          // 紀錄登入時間
          vm.recordLoginTime();

          vm.$router.push('/admin/products');
          vm.$store.dispatch('updateLoading', false);
        } else {
          vm.$bus.$emit('sweet-alert', {
            icon: 'error',
            title: '帳號或密碼錯誤，請再確認',
          });
          vm.$store.dispatch('updateLoading', false);
        }
      });
    },

    // 紀錄登入時間
    recordLoginTime() {
      const nowTime = Math.floor(Date.now());
      const databaseRef = firebase.database().ref('loginTime');
      databaseRef.push({ time: nowTime });
    },
  },
};
</script>

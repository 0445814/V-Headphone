<template>
  <form
    class="mb-5"
    @submit.prevent="createNewMember"
  >
    <div class="form-group">
      <div class="input-group border-bottom">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white border-0">
            <i class="fal fa-user-circle"></i>
          </div>
        </div>
        <input
          type="text"
          class="form-control border-0"
          placeholder="使用者名稱"
          v-model="newUser.name"
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
          type="password"
          class="form-control border-0"
          placeholder="設定密碼，請混合使用 8 字元以上的英數字"
          v-model="newUser.password"
          required
        />
      </div>
    </div>

    <div class="form-group">
      <div class="input-group border-bottom mb-4">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white border-0">
            <i class="fad fa-key"></i>
          </div>
        </div>
        <input
          type="password"
          class="form-control border-0"
          placeholder="確認密碼"
          v-model="password_again"
          @change="checkSamePassword"
          required
        />
      </div>
      <p
        class="text-danger ml-3"
        v-if="isSamePassword"
      ><i class="fal fa-exclamation-triangle pr-3"></i>兩次密碼不相同，請再確認。</p>
    </div>
    <div class="form-group">
      <div class="input-group border-bottom mb-4">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white border-0">
            <i class="fal fa-mobile-alt pl-1"></i>
          </div>
        </div>
        <input
          type="tel"
          class="form-control border-0"
          placeholder="市話或手機"
          v-model="newUser.tel"
          required
        />
      </div>
    </div>
    <div class="form-group mb-5">
      <div class="input-group border-bottom mb-4">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white border-0">
            <i class="fal fa-home-lg"></i>
          </div>
        </div>
        <input
          type="text"
          class="form-control border-0"
          placeholder="住址"
          v-model="newUser.address"
          required
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newUser: {},
      password_again: '',
      isSamePassword: false,
    };
  },
  methods: {
    // 建立新用戶
    createNewMember() {
      const vm = this;
      const databaseRef = firebase.database().ref('members');
      if (vm.newUser.password === vm.password_again) {
        databaseRef.push(vm.newUser);
      }
    },
    // 確認密碼是否相同
    checkSamePassword() {
      const vm = this;
      if (vm.newUser.password !== vm.password_again) {
        vm.isSamePassword = true;
      } else {
        vm.isSamePassword = false;
      }
    },
  },
  created() {
    this.$store.dispatch('changeFormTitle', '填寫個人資訊');
  },
};
</script>

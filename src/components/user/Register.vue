<template>
  <section class="row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-center">新會員註冊</h2>
      <form class="mb-5">
        <div class="form-group mb-4">
          <div class="input-group border-bottom">
            <div class="input-group-prepend">
              <div class="input-group-text bg-white border-0">
                <i class="fal fa-envelope"></i>
              </div>
            </div>
            <input
              type="email"
              class="form-control border-0"
              id="registerAccount"
              placeholder="Email"
              v-model="userEmail"
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
            <input type="password" class="form-control border-0" placeholder="確認密碼" required />
          </div>
          <p class="text-danger ml-3" v-if="isSamePassword">
            <i class="fal fa-exclamation-triangle pr-3"></i>兩次密碼不相同，請再確認。
          </p>
        </div>
        <div class="form-group">
          <div class="input-group border-bottom mb-4">
            <div class="input-group-prepend">
              <div class="input-group-text bg-white border-0">
                <i class="fal fa-mobile-alt pl-1"></i>
              </div>
            </div>
            <input type="tel" class="form-control border-0" placeholder="市話或手機" required />
          </div>
        </div>
        <div class="form-group mb-5">
          <div class="input-group border-bottom mb-4">
            <div class="input-group-prepend">
              <div class="input-group-text bg-white border-0">
                <i class="fal fa-home-lg"></i>
              </div>
            </div>
            <input type="text" class="form-control border-0" placeholder="住址" required />
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-outline-dark rounded-0 px-5 mb-1">我同意會員條款，註冊</button>
          <a class="d-block text-secondary" href="#" @click.prevent="openModal">
            <span class="hvr-underline-reveal px-1">
              <em>會員條款</em>
            </span>
          </a>
        </div>
      </form>

<hr>
      <div class="text-center">
        <router-link class="text-center text-secondary" to="/user/login"
          >已經有帳號了 ?</router-link
        >
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="userRulesModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="userRulesModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="userRulesModalLabel">會員條款</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ol>
              <li class="mb-3">
                本會員服務條款所稱之「會員」，為依照本公司所定之加入會員程序加入完成並通過認證者。
              </li>
              <li class="mb-3">
                當您使用本公司服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。
              </li>
              <li class="mb-3">
                本公司保留有審核加入會員資格之權利，另外已加入會員者，本公司亦保留有解除其會員資格之權利。
              </li>
              <li class="mb-3">
                本會員服務條款之修訂，適用於所有會員，當本公司修訂本服務條款時，將於本公司上公告。
              </li>
            </ol>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">OK</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
      confirmCode: '',
      counter: '',
    };
  },

  methods: {
    backToLogin() {
      this.$store.dispatch('changeFormTitle', '新會員註冊');
      this.$router.push('/user/login');
    },
    openModal() {
      $('#userRulesModal').modal('show');
    },
    closeModal() {
      $('#userRulesModal').modal('hide');
    },
  },
  created() {
    this.$store.dispatch('changeFormTitle', '新會員註冊');
  },
};
</script>

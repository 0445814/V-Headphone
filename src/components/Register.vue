<template>
  <div id="userRegister">
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

      <div class="text-center">
        <button class="btn btn-outline-dark rounded-0 px-5 mb-1">我同意會員條款，送信</button>
        <a
          class="d-block text-secondary"
          href="#"
          @click.prevent="openModal"
        >
          <span class="hvr-underline-reveal px-1">
            <em>會員條款</em>
          </span>
        </a>
      </div>
    </form>

    <form>
      <div class="form-group">
        <div class="input-group border-bottom mb-4">
          <div class="input-group-prepend">
            <div class="input-group-text bg-white border-0">
              <i class="fal fa-key"></i>
            </div>
          </div>
          <input
            type="text"
            class="form-control border-0"
            id="confirmCode"
            placeholder="確認註冊碼"
            v-model="confirmCode"
          />
        </div>
      </div>
      <div class="text-center">
        <a
          class="forgotPassword d-block text-secondary mb-5"
          href="#"
          @click.prevent="backToLogin"
        >
          <span class="hvr-underline-reveal">已經註冊了 ?</span>
        </a>
        <router-link
          class="btn btn-outline-dark rounded-0 px-5"
          to="/user/register_information"
        >下一步</router-link>
      </div>
    </form>

    <!-- Modal -->
    <div
      class="modal fade"
      id="userRulesModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="userRulesModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5
              class="modal-title text-white"
              id="userRulesModalLabel"
            >會員條款</h5>
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
            <ol>
              <li class="mb-3">本會員服務條款所稱之「會員」，為依照本公司所定之加入會員程序加入完成並通過認證者。</li>
              <li class="mb-3">當您使用本公司服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。</li>
              <li class="mb-3">本公司保留有審核加入會員資格之權利，另外已加入會員者，本公司亦保留有解除其會員資格之權利。</li>
              <li class="mb-3">本會員服務條款之修訂，適用於所有會員，當本公司修訂本服務條款時，將於本公司上公告。</li>
            </ol>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal"
            >OK</button>
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

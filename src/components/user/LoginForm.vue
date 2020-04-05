<template>
  <div id="userLogin">
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
        <input
          type="checkbox"
          class="custom-control-input"
          id="defaultUnchecked"
        />
        <label
          class="custom-control-label"
          for="defaultUnchecked"
        >記住我</label>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-outline-dark rounded-0 px-5 mb-5"
        >登入</button>
      </div>
    </form>

    <hr />

    <div class="text-center">
      <router-link
        class="forgotPassword d-block text-secondary mb-5"
        to="/user/forgot_password"
      >
        <span class="hvr-underline-reveal">忘記密碼 ?</span>
      </router-link>
      <router-link
        to="/user/register"
        class="btn btn-outline-secondary rounded-0 px-5"
      >註冊</router-link>
    </div>
  </div>
</template>

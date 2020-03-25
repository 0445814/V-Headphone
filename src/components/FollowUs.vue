<template>
  <section
    id="followUs"
    class="follow d-flex align-items-center"
  >
    <div class="container">
      <h3 class="h5 text-center mb-3">
        <span class="font-weight-bold">Follow Us</span>
      </h3>
      <div class="row">
        <div class="col">
          <div class="follow-btn text-center d-flex justify-content-center">
            <a
              class="facebook d-block h3 p-3"
              href="https://github.com/0445814/V-Headphone"
              title="Facebook"
              v-scroll-reveal="{origin: 'left',delay: 2000}"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              class="twitter d-block h3 p-3"
              href="https://github.com/0445814/V-Headphone"
              title="Twitter"
              v-scroll-reveal="{origin: 'left',delay: 1500}"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              class="instagram d-block h3 p-3"
              href="https://github.com/0445814/V-Headphone"
              title="Instagram"
              v-scroll-reveal="{origin: 'left',delay: 1000}"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              class="youTube d-block h3 p-3"
              href="https://github.com/0445814/V-Headphone"
              title="YouTube"
              v-scroll-reveal="{origin: 'left',delay: 500}"
            >
              <i class="fab fa-youtube"></i>
            </a>

            <a
              class="github d-block h3 p-3"
              href="https://github.com/0445814/V-Headphone"
              title="Github"
              v-scroll-reveal="{origin: 'left',delay: 0}"
            >
              <i class="fab fa-github"></i>
            </a>
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
      isHover: false,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/customMixins.scss";
#followUs {
  height: 70vh;
  @include BS-xl {
    height: 30vh;
  }
}
</style>

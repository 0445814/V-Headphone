<template>
  <section id="event">
    <h3 class="h5 text-secondary text-center py-5">
      <span class="border-bottom">EVENT</span>
    </h3>

    <div class="bg-custom">
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-md-6 text-light d-flex justify-content-center align-items-center"
            v-scroll-reveal="{origin: 'top'}"
            style="overflow: hidden"
          >
            <div class="event-information">
              <h3
                class="display-4 my-4"
                style="font-family: 'Cormorant Garamond', serif"
              >Always Listening</h3>
              <p class="mb-4">
                與愛樂者來場輕鬆的耳機交流會吧~
                <i class="far fa-music"></i>
              </p>
              <ul class="list-unstyled mb-5">
                <li>
                  <i class="fal fa-clock"></i> 每月第三個禮拜六 16:00
                </li>
                <li>
                  <i class="fas fa-map-marker-alt pr-1"></i> 高雄市楠梓區 123 段 45 號-本店 2F
                </li>
              </ul>
              <p>
                <span class="font-weight-bold">無需任何費用</span>，不用預約，現場備有免費咖啡與茶點
              </p>
              <p>歡迎自帶耳機與設備來分享喔！</p>
            </div>

          </div>
          <div class="col-md-6 p-0">
            <div class="event-img"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../assets/scss/customMixins.scss";

.event-img {
  min-height: 450px;
  background: url(https://i.imgur.com/gd0KrJf.jpg) no-repeat;
  background-size: cover;
}
</style>

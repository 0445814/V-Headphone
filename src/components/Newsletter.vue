<template>
  <div>
    <h5 class="text-secondary text-center mb-5 py-5">
      <span class="border-bottom">NEWS LETTER</span>
    </h5>
    <div
      class="bg"
      style="backgroundImage: url(https://get.pxhere.com/photo/technology-gadget-audio-headphones-audio-equipment-electronic-device-149281.jpg) "
    >
      <div class="container">
        <div class="row">
          <div class="col">
            <h2 class="text-white my-5 pt-5">直接訂閱我們！</h2>

            <form>
              <div class="form-row align-items-center">
                <div class="col-lg-auto col">
                  <label class="sr-only" for="inlineFormInput">Name*</label>
                  <input
                    type="text"
                    class="form-control mb-2 text-light"
                    id="inlineFormInput"
                    placeholder="Name*"
                  />
                </div>
                <div class="col-lg-3 col-12">
                  <label class="sr-only" for="inlineFormInputGroup">Email*</label>
                  <div class="input-group mb-2">
                    <input
                      type="email"
                      class="form-control text-light"
                      id="inlineFormInputGroup"
                      placeholder="Email*"
                    />
                  </div>
                </div>
                <div class="col-lg-auto col">
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="autoSizingCheck" />
                    <label class="form-check-label" for="autoSizingCheck">Remember me</label>
                  </div>
                </div>
                <div class="col-lg-auto col">
                  <button type="submit" class="btn btn-outline-light mb-2">送出</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  min-height: 300px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.form-control {
  background: rgb(0, 0, 0, 0);
  border: none;
  border-bottom: 1px solid white;
  border-radius: 0;
}
</style>

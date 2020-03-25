<template>
  <div class="container mb-5 mt-9">
    <div class="row justify-content-center">
      <div class="col-6">
      <h2 class="h3 text-success text-center">這是您的詢價資料</h2>
      <p class="text-secondary text-center mb-4">我們將於 6 小時內回覆</p>
        <div class="card p-0 card-shadow mb-5">
          <div class="card-body p-0">
            <table class="table">
              <tbody>
                <tr>
                  <th class="border-top-0" width="280">
                    <i class="fal fa-calendar-alt mr-2"></i>
                    <span class="font-weight-bold">詢問日期</span>
                  </th>
                  <td class="border-top-0">{{parallelOrder.createTime | dateFormateDetail}}</td>
                </tr>
                <tr>
                  <th>
                    <i class="fal fa-user mr-2"></i>
                    <span class="font-weight-bold">姓名</span>
                  </th>
                  <td>{{parallelOrder.name}}</td>
                </tr>
                <tr>
                  <th>
                    <i class="fal fa-mobile-alt mr-2 ml-1"></i>
                    <span class="font-weight-bold">電話</span>
                  </th>
                  <td>{{parallelOrder.tel}}</td>
                </tr>
                <tr>
                  <th>
                    <i class="fal fa-envelope mr-2"></i>
                    <span class="font-weight-bold">Email</span>
                  </th>
                  <td>{{parallelOrder.email}}</td>
                </tr>
                <tr>
                  <th>
                    <i class="fal fa-copyright mr-2"></i>
                    <span class="font-weight-bold">品牌</span>
                  </th>
                  <td>{{parallelOrder.brand}}</td>
                </tr>
                <tr>
                  <th>
                    <i class="fal fa-headphones mr-2"></i>
                    <span class="font-weight-bold">商品型號</span>
                  </th>
                  <td>{{parallelOrder.product}}</td>
                </tr>
                <tr>
                  <th>
                    <i class="fal fa-comment-alt mr-2"></i>
                    <span class="font-weight-bold">備註</span>
                  </th>
                  <td>{{parallelOrder.message}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mb-5">
      <router-link class="btn btn-outline-secondary rounded-0 mx-4 px-4" to="/parallel_import">繼續詢價</router-link>
      <router-link class="btn btn-outline-dark rounded-0 mx-4 px-4" to="/">回首頁</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parallelOrder: {},
    };
  },
  methods: {
    // 取得 firebase 裡的平行輸入表單資料
    getParallelOrder() {
      const vm = this;
      const parallelId = vm.$route.params.parallel_id;
      const databaseRef = firebase.database().ref('parallel');
      databaseRef.once('value', (snapshot) => {
        snapshot.forEach((item) => {
          if (item.val().id === parallelId) {
            vm.parallelOrder = item.val();
          }
        });
      });
    },
  },
  created() {
    this.getParallelOrder();
  },
};
</script>

<template>
  <div class="table-responsive mt-5">
    <table class="table table-hover">
      <thead class="thead-light">
        <th width="200">建立時間</th>
        <th width="250">使用者</th>
        <th width="200">聯絡</th>
        <th width="100">品牌</th>
        <th>型號</th>
        <th width="100">參考網址</th>
        <th>備註</th>
        <th width="100">追蹤情況</th>
      </thead>
      <tbody>
        <tr v-for="item in parallelOrders" :key="item.id">
          <td>{{item.createTime | dateFormateDetail}}</td>
          <td>{{item.email}}</td>
          <td>{{item.tel}}</td>
          <td>{{item.brand}}</td>
          <td>{{item.product}}</td>
          <td><a :href="item.website" target="_blank" v-if="item.website">Url</a><span v-else>未提供</span></td>
          <td>{{item.message}}</td>
          <td>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" v-model="item.isDone" @click="done(item.id)">
              <label class="form-check-label">
                <span v-if="item.isDone">已處理</span>
                <span class="text-danger font-weight-bold" v-else>未處理</span>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parallelOrders: [],
    };
  },

  methods: {
    // 取得所有平行輸入內容
    getParallelOrders() {
      const databaseRef = firebase.database().ref('parallel');
      const parallelOrders = [];
      databaseRef.once('value', (snapshot) => {
        snapshot.forEach((item) => {
          parallelOrders.push(item.val());
        });
      });

      this.parallelOrders = parallelOrders;
    },
    // 是否已完成
    done(id) {
      const databaseRef = firebase.database().ref(`parallel/${id}`);
      databaseRef.once('value', (snapshot) => {
        databaseRef.child('/isDone').set(!snapshot.val().isDone);
      });
    },
  },

  created() {
    this.getParallelOrders();
  },
};
</script>

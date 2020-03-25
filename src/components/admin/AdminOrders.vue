<template>
  <div class="table-responsive mt-5">
    <table class="table table-hover mt-3">
      <thead class="thead-light">
        <th width="150">購買時間</th>
        <th>會員</th>
        <th>內容</th>
        <th class="text-right">應付金額</th>
        <th class="text-right" width="100">是否付款</th>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{item.create_at | dateFormate}}</td>
          <td>{{item.user.email}}</td>
          <td>
            <p
              v-for="(order,key) in item.products"
              :key="key"
            >{{order.product.title}} :{{order.qty}}</p>
          </td>
          <td class="text-right">{{item.total | currency}}</td>
          <td class="text-right">
            <span v-if="item.is_paid">已付款</span>
            <span v-else class="text-danger">未付款</span>
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
      orders: [],
    };
  },
  methods: {
    // 獲得訂單
    getOrders(page = 1) {
      const vm = this;
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      vm.$store.dispatch('updateLoading', true);

      axios.get(apiUrl).then((response) => {
        vm.orders = response.data.orders;
        vm.$store.dispatch('updateLoading', false);
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

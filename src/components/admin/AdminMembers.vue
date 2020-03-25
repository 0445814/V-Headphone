<template>
  <div class="table-responsive mt-5">
    <table class="table table-hover">
      <thead class="thead-light">
        <th>會員</th>
        <th>電話</th>
        <th>住址</th>
      </thead>
      <tbody>
        <tr
          v-for="member in members"
          :key="member.name"
        >
          <td>{{member.name}}</td>
          <td>{{member.tel}}</td>
          <td>{{member.address}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: [],
    };
  },
  methods: {
    // 取得會員資料
    getMembers() {
      const vm = this;
      const databaseRef = firebase.database().ref('members');
      databaseRef.once('value', (snapshot) => {
        snapshot.forEach((item) => {
          vm.members.push(item.val());
        });
      });
    },
  },

  created() {
    this.getMembers();
  },
};
</script>

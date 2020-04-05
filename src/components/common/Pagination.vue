<template>
  <!-- 分頁 -->
  <div>
    <nav>
      <ul class="pagination justify-content-center m-0">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="goPage(pagination.current_page -1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :class="{'active': page === pagination.current_page}"
          :key="page"
        >
          <a class="page-link" href="#" @click.prevent="goPage(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="goPage(pagination.current_page +1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goPage(page) {
      this.$store.dispatch('getProducts', page);
    },
  },
  computed: {
    pagination() {
      return this.$store.state.pagination;
    },
  },
};
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>

    <!-- 所有會變動的頁面都在 main 標籤 -->
    <main>

      <router-view  />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>


<script>
export default {
  components: {

    // 最上方導覽列
    Navbar: () => import('@/components/Navbar'),

    // 最下方 footer
    Footer: () => import('@/components/Footer'),
  },
};
</script>

<template>
  <div id="app">
    <header>
      <AppHeader />
    </header>
    <!-- основной контент -->
    <main class="main-content">
      <router-view :key="$route.fullPath" />
    </main>
    <!-- футер -->
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header,
main,
footer {
  flex-shrink: 0;
}


.main-content {
  flex: 1 0 auto;
  padding: 1rem;
}
</style>

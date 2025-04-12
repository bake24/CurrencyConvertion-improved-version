<template>
  <header class="app-header">
    <div class="header-content">
      <!-- Левый блок: логотип и название -->
      <div class="header-left">
        <div class="logo-container">
          <img class="site-logo" :src="logoUrl" alt="CurrencyApp logo" />
          <div class="site-title">CurrencyApp</div>
        </div>
      </div>
      <!-- Центральный блок: навигация -->
      <div class="header-center">
        <nav class="nav">
          <router-link to="/" class="nav-link">Главная</router-link>
          <router-link to="/convert" class="nav-link">Конвертация</router-link>
        </nav>
      </div>
      <!-- Правый блок: селектор валют -->
      <div class="header-right">
        <BaseCurrencySelector />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseCurrencySelector from '@/components/features/BaseCurrencySelector.vue';
const logoUrl = new URL('@/assets/icons/favicon.png', import.meta.url).href;
</script>

<style lang="scss" scoped>
.app-header {
  background-color: #224b9f;
  padding: 1rem 2rem;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Левый блок: логотип и название */
  .header-left {
    display: flex;
    align-items: center;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 15px; /* 15 пикселей между логотипом и текстом */
    .site-logo {
      width: 40px;
      height: 40px;
      /* Делает логотип белым */
      filter: brightness(0) invert(1);
    }
  }

  .site-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  /* Центральный блок: навигация */
  .header-center {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-right: 80px; /* сдвиг навигации на 30px к левой стороне */
  }

  .nav {
    display: flex;
    gap: 1rem;
    .nav-link {
      text-decoration: none;
      color: #fff;
      font-weight: 500;
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }

  /* Правый блок: селектор валют */
  .header-right {
    display: flex;
    justify-content: flex-end;
  }

  /* Стили для селектора внутри BaseCurrencySelector (если нужно переопределить) */
  .dropdown-container select {
    border-radius: 8px;
    padding: 0.3rem 0.6rem;
    border: none;
    font-size: 1rem;
  }
}

</style>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>© 2025 ConvertApp. Все права защищены.</p>
      <div class="social-icons">
        <a href="https://www.linkedin.com/in/bakdaulet-duisenbekov-a41277265/" aria-label="LinkedIn">
          <img :src="linkedinIcon" alt="LinkedIn icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

const linkedinIcon = new URL('@/assets/icons/linkedin.png', import.meta.url).href;

</script>

<style lang="scss" scoped>
.app-footer {
  background-color: #ccc;
  padding: 1rem;
  text-align: center;

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    p {
      margin: 0;
      font-size: 0.9rem;
    }

    .social-icons {
      display: flex;
      gap: 1rem;
      img {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>

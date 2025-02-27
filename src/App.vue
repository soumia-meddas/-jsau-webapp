<template>
  <div class="app-wrapper">
    <!-- Header -->
    <AppHeader />

    <!-- Conteneur principal -->
    <main >
      <APPfetch />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import APPfetch from './components/AppFetch.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    APPfetch,
  },
};
</script>

<style>
/* Espacement global */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;  
  align-items: center; 
  background: url('/image.jpg') no-repeat center center fixed;
  background-size: cover;
}

</style>

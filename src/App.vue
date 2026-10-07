<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import { useRaidSync } from "./composables/useRaidSync";
import AppSidebar from "./components/layout/AppSidebar.vue";

const authStore = useAuthStore();
useRaidSync();

onMounted(() => {
  authStore.checkAuth();
});
</script>

<template>
  <div class="app-layout">
    <AppSidebar v-if="authStore.isAuthenticated" />

    <main class="content" :class="{ 'auth-page': !authStore.isAuthenticated }">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 40px 60px;
  overflow-y: auto;
  position: relative;
}

.content.auth-page {
  padding: 0;
}
</style>
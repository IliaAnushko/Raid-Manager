<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  errorMessage: { type: String, default: '' }
});
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="logo">⚔️ Raid Manager ⚔️</div>
      <h2>{{ title }}</h2>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>

      <div v-if="errorMessage" class="error-banner">
        ⚠️ {{ errorMessage }}
      </div>

      <slot></slot>

      <div class="auth-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #16161e;
  border: 1px solid rgba(167, 119, 227, 0.3);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  text-align: center;
}

.logo {
  font-size: 1.6rem;
  font-weight: 800;
  color: #a777e3;
  margin-bottom: 15px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 6px;
}

.subtitle {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 25px;
}

.error-banner {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  text-align: left;
}

.auth-footer {
  margin-top: 25px;
  font-size: 0.9rem;
  color: #777;
  display: flex;
  justify-content: center;
  gap: 8px;
}

:deep(.auth-footer a) {
  color: #a777e3;
  text-decoration: none;
  font-weight: 500;
}

:deep(.auth-footer a:hover) {
  text-decoration: underline;
}
</style>
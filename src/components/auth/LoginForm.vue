<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const usernameOrEmail = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

async function handleSubmit() {
  errorMessage.value = '';
  isLoading.value = true;
  try {
    await authStore.login(usernameOrEmail.value, password.value);
    router.push('/roster');
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Неверный логин или пароль';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <div v-if="errorMessage" class="error-banner">
      ⚠️ {{ errorMessage }}
    </div>

    <input v-model="usernameOrEmail" placeholder="Логин или Email" required />
    <input v-model="password" type="password" placeholder="Пароль" required />
    
    <button type="submit" class="save-btn full-width" :disabled="isLoading">
      {{ isLoading ? 'Проверка...' : 'Войти' }}
    </button>
  </form>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
}

.full-width {
  width: 100%;
  margin-top: 5px;
}

.error-banner {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  text-align: left;
}
</style>
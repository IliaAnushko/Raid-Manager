<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

async function handleSubmit() {
  errorMessage.value = '';

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Пароли не совпадают';
    return;
  }
  if (password.value.length < 6) {
    errorMessage.value = 'Пароль должен быть от 6 символов';
    return;
  }

  isLoading.value = true;
  try {
    await authStore.register(email.value, username.value, password.value);
    router.push('/roster');
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Не удалось зарегистрироваться';
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

    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="username" placeholder="Имя пользователя (Никнейм)" required />
    <input v-model="password" type="password" placeholder="Пароль (от 6 символов)" required />
    <input v-model="confirmPassword" type="password" placeholder="Повторите пароль" required />
    
    <button type="submit" class="save-btn full-width" :disabled="isLoading">
      {{ isLoading ? 'Создание...' : 'Зарегистрироваться' }}
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
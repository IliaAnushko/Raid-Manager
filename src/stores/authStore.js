import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api/axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const storedUser = localStorage.getItem('user');
  const user = ref(storedUser ? JSON.parse(storedUser) : null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');
  const isOfficer = computed(() => user.value?.role === 'ADMIN' || user.value?.role === 'OFFICER');

  // 1. Регистрация
  async function register(email, username, password) {
    const response = await api.post('/auth/register', { email, username, password });
    setAuthData(response.data.token, response.data.user);
    return response.data;
  }

  // 2. Вход
  async function login(usernameOrEmail, password) {
    const response = await api.post('/auth/login', { usernameOrEmail, password });
    setAuthData(response.data.token, response.data.user);
    return response.data;
  }

  // 3. Выход
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // 4. Проверка токена при старте страницы (загрузка свежих данных юзера)
  async function checkAuth() {
    if (!token.value) return;
    try {
      const response = await api.get('/auth/me');
      user.value = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      logout();
    }
  }

  function setAuthData(newToken, newUser) {
    token.value = newToken;
    user.value = newUser;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    isOfficer,
    register,
    login,
    logout,
    checkAuth,
  };
});
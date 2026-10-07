import { ref, onMounted } from 'vue';
import api from '@/api/axios';

export function useUsersManagement() {
  const users = ref([]);
  const isLoading = ref(false);

  async function fetchUsers() {
    isLoading.value = true;
    try {
      const res = await api.get('/auth/users');
      users.value = res.data;
    } catch (err) {
      console.error('Ошибка загрузки пользователей:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function changeRole(userId, newRole) {
    try {
      const res = await api.patch(`/auth/users/${userId}/role`, { role: newRole });
      users.value = users.value.map(u => u.id === userId ? { ...u, role: res.data.role } : u);
    } catch (err) {
      alert(err.response?.data?.error || 'Не удалось изменить роль');
    }
  }

  onMounted(() => {
    fetchUsers();
  });

  return {
    users,
    isLoading,
    changeRole,
  };
}
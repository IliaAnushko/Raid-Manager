import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useRaidStore = defineStore('raid', () => {
  const selectedRoleFilter = ref('');
  const players = ref([]);
  const isLoading = ref(false);

  // 1. Загрузить всех игроков с сервера
  async function fetchPlayers() {
    isLoading.value = true;
    try {
      const response = await api.get('/players');
      players.value = response.data;
    } catch (error) {
      console.error('Ошибка загрузки игроков:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // 2. Добавить нового игрока в базу данных
  async function addPlayer(playerData) {
    try {
      const response = await api.post('/players', playerData);
      players.value.unshift(response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка добавления игрока:', error);
      throw error;
    }
  }

  // 3. Обновить данные игрока
  async function updatePlayer(updatedPlayer) {
    try {
      const response = await api.put(`/players/${updatedPlayer.id}`, updatedPlayer);
      players.value = players.value.map((p) =>
        p.id === updatedPlayer.id ? response.data : p
      );
    } catch (error) {
      console.error('Ошибка обновления игрока:', error);
      throw error;
    }
  }

  // 4. Удалить игрока из базы
  async function removePlayer(id) {
    try {
      await api.delete(`/players/${id}`);
      players.value = players.value.filter((player) => player.id !== id);
    } catch (error) {
      console.error('Ошибка удаления игрока:', error);
      throw error;
    }
  }

  return {
    players,
    isLoading,
    selectedRoleFilter,
    fetchPlayers,
    addPlayer,
    updatePlayer,
    removePlayer,
  };
});
import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useEventStore = defineStore('event', () => {
  const events = ref([]);
  const isLoading = ref(false);

  // 1. Загрузить события с сервера
  async function fetchEvents() {
    isLoading.value = true;
    try {
      const response = await api.get('/events');
      events.value = response.data;
    } catch (error) {
      console.error('Ошибка загрузки событий:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // 2. Создать новое событие
  async function addEvent(eventData) {
    try {
      const response = await api.post('/events', eventData);
      events.value.unshift(response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка создания события:', error);
      throw error;
    }
  }

  // 3. Обновить событие (название, дату, слоты)
  async function updateEvent(updatedEvent) {
    try {
      const response = await api.put(`/events/${updatedEvent.id}`, updatedEvent);
      events.value = events.value.map((e) =>
        e.id === updatedEvent.id ? { ...response.data, attendance: e.attendance } : e
      );
    } catch (error) {
      console.error('Ошибка обновления события:', error);
      throw error;
    }
  }

  // 4. Удалить событие
  async function removeEvent(id) {
    try {
      await api.delete(`/events/${id}`);
      events.value = events.value.filter((e) => e.id !== id);
    } catch (error) {
      console.error('Ошибка удаления события:', error);
      throw error;
    }
  }

  // 5. Отметить явку игрока (пришел / не пришел / недопущен)
  async function updateDetails(eventId, playerId, status) {
    try {
      await api.put(`/events/${eventId}/attendance`, { playerId, status });

      const event = events.value.find((e) => e.id === eventId);
      if (event) {
        if (!event.attendance) event.attendance = {};
        event.attendance[playerId] = status;
      }
    } catch (error) {
      console.error('Ошибка обновления явки:', error);
      throw error;
    }
  }

  return {
    events,
    isLoading,
    fetchEvents,
    addEvent,
    updateEvent,
    removeEvent,
    updateDetails,
  };
});
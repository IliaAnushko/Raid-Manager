<script setup>
import BaseModal from '../ui/BaseModal.vue';
import { useUsersManagement } from '@/composables/useUsersManagement';

const emit = defineEmits(['close']);

const { users, isLoading, changeRole } = useUsersManagement();
</script>

<template>
  <BaseModal title="Управление пользователями" @close="emit('close')">
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <span>Загрузка пользователей...</span>
    </div>

    <div v-else class="users-list">
      <div v-for="u in users" :key="u.id" class="user-row">
        <div class="user-info-wrapper">
          <div class="user-avatar-circle">
            {{ u.username ? u.username.charAt(0).toUpperCase() : '?' }}
          </div>
          <div class="user-details">
            <span class="user-name">{{ u.username }}</span>
            <span class="user-email">{{ u.email }}</span>
          </div>
        </div>

        <div class="user-actions">
          <template v-if="u.role !== 'ADMIN'">
            <button 
              v-if="u.role === 'MEMBER'" 
              @click="changeRole(u.id, 'OFFICER')"
              class="action-btn promote-btn"
            >
              Сделать офицером ⭐
            </button>
            <button 
              v-else-if="u.role === 'OFFICER'" 
              @click="changeRole(u.id, 'MEMBER')"
              class="action-btn demote-btn"
            >
              Снять офицера
            </button>
          </template>
          <span v-else class="admin-label">👑 Главный админ</span>

          <span class="role-badge" :class="u.role.toLowerCase()">
            {{ u.role }}
          </span>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.users-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 6px;
}

.users-list::-webkit-scrollbar {
  width: 6px;
}

.users-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.user-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.user-row:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(167, 119, 227, 0.2);
}

.user-info-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.user-avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.2), rgba(167, 119, 227, 0.2));
  border: 1px solid rgba(167, 119, 227, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #a777e3;
  font-size: 1rem;
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.8rem;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.role-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 6px;
  min-width: 76px;
  text-align: center;
}

.role-badge.member {
  background: rgba(255, 255, 255, 0.06);
  color: #9ca3af;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.role-badge.officer {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.role-badge.admin {
  background: rgba(167, 119, 227, 0.15);
  color: #c084fc;
  border: 1px solid rgba(167, 119, 227, 0.3);
}

.action-btn {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid transparent;
}

.promote-btn {
  background: rgba(234, 179, 8, 0.12);
  border-color: rgba(234, 179, 8, 0.3);
  color: #facc15;
}

.promote-btn:hover {
  background: rgba(234, 179, 8, 0.22);
  color: #fff;
  box-shadow: 0 0 10px rgba(234, 179, 8, 0.25);
}

.demote-btn {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.demote-btn:hover {
  background: rgba(239, 68, 68, 0.22);
  color: #fff;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.25);
}

.admin-label {
  font-size: 0.85rem;
  color: #c084fc;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 0;
  color: #888;
  font-size: 0.95rem;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(167, 119, 227, 0.2);
  border-top-color: #a777e3;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
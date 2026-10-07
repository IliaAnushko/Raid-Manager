<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import UsersModal from "@/components/auth/UsersModal.vue";

const router = useRouter();
const authStore = useAuthStore();

const isUsersModalOpen = ref(false);

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <aside class="sidebar">
    <div class="logo">⚔️ Raid Manager</div>

    <!-- Навигация -->
    <nav class="navigation">
      <router-link to="/roster" active-class="active">Списки рейда</router-link>
      <router-link to="/events" active-class="active">Осады и события</router-link>
      <router-link to="/stats" active-class="active">Статистика рейда</router-link>
    </nav>

    <div class="sidebar-footer">
      <!-- Профиль -->
      <div class="user-profile">
        <div class="user-avatar">👤</div>
        <div class="user-info">
         <span class="user-name">{{ authStore.user?.username || 'Пользователь' }}</span>
         <span class="user-role">{{ authStore.user?.role || 'OFFICER' }}</span>
       </div>
      </div>
      <button v-if="authStore.isAdmin" @click="isUsersModalOpen = true" class="admin-btn">
        ⚙️ Пользователи
      </button>

      <UsersModal v-if="isUsersModalOpen" @close="isUsersModalOpen = false" />
      
      <button @click="handleLogout" class="logout-btn">
        🚪 Выйти
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #16161e;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: #a777e3;
  margin-bottom: 25px;
  text-align: center;
  letter-spacing: 1px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 12px 14px;
  border-radius: 10px;
  margin-bottom: 0;
}

.user-avatar {
  font-size: 1.4rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
}

.user-role {
  font-size: 0.75rem;
  color: #a777e3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.navigation a {
  padding: 15px 20px;
  background: transparent;
  color: #a0a0a0;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: block;
}

.navigation a:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.navigation a.active {
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.15), rgba(167, 119, 227, 0.15));
  color: #a777e3;
  border-left: 4px solid #a777e3;
  border-radius: 4px 8px 8px 4px;
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #fff;
}

.admin-btn {
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  margin-bottom: 8px;
}
.admin-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>
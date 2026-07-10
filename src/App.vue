<script setup>

import { ref } from 'vue';
import RosterView from './views/RosterView.vue'
import SiegeView from './views/SiegeView.vue'

const currentView = ref('roster');

</script>

<template>
  <div class="app-layout">
    <!-- Боковое меню -->
    <aside class="sidebar">
      <div class="logo">⚔️ Raid Manager</div>
      <nav class="navigation">
        <button 
          @click="currentView = 'roster'" 
          :class="{ active: currentView === 'roster' }">
          Списки рейда
        </button>
        <button 
          @click="currentView = 'sieges'" 
          :class="{ active: currentView === 'sieges' }">
          Осады
        </button>
      </nav>
    </aside>

    <!-- Основной контент -->
    <main class="content">
      <RosterView v-if="currentView === 'roster'" />
      <SiegeView v-if="currentView === 'sieges'" />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: #0f0f13; /* Глубокий темный фон */
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 { color: #ffffff; margin: 0; }

.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

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
  margin-bottom: 40px;
  text-align: center;
  letter-spacing: 1px;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.navigation button {
  padding: 15px 20px;
  background: transparent;
  color: #a0a0a0;
  border: none;
  border-radius: 8px;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.navigation button:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.navigation button.active {
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.15), rgba(167, 119, 227, 0.15));
  color: #a777e3;
  border-left: 4px solid #a777e3;
  border-radius: 4px 8px 8px 4px;
}

.content {
  flex: 1;
  padding: 40px 60px;
  overflow-y: auto;
  position: relative;
}
</style>

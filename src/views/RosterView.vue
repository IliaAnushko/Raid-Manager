<script setup>

import { ref } from 'vue';
import { useRaidStore } from '@/stores/raidStore';
import AddPlayerModal from '@/components/AddPlayerModal.vue'
import PlayerList from '@/components/PlayerList.vue'

const raidStore = useRaidStore();

const isModalOpen = ref(false);

</script>

<template>
   <div class="view-container">
     <!-- Верхняя шапка -->
     <div class="header-section">
       <div class="spacer"></div>
       <h1 class="page-title">Списки рейда</h1>
       <button class="add-btn" @click="isModalOpen = true">Добавить игрока</button>
     </div>
     
     <AddPlayerModal v-if="isModalOpen" @close="isModalOpen = false"/>
     
     <!-- Списки друг под другом -->
     <div class="lists-container">  
      <PlayerList title="Активные" filterStatus="active" />
      <PlayerList title="АФК" filterStatus="afk" />
      <PlayerList title="Бывшие участники" filterStatus="former" />
     </div>
   </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.page-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 800;
  letter-spacing: 1px;
}

.spacer {
  width: 170px; /* Балансирует кнопку справа для идеального центрирования заголовка */
}

.add-btn {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(167, 119, 227, 0.4);
  transition: transform 0.2s, filter 0.2s;
  width: 170px;
}

.add-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.lists-container {
  display: flex;
  flex-direction: column; /* Списки друг под другом, как ты и просил */
  gap: 40px;
}
</style>
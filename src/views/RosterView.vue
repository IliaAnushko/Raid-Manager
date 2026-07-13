<script setup>

import { ref } from 'vue';
import AddPlayerModal from '@/components/roster/AddPlayerModal.vue'
import SearchPlayerModal from '@/components/roster/SearchPlayerModal.vue';
import PlayerList from '@/components/roster/PlayerList.vue'

const isModalOpen = ref(false);
const isSearchOpen = ref(false)

</script>

<template>
   <div class="view-container">
     <!-- Верхняя шапка -->
     <div class="header-section">
       <div class="header-spacer"></div>
       <h1 class="page-title">Списки рейда</h1>
       <div class="header-actions">
         <button class="add-btn" @click="isModalOpen = true">Добавить игрока</button>
         <button class="search-btn" @click="isSearchOpen = true">🔍 Поиск</button>
       </div>
     </div>
     
     <AddPlayerModal v-if="isModalOpen" @close="isModalOpen = false"/>
     <SearchPlayerModal v-if="isSearchOpen" @close="isSearchOpen = false"/>
     
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

.lists-container {
  display: flex;
  flex-direction: column; /* Списки друг под другом, как ты и просил */
  gap: 40px;
}
</style>
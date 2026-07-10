<script setup>

import {computed} from 'vue';
import {useRaidStore} from '@/stores/raidStore'
import PlayerCard from './PlayerCard.vue'

const raidStore = useRaidStore();

const props = defineProps({
   title: String,
   filterStatus: String,
})

const filteredPlayers = computed(() => {
   return raidStore.players.filter(player => player.status === props.filterStatus);
})

</script>

<template>
   <div class="player-list-section">
      <h2 class="list-title">{{ title }} <span class="count">{{ filteredPlayers.length }}</span></h2>
      <div class="player-list">
         <PlayerCard v-for="player in filteredPlayers" :key="player.id" :id="player.id" />
      </div>
      
      <!-- Пустое состояние -->
      <div v-if="filteredPlayers.length === 0" class="empty-state">
         Нет участников в этой категории
      </div>
   </div>
</template>

<style scoped>
.player-list-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.list-title {
  font-size: 1.4rem;
  color: #ffffff;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.count {
  color: #a777e3;
  font-size: 1rem;
  background: rgba(167, 119, 227, 0.15);
  padding: 4px 12px;
  border-radius: 20px;
}

.player-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
}
</style>
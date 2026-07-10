<script setup>

import { ref } from 'vue';
import { computed } from 'vue';
import { useRaidStore } from '@/stores/raidStore';
import EditPlayerModal from './EditPlayerModal.vue';

const raidStore = useRaidStore();
const isEditing = ref(false);

const props = defineProps({
   id: {
    type: Number,
    required: true
   }
});

const player = computed(() => {
   return raidStore.players.find(player => player.id === props.id)
})

</script>

<template>
   <div v-if="player" class="player-card">
      
      <!-- Информация об игроке -->
      <div class="player-info">
        <div class="main-info">
          <strong class="name">{{ player.name }}</strong>
          <span v-if="player.discord" class="discord">{{ player.discord }}</span>
        </div>
        <div class="tags">
          <span class="tag class-tag">{{ player.characterClass }}</span>
          <span class="tag role-tag">{{ player.role }}</span>
          <span class="tag skill-tag">{{ player.skill }}</span>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="card-actions">
        <button @click="isEditing = true" class="icon-btn edit-btn" title="Редактировать">✏️</button>
        <button @click="raidStore.removePlayer(props.id)" class="icon-btn remove-btn" title="Удалить">❌</button>
      </div>

      <EditPlayerModal v-if="isEditing" :playerId="props.id" @close="isEditing = false" />
   </div>
</template>

<style scoped>
.player-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 4px solid #a777e3;
  padding: 15px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

.player-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(5px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.player-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-info {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
}

.discord {
  color: #888;
  font-size: 0.9rem;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.class-tag { background: rgba(110, 142, 251, 0.15); color: #8fa5fb; }
.role-tag { background: rgba(167, 119, 227, 0.15); color: #bd9af0; }
.skill-tag { background: rgba(255, 255, 255, 0.1); color: #ccc; }

.card-actions {
  display: flex;
  gap: 10px;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.1rem;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

.remove-btn:hover {
  background: rgba(244, 67, 54, 0.2);
  border-color: rgba(244, 67, 54, 0.5);
}

.edit-btn:hover {
  background: rgba(33, 150, 243, 0.2);
  border-color: rgba(33, 150, 243, 0.5);
}
</style>
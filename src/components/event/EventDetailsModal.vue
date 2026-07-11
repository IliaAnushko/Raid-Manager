<script setup>

import { computed } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import { useRaidStore } from '@/stores/raidStore';
import BaseModal from '../ui/BaseModal.vue';

const emit = defineEmits(['close'])
const eventStore = useEventStore()
const raidStore = useRaidStore()

const props = defineProps({
   eventId: {
      type: [String, Number],
      required: true
   }
});

const event = computed(() => {
   return eventStore.events.find(event => event.id === props.eventId)
})

const activePlayers = computed(() => {
   return raidStore.players.filter(player => player.status === 'active')
})

function setStatus(playerId, status) {
   eventStore.updateDetails(props.eventId, playerId, status);
}

function checkStatus(playerId, targetStatus) {
  return event.value.attendance?.[playerId] === targetStatus;
}

</script>

<template>
   <div>
    <BaseModal v-if="event" :title="event.name" @close="emit('close')">
       <div class="players-list">
         <div v-for="player in activePlayers" :key="player.id" class="player-row">
           <span class="player-name">{{ player.name }}</span>
           <div class="attendance-buttons">
             <button @click="setStatus(player.id, 'present')" :class="{ 'is-active': checkStatus(player.id, 'present') }">✅ Пришел</button>

             <button @click="setStatus(player.id, 'rejected')" :class="{ 'is-active': checkStatus(player.id, 'rejected') }">🚫 Не допущен</button>

             <button @click="setStatus(player.id, 'absent')" :class="{ 'is-active': checkStatus(player.id, 'absent') }">❌ Не пришел</button>
           </div>
      </div>
    </div>
    </BaseModal>
   </div>
</template>

<style scoped>
.players-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px;
}

.players-list::-webkit-scrollbar {
  width: 6px;
}
.players-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.player-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.2s ease;
}

.player-row:hover {
  background: rgba(255, 255, 255, 0.06);
}

.player-name {
  font-size: 1.05rem;
  font-weight: 500;
  color: #fff;
}

.attendance-buttons {
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Стили для активных статусов */
button.is-active:nth-child(1) {
  border-color: #2ecc71;
  background: rgba(46, 204, 113, 0.15);
  color: #2ecc71;
  box-shadow: 0 0 10px rgba(46, 204, 113, 0.2);
}

button.is-active:nth-child(2) {
  border-color: #e67e22;
  background: rgba(230, 126, 34, 0.15);
  color: #e67e22;
  box-shadow: 0 0 10px rgba(230, 126, 34, 0.2);
}

button.is-active:nth-child(3) {
  border-color: #e74c3c;
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
  box-shadow: 0 0 10px rgba(231, 76, 60, 0.2);
}
</style>
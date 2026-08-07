<script setup>
import { ref, computed } from "vue";
import { useRaidStore } from "@/stores/raidStore";
import PlayerCard from "./PlayerCard.vue";

const raidStore = useRaidStore();
const sortField = ref("name");
const sortOrder = ref("asc");

const props = defineProps({
  title: String,
  filterStatus: String,
});

const filteredPlayers = computed(() => {
  let filteredByStatus = raidStore.players.filter((player) => player.status === props.filterStatus);

  filteredByStatus.sort((firstPlayer, secondPlayer) => {
    let firstValue = firstPlayer[sortField.value] || "";
    let secondValue = secondPlayer[sortField.value] || "";

    if (Array.isArray(firstValue)) firstValue = firstValue.join(", ");
    if (Array.isArray(secondValue)) secondValue = secondValue.join(", ");

    if (sortOrder.value === "asc") {
      return firstValue.localeCompare(secondValue);
    } else {
      return secondValue.localeCompare(firstValue);
    }
  });

  return filteredByStatus;
});
</script>

<template>
  <div class="player-list-section">
    <h2 class="list-title">
      {{ title }} <span class="count">{{ filteredPlayers.length }}</span>
    </h2>
    <select v-model="sortField">
      <option value="name">По имени</option>
      <option value="characterClass">По классу</option>
      <option value="role">По роли</option>
      <option value="skill">По скиллу</option>
    </select>
    <div class="player-list">
      <PlayerCard v-for="player in filteredPlayers" :key="player.id" :id="player.id" />
    </div>

    <div v-if="filteredPlayers.length === 0" class="empty-state">Нет участников в этой категории</div>
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

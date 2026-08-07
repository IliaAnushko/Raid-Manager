<script setup>
import { ref, computed } from "vue";
import { useRaidStore } from "@/stores/raidStore.js";
import BaseModal from "../ui/BaseModal.vue";
import PlayerCard from "./PlayerCard.vue";

const raidStore = useRaidStore();
const searchQuery = ref("");

const searchResults = computed(() => {
  if (searchQuery.value.length < 2) return [];
  const query = searchQuery.value.toLowerCase();

  return raidStore.players.filter((player) => player.name.toLowerCase().includes(query));
});

const emit = defineEmits(["close"]);
</script>

<template>
  <BaseModal title="Поиск игрока" @close="emit('close')">
    <input v-model="searchQuery" placeholder="Введите ник" />

    <div v-if="searchResults.length > 0">
      <PlayerCard v-for="player in searchResults" :key="player.id" :id="player.id" />
    </div>
  </BaseModal>
</template>

<style scoped></style>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import AddPlayerModal from "@/components/roster/AddPlayerModal.vue";
import SearchPlayerModal from "@/components/roster/SearchPlayerModal.vue";
import MigrationBanner from "@/components/roster/MigrationBanner.vue";
import PlayerList from "@/components/roster/PlayerList.vue";
import PageHeader from "@/components/layout/PageHeader.vue";

const authStore = useAuthStore();

const isModalOpen = ref(false);
const isSearchOpen = ref(false);
</script>

<template>
  <div class="view-container">
    <PageHeader title="Списки рейда">
      <button v-if="authStore.isOfficer" class="add-btn" @click="isModalOpen = true">Добавить игрока</button>
      <button class="search-btn" @click="isSearchOpen = true">🔍 Поиск</button>
    </PageHeader>

    <MigrationBanner />

    <AddPlayerModal v-if="isModalOpen" @close="isModalOpen = false" />
    <SearchPlayerModal v-if="isSearchOpen" @close="isSearchOpen = false" />

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
  flex-direction: column;
  gap: 40px;
}
</style>

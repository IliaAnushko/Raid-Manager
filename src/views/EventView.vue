<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import PageHeader from "@/components/layout/PageHeader.vue";
import AddEventModal from "@/components/event/AddEventModal.vue";
import EventList from "@/components/event/EventList.vue";

const authStore = useAuthStore();
const isModalOpen = ref(false);
</script>

<template>
  <div class="view-container">
    <PageHeader title="Осады и события">
      <button v-if="authStore.isOfficer" class="add-btn" @click="isModalOpen = true">Добавить событие</button>
    </PageHeader>
    
    <AddEventModal v-if="isModalOpen" @close="isModalOpen = false" />

    <div class="lists-container">
      <EventList />
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref } from "vue";
import AddEventModal from "@/components/event/AddEventModal.vue";
import EventList from "@/components/event/EventList.vue";

const isModalOpen = ref(false);
</script>

<template>
  <div class="view-container">
    <div class="header-section">
      <div class="header-spacer"></div>
      <h1 class="page-title">Осады и события</h1>
      <button class="add-btn" @click="isModalOpen = true">Добавить событие</button>
    </div>

    <AddEventModal v-if="isModalOpen" @close="isModalOpen = false" />

    <div class="lists-container">
      <EventList />
    </div>
  </div>
</template>

<style scoped></style>

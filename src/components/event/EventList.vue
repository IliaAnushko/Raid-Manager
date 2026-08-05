<script setup>
import EventCard from "./EventCard.vue";
import { useEventStore } from "@/stores/eventStore";

const eventStore = useEventStore();

const emit = defineEmits(["close"]);
</script>

<template>
  <div class="event-list">
    <EventCard
      v-for="event in eventStore.events"
      :key="event.id"
      :id="event.id"
    />
  </div>
</template>

<style scoped>
.event-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 0;
}
</style>

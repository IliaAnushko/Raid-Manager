<script setup>
import { ref, computed } from "vue";
import { useEventStore } from "@/stores/eventStore";
import { useRaidStore } from "@/stores/raidStore";
import { formatDate } from "../utils/UtilityFunctions.js";
import EditEventModal from "./EditEventModal.vue";
import EventDetailsModal from "./EventDetailsModal.vue";
import ConfirmDelete from "../ui/ConfirmDelete.vue";

const eventStore = useEventStore();
const raidStore = useRaidStore();
const isEditing = ref(false);
const isDetailsOpen = ref(false);
const isDeleting = ref(false);

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const event = computed(() => {
  return eventStore.events.find((event) => event.id === props.id);
});

const attendanceStats = computed(() => {
  const totalExpected = event.value.quantity || raidStore.players.filter((p) => p.status === "active").length;

  let present = 0;
  let absentOrRejected = 0;

  if (event.value.attendance) {
    Object.values(event.value.attendance).forEach((status) => {
      if (status === "present") present++;
      if (status === "absent" || status === "rejected") absentOrRejected++;
    });
  }

  const percentage = totalExpected > 0 ? Math.min((present / totalExpected) * 100, 100) : 0;

  let color = "#f39c12"; // yellow
  //prettier-ignore
  if (percentage === 0) color = "#4b4b4b"; // gray
  else if (percentage >= 100) color = "#2ecc71"; // green
  else if (percentage >= 50) color = "#f1c40f"; // bright yellow
  else color = "#e67e22"; // orange

  return {
    present,
    totalExpected,
    absentOrRejected,
    percentage,
    color,
  };
});
</script>

<template>
  <div v-if="event" class="event-card">
    <!-- Информация о событии -->
    <div class="event-info">
      <div class="main-info">
        <strong class="name">{{ event.name }}</strong>
      </div>
      <div class="tags">
        <span class="tag date-tag">{{ formatDate(event.date) }}</span>
        <span class="tag time-tag">{{ event.time }}</span>
        <span class="tag quantity-tag">{{ event.quantity || "Не ограничено" }}</span>
        <span class="tag description-tag">{{ event.description }}</span>
      </div>
    </div>

    <!-- Статистика посещаемости (Прогресс бар) -->
    <div class="attendance-stats">
      <div class="progress-bar-container">
        <div
          class="progress-fill"
          :style="{ width: attendanceStats.percentage + '%', backgroundColor: attendanceStats.color }"
        ></div>
      </div>
      <span class="stats-text">
        {{ attendanceStats.present }}/{{ attendanceStats.totalExpected }}
        <span v-if="attendanceStats.absentOrRejected > 0" class="rejected-text">
          · {{ attendanceStats.absentOrRejected }}🚫
        </span>
      </span>
    </div>

    <!-- Кнопки действий -->
    <div class="card-actions">
      <button @click="isDetailsOpen = true" class="icon-btn details-btn" title="Подробности">👁️</button>

      <button @click="isEditing = true" class="icon-btn edit-btn" title="Редактировать">✏️</button>

      <button @click="isDeleting = true" class="icon-btn remove-btn" title="Удалить">❌</button>
    </div>

    <EditEventModal v-if="isEditing" :eventId="props.id" @close="isEditing = false" />
    <EventDetailsModal v-if="isDetailsOpen" :eventId="props.id" @close="isDetailsOpen = false" />
    <ConfirmDelete
      v-if="isDeleting"
      :itemName="event.name"
      @close="isDeleting = false"
      @confirm="eventStore.removeEvent(props.id)"
    />
  </div>
</template>

<style scoped>
.event-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.event-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border-color: rgba(167, 119, 227, 0.3);
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.main-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.5px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.date-tag {
  background: rgba(52, 152, 219, 0.15);
  color: #3498db;
}

.time-tag {
  background: rgba(155, 89, 182, 0.15);
  color: #9b59b6;
}

.quantity-tag {
  background: rgba(46, 204, 113, 0.15);
  color: #2ecc71;
}

.description-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #aaa;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-actions {
  display: flex;
  gap: 8px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.event-card:hover .card-actions {
  opacity: 1;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.1rem;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.details-btn:hover {
  background: rgba(52, 152, 219, 0.2);
}
.edit-btn:hover {
  background: rgba(241, 196, 15, 0.2);
}
.remove-btn:hover {
  background: rgba(231, 76, 60, 0.2);
}

.attendance-stats {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 180px;
  margin-left: auto;
  margin-right: 24px;
}

.progress-bar-container {
  width: 100px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition:
    width 0.5s ease,
    background-color 0.5s ease;
}

.stats-text {
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 60px;
}

.rejected-text {
  color: #e74c3c;
  font-size: 0.9rem;
}
</style>

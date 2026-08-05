<script setup>
import { computed } from "vue";
import { useEventStore } from "@/stores/eventStore";
import { useRaidStore } from "@/stores/raidStore";
import { formatDate } from "../utils/UtilityFunctions.js";
import BaseModal from "../ui/BaseModal.vue";

const emit = defineEmits(["close"]);
const eventStore = useEventStore();
const raidStore = useRaidStore();

const props = defineProps({
  playerId: {
    type: Number,
    required: true,
  },
});

const player = computed(() => {
  return raidStore.players.find((p) => p.id === props.playerId);
});

const attendanceStats = computed(() => {
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const filteredEvents = [...eventStore.events]
    .filter((e) => e.attendance?.[props.playerId] != null && new Date(e.date) >= monthAgo)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  let present = 0;
  let absent = 0;
  let rejected = 0;

  for (const event of filteredEvents) {
    const status = event.attendance[props.playerId];

    if (status === "present") present++;
    else if (status === "absent") absent++;
    else if (status === "rejected") rejected++;
  }

  const total = filteredEvents.length;
  const attendancePercent = total > 0 ? Math.round((present / total) * 100) : 0;

  let bestStreak = 0;
  let streak = 0;

  for (const event of filteredEvents) {
    const status = event.attendance[props.playerId];

    if (status === "present") {
      streak++;
      if (streak > bestStreak) bestStreak = streak;
    } else {
      streak = 0;
    }
  }

  const currentStreak = streak;

  const lastEvent = filteredEvents[0];
  const lastEventStatus = lastEvent?.attendance?.[props.playerId];

  const historyEvents = filteredEvents.slice(0, 7);

  return {
    total,
    present,
    absent,
    rejected,
    attendancePercent,
    currentStreak,
    bestStreak,
    lastEvent,
    lastEventStatus,
    historyEvents,
  };
});

// Вспомогательные функции для отображения статусов
function statusIcon(status) {
  if (status === "present") return "✅";
  else if (status === "absent") return "❌";
  else if (status === "rejected") return "🚫";
}

function statusColor(status) {
  // prettier-ignore
  if (status === "present") return "#2ecc71"; // зеленый
  else if (status === "absent") return "#e74c3c"; // красный
  else if (status === "rejected") return "#e67e22"; // оранжевый
}
</script>

<template>
  <BaseModal v-if="player" :title="'Посещаемость за последний месяц: ' + player.name" @close="emit('close')">
    <div class="attendance-modal">
      <!-- Блок: Общая явка -->
      <div class="section">
        <div class="section-title">📊 Общая явка</div>
        <div class="stats-grid">
          <div class="stat-row">
            <span class="stat-label">Всего событий</span>
            <span class="stat-value">{{ attendanceStats.total }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Пришёл</span>
            <span class="stat-value present">{{ attendanceStats.present }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Недопущен</span>
            <span class="stat-value rejected">{{ attendanceStats.rejected }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Пропустил</span>
            <span class="stat-value absent">{{ attendanceStats.absent + attendanceStats.rejected }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">% явки</span>
            <span class="stat-value percent">{{ attendanceStats.attendancePercent }}%</span>
          </div>
        </div>
      </div>

      <!-- Блок: Активность -->
      <div class="section">
        <div class="section-title">🔥 Активность</div>
        <div class="stats-grid">
          <div class="stat-row">
            <span class="stat-label">Текущий стрик</span>
            <span class="stat-value">{{ attendanceStats.currentStreak }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Лучший стрик</span>
            <span class="stat-value">{{ attendanceStats.bestStreak }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Последнее событие</span>
            <span class="stat-value">
              {{ formatDate(attendanceStats.lastEvent?.date) }} {{ statusIcon(attendanceStats.lastEventStatus) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Блок: История (последние 7) -->
      <div class="section">
        <div class="section-title">📅 История</div>
        <div class="history-row">
          <div
            v-for="(event, index) in attendanceStats.historyEvents"
            :key="index"
            class="history-icon"
            :style="{ borderColor: statusColor(event.attendance[props.playerId]) }"
          >
            {{ statusIcon(event.attendance[props.playerId]) }}
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.attendance-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px 20px;
}

.section-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 14px;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  color: #999;
  font-size: 0.95rem;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.stat-value.present {
  color: #2ecc71;
}
.stat-value.absent {
  color: #e74c3c;
}
.stat-value.percent {
  color: #f1c40f;
}
.stat-value.rejected {
  color: #e67e22;
}

.history-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.history-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 2px solid;
  background: rgba(255, 255, 255, 0.05);
}
</style>

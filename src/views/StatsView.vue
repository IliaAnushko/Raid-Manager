<script setup>
import { computed } from "vue";
import StatsCard from "@/components/stats/StatsCard.vue";
import PieChartCard from "@/components/stats/PieChartCard.vue";
import AttendanceChart from "@/components/stats/AttendanceChart.vue";
import TopPlayerList from "@/components/stats/TopPlayerList.vue";
import { useRaidStore } from "@/stores/raidStore";
import { useEventStore } from "@/stores/eventStore";
import { formatDate } from "@/components/utils/UtilityFunctions.js";

const raidStore = useRaidStore();
const eventStore = useEventStore();

// Только активные игроки
const activePlayers = computed(() => raidStore.players.filter((p) => p.status === "active"));

// События за последний месяц
const monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);

const recentEvents = computed(() => eventStore.events.filter((e) => new Date(e.date) >= monthAgo));

// === KPI-карточки ===

const totalPlayers = computed(() => activePlayers.value.length);

const totalEvents = computed(() => recentEvents.value.length);

const averageAttendance = computed(() => {
  let present = 0;
  let total = 0;

  for (const event of recentEvents.value) {
    const statuses = Object.values(event.attendance || {});
    present += statuses.filter((s) => s === "present").length;
    total += statuses.length;
  }

  return total > 0 ? Math.round((present / total) * 100) : 0;
});

const bestStreak = computed(() => {
  let best = 0;

  for (const player of activePlayers.value) {
    const playerEvents = [...recentEvents.value]
      .filter((e) => e.attendance?.[player.id] != null)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    let streak = 0;
    for (const event of playerEvents) {
      if (event.attendance[player.id] === "present") {
        streak++;
        if (streak > best) best = streak;
      } else {
        streak = 0;
      }
    }
  }

  return best;
});

// === Круговые диаграммы ===

const classData = computed(() => {
  const counts = activePlayers.value.reduce((acc, p) => {
    acc[p.characterClass] = (acc[p.characterClass] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([label, value]) => ({ label, value }));
});

const skillData = computed(() => {
  const counts = activePlayers.value.reduce((acc, p) => {
    acc[p.skill] = (acc[p.skill] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([label, value]) => ({ label, value }));
});

const roleData = computed(() => {
  const counts = {};
  activePlayers.value.forEach((p) => {
    if (Array.isArray(p.role)) {
      p.role.forEach((r) => {
        counts[r] = (counts[r] || 0) + 1;
      });
    }
  });
  return Object.entries(counts).map(([label, value]) => ({ label, value }));
});

// === График явки ===

const attendanceData = computed(() =>
  recentEvents.value.map((e) => ({
    label: formatDate(e.date),
    value: Object.values(e.attendance || {}).filter((s) => s === "present").length,
  }))
);

// === Топ-5 активных и неактивных ===

function playerAttendancePercent(player) {
  const playerEvents = recentEvents.value.filter((e) => e.attendance?.[player.id] != null);

  if (playerEvents.length === 0) return 0;

  const present = playerEvents.filter((e) => e.attendance[player.id] === "present").length;

  return Math.round((present / playerEvents.length) * 100);
}

const topActive = computed(() =>
  activePlayers.value
    .map((p) => ({ name: p.name, percent: playerAttendancePercent(p) }))
    .filter((p) => p.percent > 0)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5)
);

const topInactive = computed(() =>
  activePlayers.value
    .map((p) => ({ name: p.name, percent: playerAttendancePercent(p) }))
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 5)
);
</script>

<template>
  <div class="view-container">
    <!-- Заголовок -->
    <div class="header-section">
      <div class="header-spacer"></div>
      <h1 class="page-title">Статистика рейда</h1>
      <div class="header-spacer"></div>
    </div>

    <!-- Сводные карточки -->
    <div class="stats-cards">
      <StatsCard title="Активных игроков" :value="totalPlayers" icon="👥" />
      <StatsCard title="Событий за месяц" :value="totalEvents" icon="📅" />
      <StatsCard title="Средняя явка" :value="averageAttendance + '%'" icon="📊" />
      <StatsCard title="Лучший стрик" :value="bestStreak" icon="🔥" />
    </div>

    <!-- Круговые диаграммы -->
    <div class="charts-row">
      <PieChartCard title="Классы" :data="classData" />
      <PieChartCard title="Скилл" :data="skillData" />
      <PieChartCard title="Роли" :data="roleData" />
    </div>

    <!-- График явки -->
    <AttendanceChart title="Явка по событиям" :data="attendanceData" />

    <!-- Топы -->
    <div class="top-players">
      <TopPlayerList title="Топ-5 активных" :players="topActive" />
      <TopPlayerList title="Топ-5 неактивных" :players="topInactive" />
    </div>
  </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.top-players {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
</style>

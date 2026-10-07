<script setup>
import PageHeader from "@/components/layout/PageHeader.vue";
import StatsCard from "@/components/stats/StatsCard.vue";
import PieChartCard from "@/components/stats/PieChartCard.vue";
import AttendanceChart from "@/components/stats/AttendanceChart.vue";
import TopPlayerList from "@/components/stats/TopPlayerList.vue";
import { useRaidStats } from "@/composables/useRaidStats";

const {
  totalPlayers,
  totalEvents,
  averageAttendance,
  bestStreak,
  classData,
  skillData,
  roleData,
  attendanceData,
  topActive,
  topInactive,
} = useRaidStats();
</script>

<template>
  <div class="view-container">
    <PageHeader title="Статистика рейда" />

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

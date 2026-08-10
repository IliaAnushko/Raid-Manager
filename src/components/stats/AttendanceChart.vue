<script setup>
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  title: String,
  data: Array,
});

const chartData = computed(() => ({
  labels: props.data.map((item) => item.label),
  datasets: [
    {
      label: "Пришло",
      data: props.data.map((item) => item.value),
      backgroundColor: "#a777e3",
      hoverBackgroundColor: "#bd9af0",
      borderRadius: 6,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#16161e",
      titleColor: "#fff",
      bodyColor: "#e0e0e0",
      borderColor: "rgba(255,255,255,0.1)",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: { color: "#e0e0e0" },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
    y: {
      ticks: { color: "#e0e0e0" },
      grid: { color: "rgba(255,255,255,0.05)" },
      beginAtZero: true,
    },
  },
};
</script>

<template>
  <div class="bar-card">
    <!-- Заголовок -->
    <h3 class="bar-title">{{ title }}</h3>

    <!-- Контейнер диаграммы -->
    <div class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.bar-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
}

.bar-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.bar-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  text-align: center;
}

.chart-container {
  height: 300px;
  position: relative;
}
</style>

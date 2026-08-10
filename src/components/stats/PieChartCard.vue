<script setup>
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  title: String,
  data: Array,
});

const COLORS = ["#a777e3", "#6e8efb", "#8fa5fb", "#bd9af0", "#e0aaff", "#5b6ee8", "#c77dff", "#9d4edd"];

const chartData = computed(() => ({
  labels: props.data.map((item) => item.label),
  datasets: [
    {
      data: props.data.map((item) => item.value),
      backgroundColor: props.data.map((_, i) => COLORS[i % COLORS.length]),
      borderColor: "#16161e",
      borderWidth: 2,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#e0e0e0",
        padding: 16,
      },
      position: "bottom",
    },
    tooltip: {
      backgroundColor: "#16161e",
      titleColor: "#fff",
      bodyColor: "#e0e0e0",
      borderColor: "rgba(255,255,255,0.1)",
      borderWidth: 1,
    },
  },
};
</script>

<template>
  <div class="pie-card">
    <!-- Заголовок -->
    <h3 class="pie-title">{{ title }}</h3>

    <!-- Контейнер диаграммы -->
    <div class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.pie-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
}

.pie-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.pie-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  text-align: center;
}

.chart-container {
  height: 280px;
  position: relative;
}
</style>

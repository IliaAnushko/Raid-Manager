<script setup>
defineProps({
  title: String,
  players: Array, // [{ name: "Игрок", percent: 85 }, ...]
});
</script>

<template>
  <div class="top-list-card">
    <!-- Заголовок -->
    <h3 class="top-list-title">{{ title }}</h3>

    <!-- Список игроков -->
    <div class="top-list">
      <div v-for="(player, index) in players" :key="player.name" class="top-list-item">
        <span class="rank">{{ index + 1 }}</span>
        <span class="player-name">{{ player.name }}</span>
        <span class="player-percent">{{ player.percent }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-list-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
}

.top-list-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.top-list-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  text-align: center;
}

.top-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.top-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.top-list-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.rank {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.15), rgba(167, 119, 227, 0.15));
  border-radius: 8px;
  font-weight: 700;
  color: #a777e3;
  flex-shrink: 0;
}

.player-name {
  flex: 1;
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
}

.player-percent {
  color: #a777e3;
  font-weight: 700;
  font-size: 0.95rem;
}
</style>

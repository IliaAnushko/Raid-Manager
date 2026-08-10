<script setup>
const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
});
</script>

<template>
  <div class="stats-card">
    <span class="stats-icon">{{ props.icon }}</span>
    <div class="stats-info">
      <span class="stats-value">{{ props.value }}</span>
      <span class="stats-title">{{ props.title }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
}

.stats-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.stats-icon {
  font-size: 2rem;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.15), rgba(167, 119, 227, 0.15));
  border-radius: 12px;
  flex-shrink: 0;
}

.stats-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stats-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.stats-title {
  font-size: 0.85rem;
  color: #999;
  font-weight: 500;
}
</style>

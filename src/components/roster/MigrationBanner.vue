<script setup>
import { useLegacyMigration } from "@/composables/useLegacyMigration";

const { hasLegacyData, legacyCount, isMigrating, migrate, dismiss } = useLegacyMigration();
</script>

<template>
  <div v-if="hasLegacyData" class="migration-banner">
    <div class="migration-info">
      <span>📦 Обнаружены сохраненные данные браузера ({{ legacyCount }} участников).</span>
    </div>
    
    <div class="banner-actions">
      <button @click="migrate" class="migrate-btn" :disabled="isMigrating">
        {{ isMigrating ? "Перенос..." : "Перенести в базу данных" }}
      </button>
      <button @click="dismiss" class="dismiss-btn" :disabled="isMigrating">
        Пропустить
      </button>
    </div>
  </div>
</template>

<style scoped>
.migration-banner {
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.15), rgba(167, 119, 227, 0.15));
  border: 1px solid rgba(167, 119, 227, 0.3);
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.migration-info {
  font-weight: 500;
  color: #fff;
}

.banner-actions {
  display: flex;
  gap: 12px;
}

.migrate-btn {
  background: #a777e3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.migrate-btn:hover:not(:disabled) {
  filter: brightness(1.2);
  transform: translateY(-2px);
}

.dismiss-btn {
  background: transparent;
  color: #aaa;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.dismiss-btn:hover:not(:disabled) {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.3);
}
</style>
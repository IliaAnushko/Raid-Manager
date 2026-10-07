<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="header-section">
    <div class="header-spacer">
      <slot name="left"></slot>
    </div>
    <h1 class="page-title">{{ title }}</h1>

    <div v-if="$slots.default" class="header-actions">
      <slot></slot>
    </div>
    <div v-else class="header-spacer"></div>
  </div>
</template>
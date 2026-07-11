<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content">
        <h3 v-if="title">{{ title }}</h3>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #16161e;
  border: 1px solid rgba(167, 119, 227, 0.3);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(167, 119, 227, 0.05);
  border-radius: 16px;
  padding: 40px;
  width: 90vw;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: modal-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modal-pop {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

h3 {
  font-size: 1.8rem;
  color: #fff;
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 1px;
}
</style>

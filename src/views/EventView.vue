<script setup>

  import { ref } from 'vue';
  import AddEventModal from '@/components/event/AddEventModal.vue'
  import EventList from '@/components/event/EventList.vue'

  const isModalOpen = ref(false);

</script>

<template>
   <div class="view-container">
     <div class="header-section">
       <div class="spacer"></div>
       <h1 class="page-title">Осады и события</h1>
       <button class="add-btn" @click="isModalOpen = true">Добавить событие</button>
     </div>
     
     <AddEventModal v-if="isModalOpen" @close="isModalOpen = false"/>
     
     <div class="lists-container">
       <EventList />
     </div>
   </div>
</template>

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.add-btn {
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  transition: all 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.6);
}
</style>
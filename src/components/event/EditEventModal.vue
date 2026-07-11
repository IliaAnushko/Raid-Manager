<script setup>

import { ref } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import BaseModal from '../ui/BaseModal.vue';
import '../assets/main.css';

const emit = defineEmits(['close'])
const eventStore = useEventStore();

const props = defineProps({
  eventId: {
    type: [String, Number],
    required: true
  }
});

// Находим текущего игрока, чтобы предзаполнить форму
const currentEvent = eventStore.events.find(e => e.id === props.eventId);

const newName = ref(currentEvent.name);
const newDate = ref(currentEvent.date);
const newTime = ref(currentEvent.time);
const newQuantity = ref(currentEvent.quantity);
const newDescription = ref(currentEvent.description);

function editEvent(){
   eventStore.updateEvent({
      id: props.eventId,
      name: newName.value,
      date: newDate.value,
      time: newTime.value,
      quantity: newQuantity.value,
      description: newDescription.value,
   })

   emit('close');
}

</script>

<template>
   <BaseModal title="Изменить событие" @close="emit('close')">

      <input v-model="newName" placeholder="Название события" />

      <div class="input-group">
        <input v-model="newDate" type="date" placeholder="Дата" />
        <input v-model="newTime" type="time" placeholder="Время" />
      </div>

      <input v-model="newQuantity" type="number" placeholder="Лимит участников (пусто = безлимит)" />

      <textarea v-model="newDescription" placeholder="Описание события" rows="3"></textarea>

      <div class="modal-actions">
        <button @click="editEvent" class="save-btn">Сохранить</button>

        <button @click="emit('close')" class="cancel-btn">Отмена</button>
      </div>
   </BaseModal>
</template>

<style scoped>

</style>
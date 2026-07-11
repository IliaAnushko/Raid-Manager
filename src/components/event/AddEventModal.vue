<script setup>
   import { ref } from 'vue'
   import { useEventStore } from '@/stores/eventStore'
   import BaseModal from '../ui/BaseModal.vue';
   import '../assets/main.css';

   const emit = defineEmits(['close'])
   const eventStore = useEventStore()

   const newName = ref('');
   const newDate = ref('');
   const newTime = ref('');
   const newDescription = ref('');
   const newQuantity = ref(null);

   function addNewEvent(){
      eventStore.addEvent({
         name: newName.value,
         date: newDate.value,
         time: newTime.value,
         description: newDescription.value,
         quantity: newQuantity.value
      })

      newName.value = '';
      newDate.value = '';
      newTime.value = '';
      newDescription.value = '';
      newQuantity.value = null;

      emit('close')
   }

</script>

<template>
   <BaseModal title="Добавить событие" @close="emit('close')">
      <input v-model="newName" placeholder="Название события" />

      <div class="input-group">
        <input v-model="newDate" type="date" placeholder="Дата" />
        <input v-model="newTime" type="time" placeholder="Время" />
      </div>

      <input v-model="newQuantity" type="number" placeholder="Лимит участников (пусто = безлимит)" />

      <textarea v-model="newDescription" placeholder="Описание события" rows="3"></textarea>

      <div class="modal-actions">
        <button @click="addNewEvent" class="save-btn">Сохранить</button>

        <button @click="emit('close')" class="cancel-btn">Отмена</button>
      </div>
   </BaseModal>
</template>

<style scoped>

</style>
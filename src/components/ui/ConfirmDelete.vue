<script setup>
import BaseModal from './BaseModal.vue';

const emit = defineEmits(['close', 'confirm']);

const props = defineProps({
   itemName: {
      type: String,
      default: 'это'
   }
})

</script>
<template>
   <BaseModal title="Подтвердить удаление">
      <p>Вы уверены, что хотите удалить <strong>{{ props.itemName }}</strong>?</p>

      <div class="modal-actions">
        <button @click="emit('confirm')" class="save-btn">Да, удалить</button>

        <button @click="emit('close')" class="cancel-btn">Отмена</button>
      </div>
   </BaseModal>
</template>

<style scoped>
   p{
      color: #fff;
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
   }
</style>
<script setup>

import { ref } from 'vue';
import { useRaidStore } from '@/stores/raidStore';
import BaseModal from '../ui/BaseModal.vue';
import '../assets/main.css';

const emit = defineEmits(['close'])
const raidStore = useRaidStore();

const props = defineProps({
  playerId: {
    type: Number,
    required: true
  }
});

const currentPlayer = raidStore.players.find(p => p.id === props.playerId);

const newName = ref(currentPlayer.name);
const newDiscord = ref(currentPlayer.discord || '');
const newClass = ref(currentPlayer.characterClass);
const newRole = ref(currentPlayer.role);
const newSkill = ref(currentPlayer.skill);
const newStatus = ref(currentPlayer.status || 'active');

function editPlayer(){
   raidStore.updatePlayer({
      id: props.playerId,
      name: newName.value,
      discord: newDiscord.value,
      characterClass: newClass.value,
      role: newRole.value,
      skill: newSkill.value,
      status: newStatus.value
   })

   emit('close');
}

</script>

<template>
   <BaseModal title="Изменить участника" @close="emit('close')">

      <div class="input-group">
        <input v-model="newName" placeholder="Никнейм" />
        <input v-model="newDiscord" placeholder="Дискорд" />
      </div>

      <select v-model="newClass">
        <option value="" disabled selected>Выберите класс</option>
        <!-- Классы с Традицией и Пробуждением -->
        <option>Воин (Традиция)</option>
        <option>Воин (Пробуждение)</option>
        <option>Лучница (Традиция)</option>
        <option>Лучница (Пробуждение)</option>
        <option>Колдунья (Традиция)</option>
        <option>Колдунья (Пробуждение)</option>
        <option>Варвар (Традиция)</option>
        <option>Варвар (Пробуждение)</option>
        <option>Мистик (Традиция)</option>
        <option>Мистик (Пробуждение)</option>
        <option>Мастер меча (Традиция)</option>
        <option>Мастер меча (Пробуждение)</option>
        <option>Маэва (Традиция)</option>
        <option>Маэва (Пробуждение)</option>
        <option>Валькирия (Традиция)</option>
        <option>Валькирия (Пробуждение)</option>
        <option>Куноичи (Традиция)</option>
        <option>Куноичи (Пробуждение)</option>
        <option>Ниндзя (Традиция)</option>
        <option>Ниндзя (Пробуждение)</option>
        <option>Волшебник (Традиция)</option>
        <option>Волшебник (Пробуждение)</option>
        <option>Волшебница (Традиция)</option>
        <option>Волшебница (Пробуждение)</option>
        <option>Темный рыцарь (Традиция)</option>
        <option>Темный рыцарь (Пробуждение)</option>
        <option>Страйкер (Традиция)</option>
        <option>Страйкер (Пробуждение)</option>
        <option>Фурия (Традиция)</option>
        <option>Фурия (Пробуждение)</option>
        <option>Лан (Традиция)</option>
        <option>Лан (Пробуждение)</option>
        <option>Страж (Традиция)</option>
        <option>Страж (Пробуждение)</option>
        <option>Хассашин (Традиция)</option>
        <option>Хассашин (Пробуждение)</option>
        <option>Нова (Традиция)</option>
        <option>Нова (Пробуждение)</option>
        <option>Мудрец (Традиция)</option>
        <option>Мудрец (Пробуждение)</option>
        <option>Корсар (Традиция)</option>
        <option>Корсар (Пробуждение)</option>
        <option>Драканиа (Традиция)</option>
        <option>Драканиа (Пробуждение)</option>
        <option>Уса (Традиция)</option>
        <option>Уса (Пробуждение)</option>
        <option>Мэгу (Традиция)</option>
        <option>Мэгу (Пробуждение)</option>
        <option>Тоса (Традиция)</option>
        <option>Тоса (Пробуждение)</option>
        
        <!-- Классы только с одной стойкой -->
        <option>Лучник</option>
        <option>Шай</option>
        <option>Сколария</option>
        <option>Мертвый Глаз</option>
        <option>Вуконг</option>
        <option>Сераф</option>
      </select>

      <select v-model="newRole">
      <option value="" disabled selected>Выберите роль</option>
        <option>Танк</option>
        <option>Хил</option>
        <option>МДД</option>
        <option>РДД</option>
      </select>

      <select v-model="newSkill">
      <option value="" disabled selected>Скилл игрока</option>
        <option>Очень сильный</option>
        <option>Сильный</option>
        <option>Средний</option>
        <option>Ниже среднего</option>
        <option>Брелок</option>
        <option>Пока не ясно</option>
      </select>

      <select v-model="newStatus">
        <option value="active">Активный</option>
        <option value="afk">АФК</option>
        <option value="former">Бывший участник</option>
      </select>

      <div class="modal-actions">
        <button @click="editPlayer" class="save-btn">Сохранить</button>

        <button @click="emit('close')" class="cancel-btn">Отмена</button>
      </div>
   </BaseModal>
</template>

<style scoped>

</style>
<script setup>

import { ref } from 'vue';
import { useRaidStore } from '@/stores/raidStore';
import BaseModal from '../ui/BaseModal.vue';
import '../assets/main.css';

const emit = defineEmits(['close'])
const raidStore = useRaidStore();

const newName = ref('');
const newDiscord = ref('');
const newClass = ref('');
const newRole = ref([]);
const newSkill = ref('');

function addNewPlayer(){
   raidStore.addPlayer({
      name: newName.value,
      discord: newDiscord.value,
      characterClass: newClass.value,
      role: newRole.value,
      skill: newSkill.value
   })

   newName.value = '';
   newDiscord.value = '';
   newClass.value = '';
   newRole.value = [];
   newSkill.value = '';

   emit('close');
}

</script>

<template>
   <BaseModal title="Новый участник" @close="emit('close')">

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

      <div class="roles-group">
        <span class="roles-label">Роли:</span>
        <label class="role-checkbox"><input type="checkbox" value="ПЛ" v-model="newRole"> ПЛ</label>
        <label class="role-checkbox"><input type="checkbox" value="Саппорт" v-model="newRole"> Саппорт</label>
        <label class="role-checkbox"><input type="checkbox" value="МДД" v-model="newRole"> МДД</label>
        <label class="role-checkbox"><input type="checkbox" value="РДД" v-model="newRole"> РДД</label>
      </div>

      <select v-model="newSkill">
      <option value="" disabled selected>Скилл игрока</option>
        <option>Очень сильный</option>
        <option>Сильный</option>
        <option>Средний</option>
        <option>Ниже среднего</option>
        <option>Брелок</option>
        <option>Пока не ясно</option>
      </select>

      <div class="modal-actions">
        <button @click="addNewPlayer" class="save-btn">Сохранить</button>

        <button @click="emit('close')" class="cancel-btn">Отмена</button>
      </div>
   </BaseModal>
</template>

<style scoped>

</style>
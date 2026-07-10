<script setup>

import { ref } from 'vue';
import { useRaidStore } from '@/stores/raidStore';

const emit = defineEmits(['close'])
const raidStore = useRaidStore();

const props = defineProps({
  playerId: {
    type: Number,
    required: true
  }
});

// Находим текущего игрока, чтобы предзаполнить форму
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
   <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <h3>Изменить участника</h3>

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
    </div>
  </div>
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

.input-group {
  display: flex;
  gap: 20px;
}

.input-group input {
  flex: 1;
}

input, select {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 10px;
  color: #fff;
  font-size: 1.05rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

input::placeholder { color: #666; }

input:focus, select:focus {
  outline: none;
  border-color: #a777e3;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 3px rgba(167, 119, 227, 0.2);
}

select option {
  background: #1a1a24;
  color: #fff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

button {
  transition: all 0.2s ease;
}

.save-btn {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 14px 35px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(167, 119, 227, 0.3);
}

.cancel-btn {
  background: transparent;
  color: #aaa;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 14px 35px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
}

.save-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.15);
  box-shadow: 0 6px 20px rgba(167, 119, 227, 0.5);
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border-color: #fff;
}
</style>
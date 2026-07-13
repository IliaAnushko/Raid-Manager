import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useRaidStore = defineStore('raid', () => {
  const selectedRoleFilter = ref('')
  const storedPlayers = localStorage.getItem('players')
  const players = ref(storedPlayers ? JSON.parse(storedPlayers) : [])

  watch(players, (state) => {
    localStorage.setItem('players', JSON.stringify(state))
  }, { deep: true })

  function addPlayer(playerData) {
    const newPlayer = {
      id: Date.now(),
      status: 'active',
      ...playerData
    }

    players.value.push(newPlayer)
  }

  function removePlayer(id) {
    players.value = players.value.filter((player) => player.id !== id)
  }

  function updatePlayer(updatedPlayer) {
   players.value = players.value.map(currentPlayer => currentPlayer.id === updatedPlayer.id ? updatedPlayer : currentPlayer)
  }

  return { players, selectedRoleFilter, addPlayer, removePlayer, updatePlayer }
})
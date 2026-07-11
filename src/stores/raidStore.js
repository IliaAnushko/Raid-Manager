import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRaidStore = defineStore('raid', () => {
  const players = ref([])

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

  return { players, addPlayer, removePlayer, updatePlayer }
})
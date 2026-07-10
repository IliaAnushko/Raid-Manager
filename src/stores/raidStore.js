import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRaidStore = defineStore('raid', () => {
  const players = ref([])

  function addPlayer(player) {
    players.value.push(player)
  }

  function removePlayer(id) {
    players.value = players.value.filter((player) => player.id !== id)
  }

  function updatePlayer(updatedPlayer) {
   players.value = players.value.map(currentPlayer => currentPlayer.id === updatedPlayer.id ? updatedPlayer : currentPlayer)
  }

  return { players, addPlayer, removePlayer, updatePlayer }
})
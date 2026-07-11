import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', () => {
  const events = ref([])
  
  function addEvent(eventData) {
    const newEvent = {
      id: crypto.randomUUID(),
      attendance: {},
      ...eventData
    }
    events.value.push(newEvent)
  }

  function updateDetails(eventId, playerId, status) {
    const event = events.value.find(event => event.id === eventId)

    if (event) event.attendance[playerId] = status
  }

  function removeEvent(id) {
    events.value = events.value.filter((event) => event.id !== id)
  }

  function updateEvent(updatedEvent) {
   events.value = events.value.map(currentEvent => currentEvent.id === updatedEvent.id ? updatedEvent : currentEvent)
  }

  return { events, addEvent, updateDetails, removeEvent, updateEvent }
})
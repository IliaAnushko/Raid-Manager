import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useEventStore = defineStore("event", () => {
  const storedEvents = localStorage.getItem("events");
  const events = ref(storedEvents ? JSON.parse(storedEvents) : []);

  watch(
    events,
    (state) => {
      localStorage.setItem("events", JSON.stringify(state));
    },
    { deep: true },
  );

  function addEvent(eventData) {
    const newEvent = {
      id: crypto.randomUUID(),
      attendance: {},
      ...eventData,
    };
    events.value.push(newEvent);
  }

  function updateDetails(eventId, playerId, status) {
    const event = events.value.find((event) => event.id === eventId);
    if (event) {
      if (!event.attendance) event.attendance = {};
      event.attendance[playerId] = status;
    }
  }

  function removeEvent(id) {
    events.value = events.value.filter((event) => event.id !== id);
  }

  function updateEvent(updatedEvent) {
    events.value = events.value.map((currentEvent) =>
      currentEvent.id === updatedEvent.id ? updatedEvent : currentEvent,
    );
  }

  return { events, addEvent, updateDetails, removeEvent, updateEvent };
});

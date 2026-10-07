import { ref, onMounted } from "vue";
import { useRaidStore } from "@/stores/raidStore";
import { useEventStore } from "@/stores/eventStore";
import api from "@/api/axios";

export function useLegacyMigration() {
  const raidStore = useRaidStore();
  const eventStore = useEventStore();

  const hasLegacyData = ref(false);
  const legacyCount = ref(0);
  const isMigrating = ref(false);

  onMounted(() => {
    const localPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    if (localPlayers.length > 0) {
      hasLegacyData.value = true;
      legacyCount.value = localPlayers.length;
    }
  });

  // Перенос данных в SQLite
  async function migrate() {
    isMigrating.value = true;
    try {
      const localPlayers = JSON.parse(localStorage.getItem("players") || "[]");
      const localEvents = JSON.parse(localStorage.getItem("events") || "[]");
      const idMap = {};

      // 1. Игроки
      for (const player of localPlayers) {
        const res = await api.post("/players", {
          name: player.name,
          discord: player.discord,
          characterClass: player.characterClass,
          role: player.role,
          skill: player.skill,
        });
        idMap[player.id] = res.data.id;
      }

      // 2. События и явка
      for (const event of localEvents) {
        const res = await api.post("/events", {
          name: event.name,
          date: event.date,
          time: event.time,
          quantity: event.quantity,
          description: event.description,
        });
        const newEventId = res.data.id;

        if (event.attendance) {
          for (const [oldPlayerId, status] of Object.entries(event.attendance)) {
            const newPlayerId = idMap[oldPlayerId];
            if (newPlayerId) {
              await api.put(`/events/${newEventId}/attendance`, {
                playerId: newPlayerId,
                status,
              });
            }
          }
        }
      }

      clearLegacyStorage();
      await raidStore.fetchPlayers();
      await eventStore.fetchEvents();

      alert("Данные успешно перенесены в базу данных!");
    } catch (error) {
      console.error("Ошибка миграции:", error);
      alert("Произошла ошибка при переносе данных.");
    } finally {
      isMigrating.value = false;
    }
  }

  function dismiss() {
    clearLegacyStorage();
  }

  function clearLegacyStorage() {
    localStorage.removeItem("players");
    localStorage.removeItem("events");
    hasLegacyData.value = false;
  }

  return {
    hasLegacyData,
    legacyCount,
    isMigrating,
    migrate,
    dismiss,
  };
}
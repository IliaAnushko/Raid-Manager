import { watch } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRaidStore } from "@/stores/raidStore";
import { useEventStore } from "@/stores/eventStore";

export function useRaidSync() {
  const authStore = useAuthStore();
  const raidStore = useRaidStore();
  const eventStore = useEventStore();

  watch(
    () => authStore.isAuthenticated,
    (isAuth) => {
      if (isAuth) {
        raidStore.fetchPlayers();
        eventStore.fetchEvents();
      }
    },
    { immediate: true }
  );
}
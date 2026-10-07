import { computed, toValue } from "vue";
import { useEventStore } from "@/stores/eventStore";
import { useRaidStore } from "@/stores/raidStore";
import { calculateAttendancePercent } from "@/utils/attendance";

export function usePlayerAttendance(playerIdSource) {
  const raidStore = useRaidStore();
  const eventStore = useEventStore();

  const playerId = computed(() => toValue(playerIdSource));

  const player = computed(() => {
    return raidStore.players.find((p) => p.id === playerId.value);
  });

  // Все расчеты посещаемости и стриков
  const attendanceStats = computed(() => {
    const id = playerId.value;
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const filteredEvents = [...eventStore.events]
      .filter((e) => e.attendance?.[id] != null && new Date(e.date) >= monthAgo)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    let present = 0;
    let absent = 0;
    let rejected = 0;

    for (const event of filteredEvents) {
      const status = event.attendance[id];
      if (status === "present") present++;
      else if (status === "absent") absent++;
      else if (status === "rejected") rejected++;
    }

    const total = filteredEvents.length;
    const attendancePercent = calculateAttendancePercent(present, total);

    let bestStreak = 0;
    let streak = 0;

    for (const event of filteredEvents) {
      const status = event.attendance[id];
      if (status === "present") {
        streak++;
        if (streak > bestStreak) bestStreak = streak;
      } else {
        streak = 0;
      }
    }

    const currentStreak = streak;
    const lastEvent = filteredEvents[0];
    const lastEventStatus = lastEvent?.attendance?.[id];
    const historyEvents = filteredEvents.slice(0, 7);

    return {
      total,
      present,
      absent,
      rejected,
      attendancePercent,
      currentStreak,
      bestStreak,
      lastEvent,
      lastEventStatus,
      historyEvents,
    };
  });

  return {
    player,
    attendanceStats,
  };
}
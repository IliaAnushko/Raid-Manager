import { computed } from "vue";
import { useRaidStore } from "@/stores/raidStore";
import { useEventStore } from "@/stores/eventStore";
import { formatDate } from "@/utils/date";
import { calculateAttendancePercent } from "@/utils/attendance";

export function useRaidStats() {
  const raidStore = useRaidStore();
  const eventStore = useEventStore();

  // 1. Активные игроки
  const activePlayers = computed(() => 
    raidStore.players.filter((p) => p.status === "active")
  );

  // 2. События за последний месяц
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const recentEvents = computed(() => 
    eventStore.events.filter((e) => new Date(e.date) >= monthAgo)
  );

  // === KPI-карточки ===
  const totalPlayers = computed(() => activePlayers.value.length);
  const totalEvents = computed(() => recentEvents.value.length);

  const averageAttendance = computed(() => {
    let present = 0;
    let total = 0;

    for (const event of recentEvents.value) {
      const statuses = Object.values(event.attendance || {});
      present += statuses.filter((s) => s === "present").length;
      total += statuses.length;
    }

    return calculateAttendancePercent(present, total);
  });

  const bestStreak = computed(() => {
    let best = 0;

    for (const player of activePlayers.value) {
      const playerEvents = [...recentEvents.value]
        .filter((e) => e.attendance?.[player.id] != null)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      let streak = 0;
      for (const event of playerEvents) {
        if (event.attendance[player.id] === "present") {
          streak++;
          if (streak > best) best = streak;
        } else {
          streak = 0;
        }
      }
    }

    return best;
  });

  // === Круговые диаграммы ===
  const classData = computed(() => {
    const counts = activePlayers.value.reduce((acc, p) => {
      acc[p.characterClass] = (acc[p.characterClass] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  });

  const skillData = computed(() => {
    const counts = activePlayers.value.reduce((acc, p) => {
      acc[p.skill] = (acc[p.skill] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  });

  const roleData = computed(() => {
    const counts = {};
    activePlayers.value.forEach((p) => {
      if (Array.isArray(p.role)) {
        p.role.forEach((r) => {
          counts[r] = (counts[r] || 0) + 1;
        });
      }
    });
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  });

  // === График явки ===
  const attendanceData = computed(() =>
    recentEvents.value.map((e) => ({
      label: formatDate(e.date),
      value: Object.values(e.attendance || {}).filter((s) => s === "present").length,
    }))
  );

  // === Топ-5 игроков ===
  function playerAttendancePercent(player) {
    const playerEvents = recentEvents.value.filter((e) => e.attendance?.[player.id] != null);
    if (playerEvents.length === 0) return 0;
    const present = playerEvents.filter((e) => e.attendance[player.id] === "present").length;
    return calculateAttendancePercent(present, playerEvents.length);
  }

  const topActive = computed(() =>
    activePlayers.value
      .map((p) => ({ name: p.name, percent: playerAttendancePercent(p) }))
      .filter((p) => p.percent > 0)
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 5)
  );

  const topInactive = computed(() =>
    activePlayers.value
      .map((p) => ({ name: p.name, percent: playerAttendancePercent(p) }))
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 5)
  );

  // Возвращаем всё готовое наружу
  return {
    totalPlayers,
    totalEvents,
    averageAttendance,
    bestStreak,
    classData,
    skillData,
    roleData,
    attendanceData,
    topActive,
    topInactive,
  };
}
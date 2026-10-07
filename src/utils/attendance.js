
// Иконка статуса явки игрока
export function getStatusIcon(status) {
  switch (status) {
    case "present": return "✅";
    case "absent": return "❌";
    case "rejected": return "🚫";
    default: return "❓";
  }
}


// Фирменный цвет статуса
export function getStatusColor(status) {
  switch (status) {
    case "present": return "#2ecc71"; // зеленый
    case "absent": return "#e74c3c";  // красный
    case "rejected": return "#e67e22"; // оранжевый
    default: return "#888888";
  }
}


// Цвет прогресс-бара карточки события по проценту посещаемости
export function getAttendanceProgressColor(percentage) {
  if (percentage === 0) return "#4b4b4b"; // серый
  if (percentage >= 90) return "#2ecc71"; // зеленый
  if (percentage >= 50) return "#f1c40f"; // желтый
  return "#e67e22"; // оранжевый
}


 // Безопасный расчет процента явки
export function calculateAttendancePercent(present, total) {
  if (!total || total <= 0) return 0;
  return Math.min(Math.round((present / total) * 100), 100);
}

export function getTimeWindow(hour) {
  if (hour >= 0 && hour < 4) return "midnight";
  if (hour >= 4 && hour < 8) return "earlyMorning";
  if (hour >= 8 && hour < 12) return "morning";
  if (hour >= 12 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 20) return "evening";
  return "night";
}
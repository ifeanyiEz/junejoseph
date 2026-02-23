
export function getGreeting(hour) {
  if (hour >= 0 && hour <= 12) return "Good Morning";
  if (hour > 12 && hour < 16) return "Good Afternoon";
  return "Good Evening";
}
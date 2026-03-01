import { getGreeting } from '../utils/greet.utils.js';
import { getTimeWindow } from '../utils/time_window.utils.js';
import { dashboardMessages } from '../config/dash_messages.config.js';

export function buildDashboardMessage(user, date = new Date()) {
    const hour = date.getHours();
    const greeting = getGreeting(hour);
    const timeWindow = getTimeWindow(hour);

    const gender = user.gender || "neutral";
    const advice = dashboardMessages[timeWindow][gender];

    const iconMap = {
        "Good Morning": {
            bgCloud: "bg-morning"
        },
        "Good Afternoon": {
            bgCloud: "bg-afternoon"
        },
        "Good Evening": {
            bgCloud: "bg-evening"
        }
    };

    const selectedBg = iconMap[greeting].bgCloud || {
        bgCloud: ""
    };

    return {
        greetingLine: `${greeting}, ${user.firstName}.`,
        adviceLine: advice,
        bgCloud: selectedBg
    };
}
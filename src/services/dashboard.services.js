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
            icon: "bi-clouds-fill",
            cssClass: "dash-morning"
        },
        "Good Afternoon": {
            icon: "bi-cloud-sun-fill",
            cssClass: "dash-afternoon"
        },
        "Good Evening": {
            icon: "bi-cloud-moon-fill",
            cssClass: "dash-evening"
        }
    };

    const selectedIcon = iconMap[greeting] || { icon: "bi-cloud", cssClass: "" };

    return {
        greetingLine: `${greeting}, ${user.firstName}.`,
        adviceLine: advice,
        icon: selectedIcon.icon,
        cssClass: selectedIcon.cssClass
    };
}
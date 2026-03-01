
(function () {
    
    const dataElement = document.getElementById("dashboard-data");
    const { user, messages } = JSON.parse(dataElement.textContent);

    const greetingsText = document.getElementById("greetings");
    const adviceText = document.getElementById("dash-message");
    const timeIcon = document.getElementById("time-icon");
    const welcomeArea = document.getElementById("welcome-area");

    let currentTimeWindow = null;
    
    function getTimeWindow(hour) {
        if (hour >= 0 && hour < 4) return "midnight";
        if (hour >= 4 && hour < 8) return "earlyMorning";
        if (hour >= 8 && hour < 12) return "morning";
        if (hour >= 12 && hour < 16) return "afternoon";
        if (hour >= 16 && hour < 20) return "evening";
        return "night";
    }

    function getGreeting(hour) {

        if (hour >= 0 && hour <= 12) return "Good Morning";
        if (hour > 12 && hour < 16) return "Good Afternoon";
        return "Good Evening";
    }

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

    function updateDashboard() {
        const hour = new Date().getHours();
        const tWindow = getTimeWindow(hour);

        if (tWindow === currentTimeWindow) return;

        currentTimeWindow = tWindow;

        const greeting = getGreeting(hour);
        const gender = user.gender || "neutral";

        const advice = messages[tWindow][gender];

        const selectedBg = iconMap[greeting].bgCloud || {
            bgCloud: ""
        };

        greetingsText.textContent = `${greeting}, ${user.firstName}.`;
        adviceText.textContent = advice;
        welcomeArea.className = `${selectedBg}`;
    }

    updateDashboard();
    setInterval(updateDashboard, 300000);
})();

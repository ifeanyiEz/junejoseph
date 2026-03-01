import express from "express";
import { dashboardMessages } from "../config/dash_messages.config.js";
import { buildDashboardMessage } from "../services/dashboard.services.js";

const router = express.Router();

router.get("/dashboard", (req, res) => {
    // Temporary mock signed-in user
    const signedInUser = {
        firstName: "Ifeanyi",
        gender: "neutral"
    };
    
    const dashboardData = buildDashboardMessage(signedInUser);
    
    res.render("dashboard.ejs", {
        greeting: dashboardData.greetingLine,
        dashMessage: dashboardData.adviceLine,
        bgClass: dashboardData.selectedBg,
        user: signedInUser,
        dashboardMessages
    });
});

export default router;
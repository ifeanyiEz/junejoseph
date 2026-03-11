import express from "express";
import { dashboardMessages } from "../config/dash_messages.config.js";
import { buildDashboardMessage } from "../services/dashboard.services.js";
import { requirePermission } from "../middleware/permission.middleware.js";

const router = express.Router();

router.get("/dashboard", requirePermission("read:portal"), (req, res) => {

    const signedInUser = req.session.user;
    
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
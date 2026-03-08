import express from "express";
import { dashboardMessages } from "../config/dash_messages.config.js";
import { buildDashboardMessage } from "../services/dashboard.services.js";

const router = express.Router();

router.get("/dashboard", (req, res) => {
    // const signedInUser = {
    //     firstName: req.session.user.first_name,
    //     gender: req.session.user.gender || "neutral"
    // };

    const signedInUser = req.session.user;

    if(!signedInUser) {
        return res.redirect("/login");
    }
    
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
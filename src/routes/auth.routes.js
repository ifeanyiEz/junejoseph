
import express from "express";
import { registerUser, loginUser } from "../services/user.services.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const newUser = await registerUser({
            first_name: firstName,
            last_name: lastName,
            email,
            password
        });

        req.session.user = {
            user_id: newUser.user_id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            gender: "neutral"
        };

        res.redirect("/user-portal/dashboard");

    } catch (error) {
        console.error(error);
        res.status(500).send("Signup failed");
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        if (!user) {
            return res.render("login.ejs", {
                invalidCredentials: { message: "Invalid email or password." }
            });
        }

        req.session.user = {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: newUser.email,
            gender: "neutral"
        };

        res.redirect("/user-portal/dashboard");

    } catch (error) {
        console.error(error);
        res.status(500).send("Login failed");
    }
});

export default router;

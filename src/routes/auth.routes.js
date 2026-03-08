
import express from "express";
import { registerUser, loginUser } from "../services/user.services.js";

const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

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
            firstName: newUser.first_name,
            lastName: newUser.last_name,
            email: newUser.email,
            gender: user.gender || "neutral"
        };

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send("Signup failed");
    }
});

router.get("/login", (req, res) => {
    res.render("login.ejs");
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
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            gender: user.gender || "neutral"
        };

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send("Login failed");
    }
});

router.get("/signout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session during logout:", err);
            return res.status(500).send("Could not log out. Please try again.");
        }

        res.clearCookie("connect.sid"); 

        res.redirect("/"); 
    });
});

export default router;

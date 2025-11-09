import express from "express";
import methodOverride from "method-override";

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

app.route("/")
    .get((req, res) => {
    res.render("index.ejs");
});

app.route("/login")
    .get((req, res) => {
        res.render("login.ejs");
    })
    .post((req, res) => {
        res.redirect("/");
    });

app.route("/signup")
    .get((req, res) => {
        res.render("signup.ejs");
    })
    .post((req, res) => {
        res.redirect("/login");
    });

app.route("/focus")
    .get((req, res) => {
        res.render("focus.ejs");
    });

app.listen(port, () => {
    console.log(`Your blog server is running on port ${port}.`);
});
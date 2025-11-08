import express from "express";
import methodOverride from "method-override";

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.listen(port, () => {
    console.log(`Your blog server is running on port ${port}.`);
});
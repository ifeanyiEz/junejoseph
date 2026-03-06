import express from "express";
import methodOverride from "method-override";
import session from "express-session";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import authRoutes from "./src/routes/auth.routes.js";


const app = express();
const port = 5000;

const loginData = [];
const thisLogin = {};
const userAccounts = [];
const subCategories = [];
const categories = [];
const allBlogs = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use("/", authRoutes);
app.use("/user-portal", dashboardRoutes);

app.route("/")
    .get((req, res) => {
    res.render("index.ejs");
});


app.route("/user-portal/articles")
    .get((req, res) => {
        res.render("articles.ejs");
    })

app.route("/user-portal/blog-posts")
    .get((req, res) => {
        res.render("blog-posts.ejs");
    })

app.route("/user-portal/all-questions")
    .get((req, res) => {
        res.render("all-questions.ejs");
    })

app.route("/user-portal/my-questions")
    .get((req, res) => {
        res.render("my-questions.ejs");
    })

app.route("/user-portal/subscriptions")
    .get((req, res) => {
        res.render("subscriptions.ejs");
    })

app.route("/user-portal/users")
    .get((req, res) => {
        res.render("users.ejs");
    })

app.route("/blogs/new")
    .get((req, res) => {
        // GET /blogs/new: Opens the form used to create a new blog post
        res.render("new-blog.ejs", { allBlogs });
    });

app.route("/blogs")
    .get((req, res) => {
        // Fetch all blog posts from the database (or array)
        res.render("all-blog.ejs", { allBlogs });
    })
    .post((req, res) => {
        // Handle form submission to create a new post (from the /blogs/new form)
        res.redirect("/blogs");
    });

app.route("/focus")
    .get((req, res) => {
        res.render("focus.ejs");
    });

app.listen(port, () => {
    console.log(`Your blog server is running on port ${port}.`);
});
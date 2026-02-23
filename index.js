import express from "express";
import methodOverride from "method-override";
import dashboardRoutes from "./src/routes/dashboard.routes.js";

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
app.use("/user-portal", dashboardRoutes);

app.route("/")
    .get((req, res) => {
    res.render("index.ejs", { thisLogin });
});

app.route("/login")
    .get((req, res) => {
        res.render("login.ejs");
    })
    .post(async (req, res) => {
        const {email, password} = req.body;

        const existingUser = userAccounts.find(user => user.email === email);
        const invalidCredentials = {"message": "Invalid email or password"}

        if (!existingUser) {
            return res.status(400).render("login.ejs", { invalidCredentials });
        }

        try {
            const passwordMatch = await comparePassword(password, existingUser.password);

            if (passwordMatch) {

                const alreadyLoggedIn = loginData.find(user => user.email === email);

                if (!alreadyLoggedIn) {

                    thisLogin.id = existingUser.userId;
                    thisLogin.firstName = existingUser.firstName;
                    thisLogin.lastName = existingUser.lastName;
                    thisLogin.email = existingUser.email;
                    thisLogin.password = existingUser.password;

                     loginData.unshift(thisLogin);
                }
                console.log(`This login Id is: ${ thisLogin.id }`)
                return res.redirect("/");
        
            } else {
                return res.status(401).render("login.ejs", { error: invalidCredentials });
            }

        } catch (error) {
            console.error("Login failed during password comparison:", error);
            return res.status(500).render("login.ejs", { error: { message: "An internal server error occurred." } });
        }
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

app.route("/signup")
    .get((req, res) => {
        res.render("signup.ejs");
    })
    .post(async (req, res) => {
        const {firstName, lastName, email, password} = req.body;

        if (!email || !password || !firstName) {
            return res.status(400).render("signup.ejs", { 
                error: { message: "All fields are required." } 
            });
        }

        const existingUser = userAccounts.find(user => user.email === email);

        if (existingUser) {
            const alreadyExists = {
                "message": `An account with email ${email} already exists. Please use a different email or login if you already have an account.`
            }
            return res.status(400).render("signup.ejs", { error: alreadyExists });
        }

        try {
            const hashedPassword = await hashPassword(password); 

            const newUser = {
                userId: slugGen(email),
                firstName, 
                lastName, 
                email, 
                password: hashedPassword,
            };
            console.log(`New user is: ${ newUser.userId }`)
            userAccounts.unshift(newUser);

            res.redirect("/login");

        } catch (error) {
            console.error("Signup failed:", error);
            
            res.status(500).render("signup.ejs", { 
                error: { message: "An unexpected error occurred during signup." } 
            });
        }
    });

app.route("/blogs/new")
    .get((req, res) => {
        // GET /blogs/new: Opens the form used to create a new blog post
        res.render("new-blog.ejs", { thisLogin, allBlogs });
    });

app.route("/blogs")
    .get((req, res) => {
        // Fetch all blog posts from the database (or array)
        res.render("all-blog.ejs", { thisLogin, allBlogs });
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
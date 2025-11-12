import express from "express";
import methodOverride from "method-override";
import bcrypt from "bcrypt";

const app = express();
const port = 5000;
const saltRounds = 10;

const loginData = [];
const thisLogin = {};
const userAccounts = [];
const subCategories = [];
const categories = [];
const allBlogs = [];

async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Failed to hash password.");
    }
}

async function comparePassword(password, hash) {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (error) {
        console.error("Error comparing password:", error);
        return false;
    }
}

const userRoles = [
    {
        "roleID":"1001",
        "roleName":"Admin User",
        "roleDescription":"Owns the project",
        "rolePermissions": "",
        "roleParent":"",
        "roleConstraints":""
    },
    {
        "roleID":"1002",
        "roleName":"Registered User",
        "roleDescription":"Can comment and react to posts, ask questions and recieve private responses",
        "rolePermissions": "",
        "roleParent":"",
        "roleConstraints":""
    },
    {
        "roleID":"1003",
        "roleName":"Unregistered User",
        "roleDescription":"Can read posts and sign up for monthly digest",
        "rolePermissions": "",
        "roleParent":"",
        "roleConstraints":""
    }
];

function slugGen(text) {
return text.toString().toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

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
                    loginData.unshift(existingUser);

                    thisLogin.id = existingUser.userId;
                    thisLogin.firstName = existingUser.firstName;
                    thisLogin.lastName = existingUser.lastName;
                    thisLogin.email = existingUser.email;
                    thisLogin.password = existingUser.password;
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
        res.render("new-blog.ejs", { thisLogin, allBlogs });
    })
    .post((req, res) => {
        res.redirect("/");
    });

app.route("/focus")
    .get((req, res) => {
        res.render("focus.ejs");
    });

app.listen(port, () => {
    console.log(`Your blog server is running on port ${port}.`);
});
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const userRouter = require("./routes/user.js");
const mongoose = require("mongoose");
const notesRouter = require("./routes/note.js");
const { isAdmin } = require("./controllers/user");

const connectDB = require("./utils/connectDB.js")
const session = require("express-session");
const flash = require("connect-flash");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
connectDB();
const cors = require("cors");

app.use(cors({
  origin: "https://mern-project-lu59.onrender.com", // React port
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.get("/",(req,res)=>{
    res.send("This is a new Project");
})






const sessionOptions = {

  secret: process.env.SESSION_SECRET || "mySuperSecretCode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
   usernameField:'email'
},User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/admin-test", isAdmin, (req, res) => {
  res.send("Admin access granted ✅");
});
app.use("/user",userRouter);
app.use("/notes", notesRouter);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is ready port No -> ${PORT}`);
})
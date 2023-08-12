import express from "express";
import passport from "passport";
import 'dotenv/config';
import router from "./routes/index.js";
import session from "express-session";
import LocalStrategy from "passport-local";
import flash from "connect-flash";
import { deserializeHygienist, hygienistUser, serializeHygienist } from "./models/Users.js";

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(hygienistUser));
passport.serializeUser(serializeHygienist);
passport.deserializeUser(deserializeHygienist);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Appointments API now listening on port 3000");
});

export default app;


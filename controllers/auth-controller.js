import passport from "passport";
import { getTemp } from "../middleware/weather-middleware.js";
import { currentDate } from "../middleware/dateToday-middleware.js";

export const registrationPage = (req, res) => {
    res.render("register", { getTemp, currentDate })
};

export const loginPage = (req, res) => {
    res.render("login", { messages: req.flash("error"), getTemp, currentDate });
};

export const handleLogin = passport.authenticate('local', {
    failureRedirect: "/login",
    // load main page after login
    successRedirect: "/appointments/hygienist",
    failureFlash: true,
   
}
);

export const handleLogout = (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
};
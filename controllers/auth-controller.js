import passport from "passport";
import { getTemp } from "../middleware/weather-middleware.js";
import { dateToday } from "../middleware/dateToday-middleware.js";

export const registrationPage = (req, res) => {
    res.render("register", { getTemp, dateToday })
};

export const loginPage = (req, res) => {
    res.render("login", { getTemp, dateToday });
};

export const handleLogin = passport.authenticate('local', {
    failureRedirect: "/login",
    // load main page after login
    successRedirect: "/appointments/hygienist"
}
);

export const handleLogout = (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
};
import passport from "passport";

export const registrationPage = (req, res) => { 
    res.render("register"); 
};

export const loginPage = (req, res) => {
    res.render("login");
};

export const handleLogin = passport.authenticate('local', {
    failureRedirect: "/login",
    successRedirect: "/appointments/hygienist/3/2023-10-23"
    }
);

export const handleLogout = (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
};
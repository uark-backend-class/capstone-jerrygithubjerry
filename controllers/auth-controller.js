import passport from "passport";


export const registrationPage = (req, res) => { 
    res.render("register"); 
};

export const loginPage = (req, res) => {
    res.render("login");
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
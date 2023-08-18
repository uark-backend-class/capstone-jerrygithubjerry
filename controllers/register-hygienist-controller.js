import db from "../db.js";
import bcrypt from "bcrypt";

export const registerHygienist = async (req, res) => {

    const name = req.body.username;
    const pwd = req.body.password;

    if (!name || !pwd) {
        req.flash("info", "Missing Credentials");
        res.redirect("/register");
        return;  
    }

    const dbResponse = await db.query(`SELECT * FROM Hygienists WHERE hygienist_name = $1`, [name])

    if (dbResponse.rows.length === 0) {

        // get salt+hash and integrate them into password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const dbAddHygienist = await db.query(`INSERT INTO 
            hygienists (hygienist_name, hygienist_password) 
            VALUES ($1, $2)`, [name, hashedPassword]);
        // not error
        req.flash("info", "Hygienist name successfully added!")        
        res.redirect("/register");
    } else {
        // error
        req.flash("info", "Hygienist already exists, please enter new name.")
        res.redirect("/register")
    }
};

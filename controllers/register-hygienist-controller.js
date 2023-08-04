import db from "../db.js";
import 'dotenv/config';
import bcrypt from "bcrypt";

export const registerHygienist = async (req, res) => {
    
    const name = req.body.username;

    const dbResponse = await db.query(`SELECT * FROM Hygienists WHERE hygienist_name = $1`, [name]) 

    if (dbResponse.rows.length === 0) {
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const dbAddHygienist = await db.query(`INSERT INTO 
            hygienists (hygienist_name, hygienist_password) 
            VALUES ($1, $2)`, [name, hashedPassword]);
        
        res.redirect("/login");  
    } 

    else {
        console.log("User already registered!")
        res.redirect("/register");
    }
};
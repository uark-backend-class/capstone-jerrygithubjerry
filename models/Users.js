import db from "../db.js";
import 'dotenv/config';
import bcrypt from "bcrypt";

export const hygienistUser = async (username, password, done) => {
  try {
    const dbResponse = await db.query('SELECT * FROM hygienists WHERE hygienist_name = $1', [username])
    const user = dbResponse.rows[0];
    if (!user) {return done(null, false, { message: "No name found, please try again." }); }
    if (user) {
      // compare entered password with hased DB password    
      const isMatch = await bcrypt.compare(password, user.hygienist_password, function(err, isMatch) {
      if (!isMatch) { return done(null, false, { message: "Incorrect password, please try again." }); }
      else {
        // hygienist name found in the database and passwords matched
        return done(null, user)
      }
    })
  } 
}   catch (err) { ( err, { message: "Internal error, please try again." }) }  };

export const serializeHygienist = (user, done) => {
  done(null, user.hygienist_id);
}

export const deserializeHygienist = (hygienist_id, done) => {
  db.query('SELECT * FROM hygienists WHERE hygienist_id = $1', [hygienist_id], (err, user) => {
    if (err) {
      return done(err)
    }
    done(err, user)
  });
};
import db from "../db.js";
import bcrypt from "bcrypt";

export const hygienistUser = async (username, password, done) => { 
  try {
  const dbResponse = await db.query('SELECT * FROM hygienists WHERE hygienist_name = $1', [ username ])
  const user = dbResponse.rows[0];
  if (!user) { console.log("Login failed!")}
  if (user) {     
    // compare entered password with hased DB password    
    const isMatch = await bcrypt.compare(password, user.hygienist_password);
    if (!isMatch) { console.log("Incorrect password!")}

    else { 
      // hygienist name found in the database and passwords matched
      return done(null, user) 
    }
  
  } 
  } catch (err) { console.log("Internal error"); }
};

export const serializeHygienist = (user, done) => {
  done (null, user.hygienist_id);
}

export const deserializeHygienist = (hygienist_id, done) => {
  db.query('SELECT * FROM hygienists WHERE hygienist_id = $1', [ hygienist_id ], (err, user) => { 
      if(err) {
        return done(err)
      }
      done(err, user)
    });
}


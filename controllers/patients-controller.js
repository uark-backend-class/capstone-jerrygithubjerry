import db from "../db.js";
import 'dotenv/config';

export const getAllPatients = async (req, res) => {

  const dbResponse = await db.query(`SELECT * FROM patients ORDER BY patients_name`);

  const patients = dbResponse.rows;

  res.render('main-patients-view', { patients });
};
import db from "../db.js";
import { getTemp } from "../middleware/weather-middleware.js";
import { currentDate } from "../middleware/dateToday-middleware.js";

export const getAllPatients = async (req, res) => {
  const dbResponse = await db.query(`SELECT * FROM patients ORDER BY patients.patient_name`);
  const patients = dbResponse.rows;
  res.render('main-patients-view', { messages: req.flash("info"), patients, getTemp, currentDate });
};
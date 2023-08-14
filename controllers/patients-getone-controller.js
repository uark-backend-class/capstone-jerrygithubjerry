import db from "../db.js";
import { getTemp } from "../middleware/weather-middleware.js";
import { currentDate } from "../middleware/dateToday-middleware.js";

export const getOnePatient = async (req, res) => {

  const id = req.params.patient_id;

  const dbSelectedPatient = await db.query(`SELECT * FROM patients WHERE patients.patient_id = $1`, [id]);
  const currentPatient = dbSelectedPatient.rows[0];

  const dbPatients = await db.query(`SELECT * FROM patients`);
  const patients = dbPatients.rows;

  res.render('edit-patient-form', { patients, currentPatient, getTemp, currentDate });
};

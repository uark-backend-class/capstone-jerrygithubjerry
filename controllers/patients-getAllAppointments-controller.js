import db from "../db.js";
import { getTemp } from "../middleware/weather-middleware.js";
import { currentDate } from "../middleware/dateToday-middleware.js";

export const getAllPatientAppointments = async (req, res) => {
  const id = req.params.patient_id;
  const dbSelectedAppointments = await db.query(`SELECT appointments.date, appointments.time, appointments.service, hygienists.hygienist_name
    FROM appointments, hygienists WHERE appointments.patient_id = $1 AND hygienists.hygienist_id = appointments.hygienist_id`, [id]);
  const selectedAppointments = dbSelectedAppointments.rows;
  const dbSelectedPatient = await db.query(`SELECT * FROM patients WHERE patients.patient_id = $1`, [id]);
  const selectedPatient = dbSelectedPatient.rows[0];
  const dbPatients = await db.query(`SELECT * FROM patients ORDER BY patients.patient_name`);
  const patients = dbPatients.rows;
  res.render('viewAll-patient-appointments-form', {messages: req.flash("info"), patients, selectedPatient, selectedAppointments, getTemp, currentDate });
};
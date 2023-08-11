import db from "../db.js";
import 'dotenv/config';
import { getTemp } from "../middleware/weather-middleware.js";
import { dateToday } from "../middleware/dateToday-middleware.js";

export const getAllAppointments = async (req, res) => {

  const id = req.params.hygienist_id;
  const dateData = req.params.appointment_date;

  const dbResponse = await db.query(`SELECT appointments.appointment_id, appointments.time,
    appointments.service, appointments.date, appointments.hygienist_id, patients.patient_name, hygienists.hygienist_id, 
    hygienists.hygienist_name
    FROM appointments, hygienists, patients
    WHERE appointments.patient_id = patients.patient_id AND
    appointments.hygienist_id = $1
    AND hygienists.hygienist_id = $1 
    AND appointments.date = $2 ORDER BY CAST(appointments.time AS time)`, [id, dateData]);

  const appointments = dbResponse.rows;
  const selectedDate = dateData;
  const dbselectedHygienist = await db.query(`SELECT * FROM hygienists WHERE hygienist_id = $1`, [id]);
  const selectedHygienist = dbselectedHygienist.rows[0].hygienist_name;

  const dbHygienist = await db.query(`SELECT * FROM hygienists`);
  const hygienists = dbHygienist.rows;

  const dbPatient = await db.query(`SELECT * FROM patients ORDER BY patient_name`);
  const patients = dbPatient.rows;

  const dbTimes = await db.query(`SELECT * FROM times`);
  const times = dbTimes.rows;

  res.render('main-appointments-view', { appointments, hygienists, patients, times, selectedDate, selectedHygienist, getTemp, dateToday });
};
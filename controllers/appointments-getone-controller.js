import db from "../db.js";
import 'dotenv/config';
import { getTemp } from "../middleware/weather-middleware.js";
import { dateToday } from "../middleware/dateToday-middleware.js";

export const getOneAppointment = async (req, res) => {

  const selectedAppt = req.params.appointment_id;
  const id = req.params.hygienist_id;
  const dateData = req.params.appointment_date;

  const dbResponse = await db.query(`SELECT appointments.appointment_id, appointments.time,
    appointments.service, appointments.date, appointments.hygienist_id, patients.patient_name, hygienists.hygienist_id, 
    hygienists.hygienist_name
    FROM appointments, hygienists, patients
    WHERE appointments.patient_id = patients.patient_id AND
    appointments.hygienist_id = hygienists.hygienist_id
    AND hygienists.hygienist_id = $1 
    AND appointments.date = $2 ORDER BY CAST(appointments.time AS time)`, [id, dateData]);

  const dbSelectedAppt = await db.query(`SELECT * FROM appointments WHERE appointment_id = $1`, [selectedAppt])
  const currentAppt = dbSelectedAppt.rows[0];

  const appointments = dbResponse.rows;

  const selectedDate = dbResponse.rows[0].date;
  const selectedHygienist = dbResponse.rows[0].hygienist_name;

  const dbHygienist = await db.query(`SELECT * FROM hygienists`);
  const hygienists = dbHygienist.rows;

  const dbPatient = await db.query(`SELECT * FROM patients ORDER BY patient_name`);
  const patients = dbPatient.rows;

  const dbTime = await db.query(`SELECT * FROM times`);
  const times = dbTime.rows;

  res.render('edit-appointment-form', {
    appointments: appointments, hygienists: hygienists, patients: patients, times,
    selectedDate, selectedHygienist, getTemp, dateToday, currentAppt
  });
};


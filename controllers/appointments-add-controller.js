import db from "../db.js";

export const addAppointment = async (req, res) => {
  
  const f_time = req.body.form_time;
  const f_patient_id = req.body.form_patient_id;
  const f_service = req.body.form_service;
  const f_date = req.body.form_date;
  const f_hygienist_id = req.body.form_hygienist_id;
  try {
  const dbResponse = await db.query(`INSERT INTO 
    appointments (hygienist_id, patient_id, date, time, service) 
    VALUES ($1, $2, $3, $4, $5)`, [f_hygienist_id, f_patient_id, f_date, f_time, f_service]);
  } catch (err) {
      console.log('Duplicate or Invalid Appointment Entered!')
  }

res.redirect("/appointments/hygienist/" + f_hygienist_id + "/" + f_date);

};
import db from "../db.js";

export const addAppointment = async (req, res, next) => {
  const f_time = req.body.form_time;
  const f_patient_id = req.body.form_patient_id;
  const f_service = req.body.form_service;
  const f_date = req.body.form_date;
  const f_hygienist_id = req.body.form_hygienist_id;
  const f_previous_hygienist_id = req.body.form_previous_hygienist_id;
  const f_previous_date = req.body.form_previous_date;
  const notified = false;
  const updated = false;
  try {
    const dbAddResponse = await db.query(`INSERT INTO 
    appointments (hygienist_id, patient_id, date, time, service, notified, updated) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`, [f_hygienist_id, f_patient_id, f_date, f_time, f_service, notified, updated]);
  } catch (err) {
    req.flash("info", "Conflict in schedule, appointment not saved!");
    res.redirect("/appointments/hygienist/" + f_previous_hygienist_id + "/" + f_previous_date); 
    return;   
  }
  res.redirect("/appointments/hygienist/" + f_hygienist_id + "/" + f_date);
};
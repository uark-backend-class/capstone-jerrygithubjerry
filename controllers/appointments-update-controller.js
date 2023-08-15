import db from "../db.js";

export const updateAppointment = async (req, res) => {

  const f_appt_id = req.body.form_appt_id;
  const f_time = req.body.form_time;
  const f_patient_id = req.body.form_patient_id;
  const f_service = req.body.form_service;
  const f_date = req.body.form_date;
  const f_hygienist_id = req.body.form_hygienist_id;
  const f_previous_hygienist_id = req.body.form_previous_hygienist_id;
  const f_previous_date = req.body.form_previous_date;

  try {
    const dbResponse = await db.query(`UPDATE appointments SET
    hygienist_id = $1, patient_id = $2, date = $3, time = $4, service = $5 
    WHERE appointment_id = $6 RETURNING *`, [f_hygienist_id, f_patient_id, f_date, f_time, f_service, f_appt_id]);
  } catch (err) {
    req.flash("info", "Changes to the appointment cannot be saved.");
    res.redirect("/appointments/hygienist/" + f_previous_hygienist_id + "/" + f_previous_date); 
    return;
  }
  
    
    res.redirect("/appointments/hygienist/" + f_hygienist_id + "/" + f_date); 
  
};
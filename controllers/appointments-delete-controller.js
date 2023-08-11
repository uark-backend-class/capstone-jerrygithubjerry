import db from "../db.js";

export const deleteAppointment = async (req, res) => {

  const deletedAppt = req.params

  const dbResponse = await db.query(`DELETE FROM appointments WHERE appointment_id = $1 RETURNING *`, [deletedAppt.appointment_id]);

  if (dbResponse.rows.length <= 0) {
    res.status(404).send();
    return;
  }

  res.redirect("/appointments/hygienist/" + deletedAppt.hygienist_id + "/" + deletedAppt.appointment_date);

};
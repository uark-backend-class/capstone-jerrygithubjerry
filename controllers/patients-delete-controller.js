import db from "../db.js";

export const deletePatient = async (req, res) => {

  const deletedPatient = req.params;

  const dAppointments = await db.query(`DELETE FROM appointments WHERE patient_id = $1 RETURNING *`, [deletedPatient.patient_id]);
  const dbResponse = await db.query(`DELETE FROM patients WHERE patient_id = $1 RETURNING *`, [deletedPatient.patient_id]);

  if (dbResponse.rows.length <= 0) {
    res.status(404).send();
    return;
  }

  res.redirect("/patients/record");

};


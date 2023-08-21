import db from "../db.js";

export const editPatientPage = async (req, res) => {
  const patient_id = req.body.form_patient_id;
  const name = req.body.form_patient_name;
  const address = req.body.form_patient_address;
  const phone = req.body.form_patient_phone;
  const email = req.body.form_patient_email;
  const insurance = req.body.form_patient_insurance;
  try {
    const dbResponse = await db.query(`UPDATE patients SET patient_address = $1, patient_phone = $2, 
    patient_email = $3, patient_insurance = $4 
    WHERE patient_id = $5 RETURNING *`, [address, phone, email, insurance, patient_id]);
  } catch (err) {
    req.flash("info", err.toString('utf8'));
  }
  res.redirect("/patients/record");
};
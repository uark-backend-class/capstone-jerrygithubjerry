import db from "../db.js";

export const addPatient = async (req, res, next) => {
  const name = req.body.form_patient_name;
  const address = req.body.form_patient_address;
  const phone = req.body.form_patient_phone;
  const email = req.body.form_patient_email;
  const insurance = req.body.form_patient_insurance;
  try {
    const dbAddResponse = await db.query(`INSERT INTO 
    patients (patient_name, patient_address, patient_phone, patient_email, patient_insurance) 
    VALUES ($1, $2, $3, $4, $5)`, [name, address, phone, email, insurance]);
  } catch (err) {
    req.flash("info", "Patient already exists!");
  }
  res.redirect("/patients/record");
};
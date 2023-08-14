import db from "../db.js";

export const addPatient = async (req, res, next) => {

  const name = req.body.form_patient_name;
  const address = req.body.form_patient_address;
  const phone = req.body.form_patient_phone;
  const insurance = req.body.form_patient_insurance;
  
  try {
    const dbAddResponse = await db.query(`INSERT INTO 
    patients (patient_name, patient_address, patient_phone, patient_insurance) 
    VALUES ($1, $2, $3, $4)`, [name, address, phone, insurance]);

  } catch (err) {
    console.log('Duplicate or Invalid Patient Entered!');
  }

  res.redirect("/patients/record");

};
import db from "../db.js";

export const editPatientPage = async (req, res) => {

  const id = req.params.patient_id;
  const name = req.body.form_patient_name;
  const address = req.body.form_patient_address;
  const phone = req.body.form_patient_phone;
  const insurance = req.body.form_patient_insurance;

  try {
    const dbResponse = await db.query(`UPDATE patients SET
    patient_address = $1, patient_phone = $2, patient_insurance = $3 
    WHERE patient_id = $4 RETURNING *`, [address, phone, insurance, id]);
  } catch (err) {
    console.log('Duplicate or Invalid Data Entered!')
  }
  res.redirect("/patients/record");

};
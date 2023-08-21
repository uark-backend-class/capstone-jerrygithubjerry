import db from "../db.js";
import nodemailer from "nodemailer";
import { currentDate } from "../middleware/dateToday-middleware.js";

export const sendNotification = async (req, res) => {
  const notifiedAppt = req.params;
  const email = req.body.form_patient_email;
  const service = req.body.form_patient_service;
  const dateUnformat = req.params.appointment_date;
  const datePattern = /(\d{4})\-(\d{2})\-(\d{2})/;
  const date = dateUnformat.replace(datePattern,'$2-$3-$1')
  const time = req.body.form_time;
  const updated = req.body.form_updated;
  const name = req.body.form_patient_name;
  const notified = true;
  
  try { 
    const emailSubject = `${currentDate} appointment at Rogers Dental Demo`
    const emailText = () => { if (updated === "false") {
        return `${name} is scheduled for ${service} on ${date} at ${time}.`
      } 
        else {
        return `${name}'s appointment for ${service} has been rescheduled to ${date} at ${time}.`
      }};

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});
    const info = await transporter.sendMail({
      from: process.env.MAIL_USERNAME, 
      to: email, 
      subject: emailSubject, 
      text: emailText()   
    });
    transporter.close();

    const dbResponse = await db.query(`UPDATE appointments SET
    notified = $1 WHERE appointment_id = $2 RETURNING *`, [notified , notifiedAppt.appointment_id]);

  } catch (err) {
    req.flash("info", "Error in sending email!");
    res.redirect("/appointments/hygienist/" + notifiedAppt.hygienist_id + "/" + notifiedAppt.appointment_date); 
    return; 
  } 
    req.flash("info", "Message was sent successfully.")
    res.redirect("/appointments/hygienist/" + notifiedAppt.hygienist_id + "/" + notifiedAppt.appointment_date);
 };
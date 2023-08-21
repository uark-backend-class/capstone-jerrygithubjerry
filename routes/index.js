import express from "express";

import isAuthenticated from "../middleware/is-authenticated.js";
import setAuthLocals from "../middleware/set-auth-locals.js";

import { registerHygienist } from "../controllers/register-hygienist-controller.js";
import { getOneAppointment } from "../controllers/appointments-getOne-controller.js";
import { getAllAppointments } from "../controllers/appointments-controller.js";
import { addAppointment } from "../controllers/appointments-add-controller.js";
import { updateAppointment } from "../controllers/appointments-update-controller.js";
import { deleteAppointment } from "../controllers/appointments-delete-controller.js";
import { handleLogin, handleLogout, loginPage, registrationPage } from "../controllers/auth-controller.js";
import { mainPageAfterChange } from "../controllers/appointments-mainPageAfterChange-controller.js";
import { mainPageAfterLogin } from "../controllers/appointments-mainPageAfterLogin-controller.js";
import { getAllPatients } from "../controllers/patients-controller.js";
import { getOnePatient } from "../controllers/patients-getOne-controller.js";
import { editPatientPage } from "../controllers/patients-update-controller.js";
import { deletePatient } from "../controllers/patients-delete-controller.js";
import { addPatient } from "../controllers/patients-add-controller.js";
import { getAllPatientAppointments } from "../controllers/patients-getAllAppointments-controller.js";
import { sendNotification } from "../controllers/appointments-notify-controller.js";

const router = express.Router();

router.get("/register", registrationPage);
router.post("/register", registerHygienist);
router.get("/login", loginPage);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);

router.use(isAuthenticated);
router.use(setAuthLocals);

// appointment routes
router.get("/appointments/hygienist", mainPageAfterLogin);
router.post("/appointments/hygienist", mainPageAfterChange);
router.get("/appointments/hygienist/:hygienist_id/:appointment_date", getAllAppointments);
router.get("/appointments/hygienist/:hygienist_id/:appointment_date/:appointment_id", getOneAppointment);
router.post("/appointments/hygienist/:id", addAppointment);
router.post("/appointments/:id", updateAppointment);
router.post("/appointments/hygienist/delete/:hygienist_id/:appointment_date/:appointment_id", deleteAppointment);
router.post("/appointments/hygienist/notify/:hygienist_id/:appointment_date/:appointment_id", sendNotification)

// patient routes
router.get("/patients/record", getAllPatients);
router.post("/patients/record/add/:id", addPatient);
router.get("/patients/record/edit/:patient_id", getOnePatient);
router.post("/patients/record/:patient_id", editPatientPage);
router.post("/patients/record/delete/:patient_id", deletePatient);
router.get("/patients/appointments/view/:patient_id", getAllPatientAppointments);

export default router;
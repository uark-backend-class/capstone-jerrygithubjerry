import express from "express";

import isAuthenticated from "../middleware/is-authenticated.js";
import setAuthLocals from "../middleware/set-auth-locals.js";

import { registerHygienist } from "../controllers/register-hygienist-controller.js";
import { getOneAppointment } from "../controllers/appointments-getone-controller.js";
import { getAllAppointments } from "../controllers/appointments-controller.js";
import { addAppointment } from "../controllers/appointments-add-controller.js";
import { updateAppointment } from "../controllers/appointments-update-controller.js";
import { deleteAppointment } from "../controllers/appointments-delete-controller.js";
import { handleLogin, handleLogout, loginPage, registrationPage } from "../controllers/auth-controller.js";
import { mainPageAfterChange } from "../controllers/appointments-mainPageAfterChange-controller.js";
import { mainPageAfterLogin } from "../controllers/appointments-mainPageAfterLogin-controller.js";

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
router.post("/appointments/hygienist/:hygienist_id/:appointment_date/:appointment_id", deleteAppointment);

// patient routes
// router.get("/patients/record", patientListPage);
// router.get("/add-edit-patient", handleAddEditPatient);
// router.post("edit-patient/:id", editPatientPage);
// router.get("/delete-patient/:id", handleDeletePatient)

export default router;
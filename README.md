# Patient Appointment Scheduler
A scheduling application on patients'
dentist appointments utilizing JavaScript, Express.js,
ElephantSQL, HTML/CSS and EJS template engine.

SQL Query To start and create an empty database:

CREATE TABLE hygienists(hygienist_id INT GENERATED ALWAYS AS IDENTITY, hygienist_name VARCHAR(255) NOT NULL UNIQUE, hygienist_email VARCHAR(255) NOT NULL UNIQUE, hygienist_password VARCHAR(255) NOT NULL, PRIMARY KEY(hygienist_id));

CREATE TABLE patients(patient_id INT GENERATED ALWAYS AS IDENTITY, patient_name VARCHAR(255) NOT NULL UNIQUE, patient_address VARCHAR(255), patient_phone VARCHAR(255), patient_email VARCHAR(255), patient_insurance VARCHAR(255), PRIMARY KEY(patient_id));

CREATE TABLE appointments (appointment_id INT GENERATED ALWAYS AS IDENTITY, hygienist_id INT, patient_id INT, date VARCHAR(255) NOT NULL, time VARCHAR(255) NOT NULL,
service VARCHAR(255) NOT NULL, notified BOOLEAN NOT NULL, updated BOOLEAN NOT NULL, PRIMARY KEY(appointment_id), CONSTRAINT fk_hygienist FOREIGN KEY(hygienist_id) REFERENCES hygienists(hygienist_id), CONSTRAINT hygienist_date_time UNIQUE (hygienist_id, date, time), CONSTRAINT patient_date_time UNIQUE (patient_id, date, time), CONSTRAINT fk_patient FOREIGN KEY(patient_id) REFERENCES patients(patient_id));

CREATE TABLE times
(time VARCHAR(255) NOT NULL);



INSERT INTO times (time) VALUES ('8:00 AM');
INSERT INTO times (time) VALUES ('9:00 AM');
INSERT INTO times (time) VALUES ('10:00 AM');
INSERT INTO times (time) VALUES ('11:00 AM');
INSERT INTO times (time) VALUES ('12:00 PM');
INSERT INTO times (time) VALUES ('1:00 PM');
INSERT INTO times (time) VALUES ('2:00 PM');
INSERT INTO times (time) VALUES ('3:00 PM');
INSERT INTO times (time) VALUES ('4:00 PM');
INSERT INTO times (time) VALUES ('5:00 PM');

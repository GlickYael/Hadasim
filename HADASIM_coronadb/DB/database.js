import mysql from 'mysql2';

const pool = mysql.createPool(
  {  host: '127.0.0.1',
  user: 'root',
  password:'YAIR323059717',
  database:'coronadb',

  }
).promise();

function createDB() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    // Check if the database exists
    con.query("SHOW DATABASES LIKE 'coronaDB'", function (err, result) {
      if (err) throw err;

      if (result.length === 0) {
        // Database doesn't exist, create it
        con.query("CREATE DATABASE coronaDB", function (err, result) {
          if (err) throw err;
          console.log("Database 'coronaDB' created");
        });
      } else {
        // Database already exists
        console.log("Database 'coronaDB' already exists");
      }
    });
  });
}

function createPatientTable() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Check if the table exists
    con.query("SHOW TABLES LIKE 'patients'", function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        // Table does not exist, create it
        var sql =
          "CREATE TABLE patients (id INT(9) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, street VARCHAR(255) NOT NULL, houseNumber INT NOT NULL, birthDate DATE NOT NULL, telephone VARCHAR(20) NOT NULL, phone VARCHAR(20) NOT NULL, positiveResultReceivingDate DATE, coronaRecoveryDate DATE)";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
      } else {
        // Table already exists
        console.log("Table 'patients' already exists");
      }
    });
  });
}

export default function createVaccinationsTable() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Check if the table exists
    con.query("SHOW TABLES LIKE 'vaccinations'", function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        // Table does not exist, create it
        var sql =
          "CREATE TABLE vaccinations (id INT(9) AUTO_INCREMENT PRIMARY KEY, patientId INT(9), vaccineReceivingDate DATE, manufacturer VARCHAR(255), FOREIGN KEY (patientId) REFERENCES patient(id))";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
      } else {
        // Table already exists
        console.log("Table 'vaccinations' already exists");
      }
    });
  });
}

// //CRUD - patients
// //read:

export async function readAllPatients() {
  const [result] = await pool.query("SELECT * FROM patients");
  return result;
}

export async function readPatient(id) {
    var sql = "SELECT * FROM patients WHERE id = ?";
    const [result] =await pool.query(sql, [id]);
    console.log(result);
    return result;
}
//post
const patient = {
  id: 4, // Assuming the ID is provided or generated elsewhere
  name: "yael",
  city: "llk",
  street: "123 Main Street",
  houseNumber: 123,
  birthDate: "1990-05-15", // Date format: YYYY-MM-DD
  telephone: "123-456-7890",
  phone: "987-654-3210",
  positiveResultReceivingDate: "2024-03-27", // Date format: YYYY-MM-DD
  coronaRecoveryDate: "2024-04-10", // Date format: YYYY-MM-DD
};

export async function createPatient(patient) {
    var sql =
      "INSERT INTO patients (id, name, city, street, houseNumber, birthDate, telephone, phone, positiveResultReceivingDate, coronaRecoveryDate) VALUES ?";
    var values = [
      [
        patient.id,
        patient.name,
        patient.city,
        patient.street,
        patient.houseNumber,
        patient.birthDate,
        patient.telephone,
        patient.phone,
        patient.positiveResultReceivingDate,
        patient.coronaRecoveryDate,
      ],
    ];
    const [result]= await pool.query(sql, [values]);
    return result;
}

// console.log(await createPatient(patient));

// ///לבדוק שלא מעדכן אחד שלא קיים.
// //update
export async function updatePatient(patientId, updatedPatient) {
      // Construct SQL query to update the patient
      var sql = `UPDATE patients
                 SET name = ?, city = ?, street = ?, houseNumber = ?,
                     birthDate = ?, telephone = ?, phone = ?,
                     positiveResultReceivingDate = ?, coronaRecoveryDate = ?
                 WHERE id = ?`;
      // Extract updated patient data
      var values = [
        updatedPatient.name,
        updatedPatient.city,
        updatedPatient.street,
        updatedPatient.houseNumber,
        updatedPatient.birthDate,
        updatedPatient.telephone,
        updatedPatient.phone,
        updatedPatient.positiveResultReceivingDate,
        updatedPatient.coronaRecoveryDate,
        patientId
      ];
      const [result] = await pool.query(sql, values);
      return result;
}

//delete
export async function deletePatient(id){
    var sql = "DELETE FROM patients WHERE id = ?";
    const [result] = await  pool.query(sql,[id]);
    return result;
}

// //CRUD vaccinations:
// //read:
export async function readAllVaccinations() {
  const [result] = await pool.query("SELECT * FROM vaccinations");
  return result;
}


export async function readVaccine(patientId) {
  var sql = "SELECT * FROM vaccinations WHERE patientId = ?";
  const [result] = await pool.query(sql, [patientId]);
  return result;
}

//create
const vaccination={
  patientId:2,
  vaccineReceivingDate:"2024-04-10",
  manufacturer:"Lai"
}

export async function createVaccination(vaccination){
    var sql = "INSERT INTO vaccinations (patientId, vaccineReceivingDate, manufacturer) VALUES ?";
    var value = [[vaccination.patientId,vaccination.vaccineReceivingDate,vaccination.manufacturer]];
    const [result] =await pool.query(sql, [value]);
    return result;
}
//update
export async function updateVaccine(id, updatedVaccine) {
    var sql = `UPDATE vaccinations SET vaccineReceivingDate = ?, manufacturer = ? WHERE id = ?`;
    // Extract updated patient data
    var values = [updatedVaccine.vaccineReceivingDate,updatedVaccine.manufacturer,id];
    const [result] = await pool.query(sql, values)
}

//delete
export async function deleteVaccine(id){
    var sql = "DELETE FROM vaccinations WHERE patientId = ?";
    const [result] = await pool.query(sql,[id])
}

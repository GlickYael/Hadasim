import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {readAllPatients, readPatient,readVaccine,createPatient,createVaccination,updatePatient,updateVaccine,deletePatient,deleteVaccine}  from "../DB/database.js";
const server = express();

server.listen(3000,()=>console.log('listening on port 3000...'));
server.use(cors());
server.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
server.use(bodyParser.json());

//CRUD
//read
server.get("/patients", async (req,res)=>{
    const patients = await readAllPatients();
    console.log(patients);
    res.send(patients);
});



server.get("/patients/:id",async (req,res)=>{
  const id = req.params.id;
  const patient = await readPatient(id);
  res.send(patient);
})
server.get("/vaccinations/:id",async (req,res)=>{
  const id = req.params.id;
  const vaccinations = await readVaccine(id);
  res.send(vaccinations);
})


//post
server.post("/patients", async (req, res) => {
  try {
    const patient = req.body;
    const newPatient = await createPatient(patient);
    res.status(201).json(newPatient); // Return 201 Created status and the new patient
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Failed to create patient" }); // Return 500 Internal Server Error
  }
});


const vaccination={
  patientId:7,
  vaccineReceivingDate:"2024-04-10",
  manufacturer:"Lai"
}


server.post("/vaccinations", async (req,res)=>{ 
  try {
    const vaccine = req.body;
    const newVaccine = await createVaccination(vaccine);
    res.status(201).json(newVaccine); // Return 201 Created status and the new patient
  } catch (error) {
    console.error("Error creating vaccine:", error);
    res.status(500).json({ error: "Failed to create vaccine" }); // Return 500 Internal Server Error
  }
 });

 





// put
server.put("/patients/:id", async (req,res)=>{
  const id = req.params.id;
  const patient = req.body;
  const updatedPatient = await updatePatient(id,patient);
  res.send(updatedPatient);
}); //

server.put("/vaccinations/:id", async (req,res)=>{
  const id = req.params.id;
  const vaccination = req.body;
  const updatedVaccination = await updateVaccine(id,vaccination);
  res.send(updatedVaccination);
}); 
//delete
server.delete("/patients/:id", async (req,res)=>{
  const id = req.params.id;
  const deletedPatient = await deletePatient(id);
  res.send(deletedPatient);
});



server.delete("/vaccinations/:id", async (req,res)=>{
  const id = req.params.id;
  const deletedVaccination = await deleteVaccine(id);
  res.send(deletedVaccination);
}); //
export default server;
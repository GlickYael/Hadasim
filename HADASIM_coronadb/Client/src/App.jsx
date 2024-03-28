import "./App.css";
import Patient from "./assets/Patient";
import Patients from "./assets/Patients";
import { Route, Routes, Navigate } from "react-router-dom";
import {  useState } from "react";

function App() {
  const [patients,setPatients]=useState([]);
  const [patient,setPatient]=useState(null);
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/patients" />} />
        <Route path="/patients" element={<Patients patientsDB={patients} setPatientsDB={setPatients} setPatient={setPatient} />}/>
        <Route path="/patients/:id" element={<Patient patientsDB={patients} setPatientsDB={setPatients} patient={patient}/>} />
      </Routes>
  );
}

export default App;
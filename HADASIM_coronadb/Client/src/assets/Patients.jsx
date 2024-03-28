/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PatientInList from "./PatientInList";
import { useNavigate } from "react-router-dom";
import AddingPatient from './AddingPatient';

function Patients({patientsDB,setPatientsDB,setPatient}) {
  const navigate = useNavigate();
  const [addingPatient, setAddingPatient] = useState(false);
  useEffect(() => {
     fetch("http://localhost:3000/patients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to find patients");
        }
        return response.json();
      })
      .then((patients) => {
        setPatientsDB(patients);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);//////
  return (
    <>
      <div>
        <h1>Patients</h1>
        <button onClick={() => {setAddingPatient(true);}}> Add Patient </button>
        <br />
        {addingPatient && <AddingPatient setAddingPatient={setAddingPatient} patientsDB={patientsDB}setPatientsDB={setPatientsDB}/>}
        {patientsDB.map(async(p) =>  {
          return <><button key={p.id} onClick={() => { 
            setPatient(p);
            navigate(`/patients/${p.id}`);
          }}><PatientInList patient={p} key={p.id} /></button></>
        
           })}
      </div>
    </>
  );
}
export default Patients;

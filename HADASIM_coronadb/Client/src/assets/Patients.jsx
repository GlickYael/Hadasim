/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PatientInList from "./PatientInList";
import { useNavigate } from "react-router-dom";
import AddingPatient from './AddingPatient';

function Patients({patientsDB,setPatientsDB,setPatient}) {
  const navigate = useNavigate();
  const [dataOnScreen, setDataOnScreen] = useState([]);
  const [addingPatient, setAddingPatient] = useState(false);
  useEffect(() => {
    fetch('http://localhost:3000/patients')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data:', data);
      setDataOnScreen(data)   
     })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);
  return (
    <>
      <div>
        <h1>Patients</h1>
        <button onClick={() => {setAddingPatient(true);}}> Add Patient </button>
        <br />
        {addingPatient && <AddingPatient setAddingPatient={setAddingPatient} patientsDB={patientsDB}setPatientsDB={setPatientsDB}/>}
        {dataOnScreen.map(async(p) =>  {return <><button key={p.id} onClick={() => {  setPatient(p);navigate(`/patients/${p.id}`);}}><PatientInList patient={p} key={p.id} /></button></>})}
      </div>
    </>
  );
}
export default Patients;

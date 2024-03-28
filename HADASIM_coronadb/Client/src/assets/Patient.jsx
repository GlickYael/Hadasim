/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditPatient from "./EditPatient";

function Patient({ patient, setPatientsDB, patientsDB }) {
  let navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [coronaVaccinations, setCoronaVaccinations] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/vaccinations/${patient.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to find vaccinations");
        }
        return response.json();
      })
      .then((vaccines) => {
        setCoronaVaccinations(vaccines);
        console.log(coronaVaccinations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handlingDelete() {
    fetch(`http://localhost:3000/vaccinations/${patient.Id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const newPatientsArray = patientsDB.filter((p) => p.id != patient.id);
          setPatientsDB(newPatientsArray);
        } else {
          throw new Error("Failed to delete the patient vaccations.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch(`http://localhost:3000/patients/${patient.Id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/patients");
        } else {
          throw new Error("Failed to delete the patient.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <button
        onClick={() => {
          navigate("/patients");
        }}
      >
        ❌
      </button>
      <button
        onClick={() => {
          setEdit(true);
        }}
      >
        Edit Patient Details
      </button>
      <button
        onClick={() => {
          handlingDelete();
        }}
      >
        Delete Patient
      </button>
      <h2>{patient.name}</h2>
      <ul>
        <li>ID:{patient.id}</li>
        <li>City:{patient.city}</li>
        <li>Street:{patient.street}</li>
        <li>Building:{patient.building}</li>
        <li>BirthDate:{patient.birthDate}</li>
        <li>Telephone:{patient.telephone}</li>
        <li>Phone:{patient.phone}</li>
        <li>{patient.positiveResultReceivingDate}</li>
        <li>{patient.coronaRecoveryDate}</li>
        <li>
          <ol>
            <p>vaccinations:</p>
            {coronaVaccinations.map((c) => {
              <li>
                Vaccine Receiving Date: {c.vaccineReceivingDate}
                <br />
                Vaccine Manufacturer: {c.manufacturer}
              </li>;
            })}
          </ol>
        </li>
      </ul>
      {edit && (
        <EditPatient
          setEdit={setEdit}
          patient={patient}
          coronaVaccinations={coronaVaccinations}
          setCoronaVaccinations={setCoronaVaccinations}
          patientsDB={patientsDB}
          setPatientsDB={setPatientsDB}
        />
      )}
    </>
  );
}
export default Patient;

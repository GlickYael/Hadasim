/* eslint-disable react/prop-types */
import { useRef } from "react";

function AddingPatient({ setAddingPatient, patientsDB, setPatientsDB }) {
  const nameRef = useRef();
  const idRef = useRef();
  const phoneRef = useRef();
  const telephoneRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const houseNumberRef = useRef();
  const birthDateRef = useRef();
  const vaccineReceivingDateRef = [useRef(), useRef(), useRef(), useRef()];
  const manufacturerRef = [useRef(), useRef(), useRef(), useRef()];
  const positiveResultReceivingDateRef = useRef();
  const coronaRecoveryDateRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const patient = {
      name: nameRef.current.value,
      id: idRef.current.value,
      city: cityRef.current.value,
      street: streetRef.current.value,
      houseNumber: houseNumberRef.current.value,
      birthDate: birthDateRef.current.value,
      telephone: telephoneRef.current.value,
      phone: phoneRef.current.value,
      positiveResultReceivingDate: positiveResultReceivingDateRef.current.value,
      coronaRecoveryDate: coronaRecoveryDateRef.current.value,
    };
    let vaccinations = [];
    for (let i = 0; i < vaccineReceivingDateRef.length; i++) {
      if (
        vaccineReceivingDateRef[i].current.value!=="" &&
        manufacturerRef[i].current.value!==""
      ) {
        vaccinations.push({
          patientId: idRef.current.value,
          vaccineReceivingDate: vaccineReceivingDateRef[i].current.value,
          manufacturer: manufacturerRef[i].current.value,
        });
      }
    }
    console.log(patient);
    fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create patient");
        }
        return response.json();
      })
      .then((newPatient) => {
        console.log("New patient created:", newPatient);
      })
      .catch((error) => {
        console.error("Error creating patient:", error);
      })
      .then(() => {
        vaccinations.forEach((v) => {
          fetch("http://localhost:3000/vaccinations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(v)
          })
          .then(response => {
            console.log(response.ok);
            if (!response.ok) {
              throw new Error("Failed to create patient");
            }
            return response.json();
          })
          .then(newV => {
            console.log("New patient created:", newV);
          })
          .catch(error => {
            console.error("Error creating patient:", error);
          });
    
      });}).finally(()=>{

        const newPatientDB = [...patientsDB].push(patient);
        console.log(newPatientDB);
        setPatientsDB(newPatientDB);
        setAddingPatient(false);
      })
  }
  return (
    <>
      <button
        onClick={() => {
          setAddingPatient(false);
        }}
      >
        ❌
      </button>
      <form onSubmit={handleSubmit}>
        <h2>Patient Information</h2>
        <label>
          Name:
          <input required type="text" name="name" ref={nameRef} />
        </label>
        <label>
          ID:
          <input required type="text" name="id" ref={idRef} />
        </label>
        <label>
          city:
          <input required type="text" name="city" ref={cityRef} />
        </label>
        <label>
          street:
          <input required type="text" name="street" ref={streetRef} />
        </label>
        <label>
          building:
          <input required type="number" name="building" ref={houseNumberRef} />
        </label>
        <label>
          Birth Date:
          <input required type="date" name="birthDate" ref={birthDateRef} />
        </label>
        <label>
          Telephone:
          <input required type="text" name="telephone" ref={telephoneRef} />
        </label>
        <label>
          Phone:
          <input required type="text" name="phone" ref={phoneRef} />
        </label>

        <h2>Corona Information</h2>
        <label>
          Positive Result Receiving Date:
          <input
            required
            type="date"
            name="positiveResultReceivingDate"
            ref={positiveResultReceivingDateRef}
          />
        </label>
        <label>
          Corona Recovery Date:
          <input
            required
            type="date"
            name="coronaRecoveryDate"
            ref={coronaRecoveryDateRef}
          />
        </label>

        <p>first vaccine:</p>
        <label>
          Receiving Date:
          <input
            type="date"
            name="vaccineReceivingDate"
            ref={vaccineReceivingDateRef[0]}
          />
        </label>
        <label>
          Manufacturer:
          <input type="text" name="manufacturer" ref={manufacturerRef[0]} />
        </label>
        <p>second vaccine:</p>
        <label>
          Receiving Date:
          <input
            type="date"
            name="vaccineReceivingDate"
            ref={vaccineReceivingDateRef[1]}
          />
        </label>
        <label>
          Manufacturer:
          <input type="text" name="manufacturer" ref={manufacturerRef[1]} />
        </label>
        <p>third vaccine:</p>
        <label>
          Receiving Date:
          <input
            type="date"
            name="vaccineReceivingDate"
            ref={vaccineReceivingDateRef[2]}
          />
        </label>
        <label>
          Manufacturer:
          <input type="text" name="manufacturer" ref={manufacturerRef[2]} />
        </label>
        <p>fourth vaccine:</p>
        <label>
          Receiving Date:
          <input
            type="date"
            name="vaccineReceivingDate"
            ref={vaccineReceivingDateRef[3]}
          />
        </label>
        <label>
          Manufacturer:
          <input type="text" name="manufacturer" ref={manufacturerRef[3]} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
export default AddingPatient;

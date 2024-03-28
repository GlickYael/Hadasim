/* eslint-disable react/prop-types */
import { useRef } from "react";

function EditPatient({
  setEdit,
  patient,
  coronaVaccinations,
  patientsDB,
  setPatientsDB
}) {
  const nameRef = useRef();
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
    const updatePatient = {
      name: nameRef.current.value,
      id: patient.id,
      city: cityRef.current.value,
      street: streetRef.current.value,
      houseNumber: houseNumberRef.current.value,
      birthDate: birthDateRef.current.value,
      telephone: telephoneRef.current.value,
      phone: phoneRef.current.value,
      positiveResultReceivingDate: positiveResultReceivingDateRef.current.value,
      coronaRecoveryDate: coronaRecoveryDateRef.current.value,
    };

    for (let i = 0; i < vaccineReceivingDateRef[i].current.value.length; i++) {
      let id = null;
      let newVaccine = false;
      coronaVaccinations.find((v) => {
        if (v.id === vaccineReceivingDateRef[i].current.value.id) {
          id = v.id;
          return;
        }
      });
      if (id === null) {
        newVaccine = true;
      }
      let vaccination = {
        patientId: patient.id,
        vaccineReceivingDate: vaccineReceivingDateRef.current.value,
        manufacturer: manufacturerRef.current.value,
      };
      if (newVaccine) {
        //post
        fetch("http://localhost:3000/vaccinations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vaccination),
        })
          .then((data) => {
            if (!data.ok) {
              throw new Error("can't create the vaccinations");
            }
            return data.json();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //put
        fetch(`http://localhost:3000/vaccinations/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vaccination),
        })
          .then((response) => response.json())
          // .then(vaccination => {

          // })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }

    fetch(`http://localhost:3000/patients/${patient.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePatient),
    })
      .then((response) => response.json())
      .then((updatePatient) => {
        //לעדכן את החיסונים
        //לעדכן את המסך
        const newPatientsDB = patientsDB.map((p) => {
          if (p.id === updatePatient.id) {
            return { updatePatient };
          }
          return p;
        });
        setPatientsDB(newPatientsDB);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <>
      <button
        onClick={() => {
          setEdit(false);
        }}
      >
        ❌
      </button>
      <form onSubmit={handleSubmit}>
        <h2>Patient Information</h2>
        <label>
          Name:
          <input type="text" name="name" required ref={nameRef} />
        </label>
        <label>
          City:
          <input type="text" name="city" required ref={cityRef} />
        </label>
        <label>
          Street:
          <input type="text" name="street" required ref={streetRef} />
        </label>
        <label>
          Building:
          <input
            type="number"
            name="houseNumber"
            required
            ref={houseNumberRef}
          />
        </label>
        <label>
          Birth Date:
          <input type="date" name="birthDate" required ref={birthDateRef} />
        </label>
        <label>
          Telephone:
          <input type="text" name="telephone" required ref={telephoneRef} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" required ref={phoneRef} />
        </label>
        <h2>Corona Information</h2>
        <label>
          Positive Result Receiving Date:
          <input
            type="date"
            name="positiveResultReceivingDate"
            required
            ref={positiveResultReceivingDateRef}
          />
        </label>
        <label>
          Corona Recovery Date:
          <input type="date" name="coronaRecoveryDate" required />
        </label>
        <ol>
          <p>first vaccine:</p>
          <label>
            Vaccine Receiving Date:
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
            Vaccine Receiving Date:
            <input
              type="date"
              name="vaccineReceivingDate"
              ref={vaccineReceivingDateRef[1]}
            />
          </label>
          <label>
            Manufacturer:{" "}
            <input type="text" name="manufacturer" ref={manufacturerRef[1]} />
          </label>
          <p>third vaccine:</p>
          <label>
            Vaccine Receiving Date:
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
            Vaccine Receiving Date:
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
        </ol>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
export default EditPatient;

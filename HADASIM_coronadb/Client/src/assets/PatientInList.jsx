/* eslint-disable react/prop-types */
function PatientInList({patient}){
    return(
        <>
        <p>name:{patient.name}, ID:{patient.id}</p>
        </>
        
    )
}
export default PatientInList;
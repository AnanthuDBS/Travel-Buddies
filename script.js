const { response } = require("express");

//funct to fetch all trips
async function getTrips() {
    const res = await fetch("http://localhost:5000/api/trips");
    const trips=await response.json();
    const tripsContainer=document.getElementById("tripsContainer");
    tripsContainer.innerHTML=""; //this is to clear any existing content in the container to refresh the list

    //loop through each trip in the trips array
    trips.forEach(trip => {
        const tripDiv=document.createElement("div"); //create a new div for each trip
        tripDiv.classList.add("trip"); //for styling

        //populate the div with trip details
        tripDiv.innerHTML= 
            <h3>${trip.destination} (${trip.modeOfTravel})</h3>
            <p>Time: ${new Date(trip.travelTime).toLocaleString()}</p>
            <p>Participants: ${trip.participants.length} / ${trip.participantLimit}</p>
        ;
    tripsContainer.appendChild(tripDiv); 
    });
}
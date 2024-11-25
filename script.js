//funct to fetch all trips
async function getTrips() {
    const response = await fetch("http://localhost:5000/api/trips");
    const trips=await response.json();
    const tripsContainer=document.getElementById("tripsContainer");
    tripsContainer.innerHTML=""; //this is to clear any existing content in the container to refresh the list

    //loop through each trip in the trips array
    trips.forEach(trip => {
        const tripDiv=document.createElement("div"); //create a new div for each trip
        tripDiv.classList.add("trip"); //for styling

        //populate the div with trip details
        tripDiv.innerHTML= 
            `<h3>${trip.destination} (${trip.modeOfTravel})</h3>
            <p>Time: ${new Date(trip.travelTime).toLocaleString()}</p>
            <p>Participants: ${trip.participants.length} / ${trip.participantLimit}</p>
        `;
    tripsContainer.appendChild(tripDiv); 
    });
}

//new trip creation
document.getElementById("tripForm").addEventListener("submit", async(e)=>{
    e.preventDefault(); //to not reload the page

    const trip={
        destination:document.getElementById("destination").value,
        modeOfTravel:document.getElementById("modeOfTravel").value,
        travelTime:new Date(document.getElementById("travelTime").value),
        participantLimit:document.getElementById("participantLimit").value,
    };

    //POST req to server to create a new trip in the DB
    const response=await fetch("http://localhost:5000/api/trips",{
        method:"POST", 
        headers:{
            "Content-Type":"application/json", //json data is being sent
        },
        body:json.stringify(trip), //convert the trip object to json and send it in the req body
    });

    //checking if the req is success
    if(response.ok){
        alert("Successfully created the Trip!");
        getTrips(); //the trip list is refreshed aftrer a new trip is created
    } else{
        alert("Trip creation failed!");
    }
});

window.onload=getTrips; //call the getTrips funct to load and disp trips when page is loaded

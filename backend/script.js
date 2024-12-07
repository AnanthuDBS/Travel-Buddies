const { response } = require("express");

// Function to fetch all trips
async function getTrips() {
    const response = await fetch("http://localhost:5000/api/trips");
    const trips = await response.json();
    const tripsContainer = document.getElementById("tripsContainer");
    
    if (tripsContainer) { // Ensure the container exists before modifying
        tripsContainer.innerHTML = ""; // Clear any existing content
    
        trips.forEach((trip) => {
            const tripDiv = document.createElement("div");
            tripDiv.classList.add("trip");
            tripDiv.setAttribute("data-id", trip._id); //to add a data-id for identifying the trip

            tripDiv.innerHTML = `
                <h3>${trip.destination} (${trip.modeOfTravel})</h3>
                <p>Time: ${new Date(trip.travelTime).toLocaleString()}</p>
                <p>Participants: ${trip.participants.length} / ${trip.participantLimit}</p>
                <button onclick="joinTrip('${trip._id}')">Join Trip</button>
                <button onclick="editTrip('${trip._id}')">Edit Trip</button>
                <button onclick="deleteTrip('${trip._id}')">Delete Trip</button>
            `;

            tripsContainer.appendChild(tripDiv);
        });
    }
}

//creating a function to navigate to Available Trips page
function navigateToTrips() {
    window.location.href="available-trips.html";
}

//function to go back to Home page
function goBack() {
    window.location.href = "index.html";
}

// Event listener for creating a new trip
async function handleNewTripForm(e) { // Corrected handler to match the reference in initializePage
    e.preventDefault();

    const trip = {
        destination: document.getElementById("destination").value,
        modeOfTravel: document.getElementById("modeOfTravel").value,
        travelTime: new Date(document.getElementById("travelTime").value),
        participantLimit: document.getElementById("participantLimit").value,
    };

    const response = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip),
    });

    if (response.ok) {
        alert("Successfully created the Trip!");
        document.getElementById("tripForm").reset(); // Clear the form
        if (window.location.href.includes("index.html")) {
            getTrips(); // Refresh the trip list in the home page if wanted
        }
    } else {
        alert("Trip creation failed!");
    }
}

//creating event listeners for the pages
function initializePage() {
    const path=window.location.pathname;

    if(path.includes("index.html")){
        const tripForm=document.getElementById("tripForm");
        if(tripForm){
            tripForm.addEventListener("submit", handleNewTripForm);
        }
    } else if(path.includes("available-trips.html")){
        getTrips(); //load the trips only for the "Available Trips" page
    }
}
//to init the page logic when the DOM is fully loaded
window.onload=initializePage;

// Function to join a trip
async function joinTrip(tripId) {
    const response = await fetch(`http://localhost:5000/api/trips/join/${tripId}`, {
        method: "PUT",
    });

    if (response.ok) {
        alert("You have joined the trip!");
        getTrips(); // Refresh the trip list
    } else {
        alert("Failed to join the trip.");
    }
}

// Function to edit a trip
async function editTrip(tripId) {
    const tripDiv = document.querySelector(`[data-id="${tripId}"]`); //to ID the trip element by its data-ID
    const response = await fetch(`http://localhost:5000/api/trips/${tripId}`);
    const trip = await response.json();

    //to replace the details with an editable form
    tripDiv.innerHTML = `
        <form id="editForm-${tripId}" class="edit-form">
            <label>
                Destination:
                <input type="text" id="edit-destination-${tripId}" value="${trip.destination}" required>
            </label>
            <label>
                Mode of Travel:
                <input type="text" id="edit-modeOfTravel-${tripId}" value="${trip.modeOfTravel}" required>
            </label>
            <label>
                Travel Time:
                <input type="datetime-local" id="edit-travelTime-${tripId}" value="${new Date(trip.travelTime).toISOString().slice(0, -1)}" required>
            </label>
            <label>
                Participant Limit:
                <input type="number" id="edit-participantLimit-${tripId}" value="${trip.participantLimit}" required>
            </label>
            <button type="submit">Save Changes</button>
            <button type="button" onclick="cancelEdit('${tripId}')">Cancel</button>
        </form>
    `;

    // now, to add an event listener for saving changes
    document.getElementById(`editForm-${tripId}`).addEventListener("submit", async (e) => {
        e.preventDefault();

        // Collect updated values
        const updatedTrip = {
            destination: document.getElementById(`edit-destination-${tripId}`).value,
            modeOfTravel: document.getElementById(`edit-modeOfTravel-${tripId}`).value,
            travelTime: new Date(document.getElementById(`edit-travelTime-${tripId}`).value),
            participantLimit: parseInt(document.getElementById(`edit-participantLimit-${tripId}`).value, 10),
        };

        // this is to send the updated data to the server
        const updateResponse = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTrip),
        });

        if (updateResponse.ok) {
            alert("Trip updated successfully!");
            getTrips(); // Refresh the trip list
        } else {
            alert("Failed to update the trip.");
        }
    });
}

// Function to cancel editing and restore original trip details
function cancelEdit(tripId) {
    getTrips(); // Refresh the trip list to restore the original state
}


// Function to delete a trip
async function deleteTrip(tripId) {
    const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        alert("Trip deleted successfully!");
        getTrips(); // Refresh the trip list
    } else {
        alert("Failed to delete the trip.");
    }
}

// Load trips when the page loads
//window.onload = getTrips;

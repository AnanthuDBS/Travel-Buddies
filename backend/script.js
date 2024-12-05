// Function to fetch all trips
async function getTrips() {
    const response = await fetch("http://localhost:5000/api/trips");
    const trips = await response.json();
    const tripsContainer = document.getElementById("tripsContainer");
    tripsContainer.innerHTML = ""; // Clear any existing content

    trips.forEach((trip) => {
        const tripDiv = document.createElement("div");
        tripDiv.classList.add("trip");

        // Check if the current user is the creator of the trip for edit and delete buttons
        const isCreator = trip.creator === "currentUser"; // Update this based on how you identify the creator

        tripDiv.innerHTML = `
            <h3>${trip.destination} (${trip.modeOfTravel})</h3>
            <p>Time: ${new Date(trip.travelTime).toLocaleString()}</p>
            <p>Participants: ${trip.participants.length} / ${trip.participantLimit}</p>
            <button onclick="joinTrip('${trip._id}')">Join Trip</button>
            ${isCreator ? `
                <button onclick="editTrip('${trip._id}')">Edit Trip</button>
                <button onclick="deleteTrip('${trip._id}')">Delete Trip</button>
            ` : ""}
        `;

        tripsContainer.appendChild(tripDiv);
    });
}

// Function to edit a trip
async function editTrip(tripId) {
    const response = await fetch(`http://localhost:5000/api/trips/${tripId}`);
    const trip = await response.json();

    // Pre-fill the form with the trip's data
    document.getElementById("destination").value = trip.destination;
    document.getElementById("modeOfTravel").value = trip.modeOfTravel;
    document.getElementById("travelTime").value = new Date(trip.travelTime).toISOString().slice(0, 16);
    document.getElementById("participantLimit").value = trip.participantLimit;

    // Update the form's submit handler to handle the edit
    document.getElementById("tripForm").onsubmit = async (e) => {
        e.preventDefault();

        const updatedTrip = {
            destination: document.getElementById("destination").value,
            modeOfTravel: document.getElementById("modeOfTravel").value,
            travelTime: new Date(document.getElementById("travelTime").value),
            participantLimit: document.getElementById("participantLimit").value,
        };

        const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTrip),
        });

        if (response.ok) {
            alert("Trip updated successfully!");
            getTrips(); // Refresh the trip list
        } else {
            alert("Failed to update the trip!");
        }
    };
}

// Function to join a trip
async function joinTrip(tripId) {
    const response = await fetch(`http://localhost:5000/api/trips/join/${tripId}`, {
        method: "PATCH",
    });
    if (response.ok) {
        alert("Joined the trip!");
        getTrips(); // Refresh the trip list
    } else {
        alert("Failed to join the trip!");
    }
}

// Function to delete a trip
async function deleteTrip(tripId) {
    const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        alert("Trip deleted!");
        getTrips(); // Refresh the trip list
    } else {
        alert("Failed to delete the trip!");
    }
}

// Event listener for creating a new trip
document.getElementById("tripForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const trip = {
        destination: document.getElementById("destination").value,
        modeOfTravel: document.getElementById("modeOfTravel").value,
        travelTime: new Date(document.getElementById("travelTime").value),
        participantLimit: document.getElementById("participantLimit").value,
        creator: "currentUser", // Add the current user's ID or username
    };

    const response = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip),
    });

    if (response.ok) {
        alert("Successfully created the Trip!");
        getTrips(); // Refresh the trip list
    } else {
        alert("Trip creation failed!");
    }
});

// Load trips when the page loads
window.onload = getTrips;

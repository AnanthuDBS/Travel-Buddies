// Function to fetch all trips
async function getTrips() {
    const response = await fetch("http://localhost:5000/api/trips");
    const trips = await response.json();
    const tripsContainer = document.getElementById("tripsContainer");
    tripsContainer.innerHTML = ""; // Clear any existing content

    trips.forEach((trip) => {
        const tripDiv = document.createElement("div");
        tripDiv.classList.add("trip");

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

//creating a function to navigate to Available Trips page
function navigateToTrips() {
    window.location.href="available-trips.html";
}

//function to go back to Home page
function goBack() {
    window.location.href = "index.html";
}

// Event listener for creating a new trip
document.getElementById("tripForm").addEventListener("submit", async (e) => {
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
        getTrips(); // Refresh the trip list
    } else {
        alert("Trip creation failed!");
    }
});

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
    const trip = prompt("Enter new destination for the trip:"); // Add more fields as needed
    if (trip) {
        const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ destination: trip }), // Send updated data
        });

        if (response.ok) {
            alert("Trip updated successfully!");
            getTrips(); // Refresh the trip list
        } else {
            alert("Failed to update the trip.");
        }
    }
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

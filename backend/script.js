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
        `;

        tripsContainer.appendChild(tripDiv);
    });
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

    console.log(trip);

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

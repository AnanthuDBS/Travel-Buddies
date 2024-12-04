// Fetch all trips
async function getTrips() {
    try {
        const response = await fetch("http://localhost:5000/api/trips");
        if (!response.ok) throw new Error(`Failed to fetch trips: ${response.statusText}`);
        const trips = await response.json();
        const tripsContainer = document.getElementById("tripsContainer");
        tripsContainer.innerHTML = ""; // Clear existing content

        trips.forEach(trip => {
            const tripDiv = document.createElement("div");
            tripDiv.classList.add("trip");

            tripDiv.innerHTML = `
                <h3>${trip.destination} (${trip.modeOfTravel})</h3>
                <p>Time: ${new Date(trip.travelTime).toLocaleString()}</p>
                <p>Participants: ${trip.participants.length} / ${trip.participantLimit}</p>
            `;
            tripsContainer.appendChild(tripDiv);
        });
    } catch (err) {
        console.error("Error fetching trips:", err.message);
        alert("Unable to load trips. Please check your server connection.");
    }
}

// Handle trip form submission
document.getElementById("tripForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted successfully");
    const trip = {
        destination: document.getElementById("destination").value,
        modeOfTravel: document.getElementById("modeOfTravel").value,
        travelTime: new Date(document.getElementById("travelTime").value).toISOString(),
        participantLimit: document.getElementById("participantLimit").value,
    };

    try {
        const response = await fetch("http://localhost:5000/api/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(trip),
        });

        if (response.ok) {
            alert("Successfully created the Trip!");
            getTrips(); // Refresh the trip list
        } else {
            const errorData = await response.json();
            alert(`Trip creation failed: ${errorData.error}`);
        }
    } catch (err) {
        console.error("Error creating trip:", err.message);
        alert("Failed to create trip. Please try again.");
    }
});

// Load trips on page load
window.onload = getTrips;

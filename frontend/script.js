// Function to fetch all trips
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
const API_BASE_URL = "http://localhost:5000"; //I can replace this with my backend's deployed URL
async function getTrips() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/trips`);
        const trips = await response.json();
        console.log("Fetched Trips: ", trips); //debug line
        const tripsContainer = document.getElementById("tripsContainer");

        if (tripsContainer) { // Ensure the container exists before modifying
            tripsContainer.innerHTML = ""; // Clear any existing content

            trips.forEach((trip) => {
                const tripDiv = document.createElement("div");
                tripDiv.classList.add("trip");
                tripDiv.setAttribute("data-id", trip._id); // To add a data-id for identifying the trip

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
    } catch(error) {
        console.error("Failed to fetch trips: ", error);
    }
}

// Creating a function to navigate to the Available Trips page
// Reference: (https://developer.mozilla.org/en-US/docs/Web/API/Window/location)

function navigateToTrips() {
    window.location.href = "available-trips.html";
}

// Function to go back to the Home page
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
            //getTrips(); // Refresh the trip list on the home page
        }
    } else {
        alert("Trip creation failed!");
    }
}

// Creating event listeners for the pages
function initializePage() {
    const path = window.location.pathname;

    if (path.includes("index.html")) {
        const tripForm = document.getElementById("tripForm");
        
        // Formatting dates using toISOString and slice methods
// Reference: Stack Overflow discussion on date handling
// URL: https://stackoverflow.com/questions/12345/convert-date-to-iso-string

        if (tripForm) {
            document.getElementById('travelTime').setAttribute('min', new Date().toISOString().slice(0, 16));
            tripForm.addEventListener("submit", handleNewTripForm);
        }
    } else if (path.includes("available-trips.html")) {
        console.log("Available Trips Page Detected"); //debug line
        getTrips(); // Load the trips only for the "Available Trips" page
    }
}

// To initialize the page logic when the DOM is fully loaded
window.onload = initializePage; //(https://developer.mozilla.org/en-US/docs/Web/API/Window/onload)


// Function to join a trip with user details
async function joinTrip(tripId) {
    // Prompt user for details
    const name = prompt("Enter your name:");
    const age = prompt("Enter your age (number only):");
    const email = prompt("Enter your email (cannot use an ID which has already been used for joining this trip):");
    const phoneNumber = prompt("Enter your phone number (cannot use a number which has already been used for joining this trip):");

    // Validate inputs
    if (!name || !age || !email || !phoneNumber) {
        alert("All fields are required to join the trip.");
        return;
    }

    const userDetails = {
        name,
        age: parseInt(age, 10), //(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)
        email,
        phoneNumber,
    };

    try {
        const response = await fetch(`http://localhost:5000/api/trips/join/${tripId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDetails),
        });

        if (response.ok) {
            alert("You have joined the trip!");
            getTrips(); // Refresh the trip list
        } else {
            const error = await response.json();
            alert(`Failed to join the trip: ${error.message}`);
        }
    } catch (error) {
        console.error("Error joining the trip:", error);
        alert("An error occurred while joining the trip.");
    }
}



// Function to edit a trip
async function editTrip(tripId) {
    console.log("editTrip called for tripId:", tripId);
    try {
        // Fetch the trip data
        const response = await fetch(`http://localhost:5000/api/trips/${tripId}`);

        if (!response.ok) {
            alert("Failed to fetch trip data.");
            return;
        }

        const trip = await response.json();
        console.log('Trip data fetched for editing:', trip);

        const tripDiv = document.querySelector(`[data-id="${tripId}"]`);
        if (!tripDiv) {
            alert("Trip not found!");
            return;
        }

        // Replace the details with an editable form
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
                    <input type="datetime-local" id="edit-travelTime-${tripId}" value="${new Date(trip.travelTime).toISOString().slice(0, 16)}" required>
                </label>
                <label>
                    Participant Limit:
                    <input type="number" id="edit-participantLimit-${tripId}" value="${trip.participantLimit}" required>
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onclick="cancelEdit('${tripId}')">Cancel</button>
            </form>
        `;

        // Add an event listener for saving changes
        document.getElementById(`editForm-${tripId}`).addEventListener("submit", async (e) => {
            e.preventDefault();

            // Collect updated values
            const updatedTrip = {
                destination: document.getElementById(`edit-destination-${tripId}`).value,
                modeOfTravel: document.getElementById(`edit-modeOfTravel-${tripId}`).value,
                travelTime: new Date(document.getElementById(`edit-travelTime-${tripId}`).value),
                participantLimit: parseInt(document.getElementById(`edit-participantLimit-${tripId}`).value, 10),
            };

            // Send the updated data to the server
            const updateResponse = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTrip),
            });

            if (updateResponse.ok) {
                alert("Trip updated successfully!");
                getTrips(); // Refresh the trip list to reflect changes
            } else {
                alert("Failed to update the trip.");
            }
        });
    } catch (err) {
        console.error("Error fetching trip data for editing:", err);
        alert("An error occurred while fetching the trip data.");
    }
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

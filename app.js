import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';


// Firebase configuration settings
const appSettings = {
    databaseUrl: "https://controlespled-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: 'controlespled'
};

// Initialize Firebase app and database
const app = initializeApp(appSettings);
const database = getDatabase(app);
const ledValueRef = ref(database, "ledValue"); // Reference to the 'ledValue' node in Firebase

// DOM elements
const toggleBtn = document.getElementById("toggleBtn");
const bulb = document.getElementById("bulb");

// Initialize LED state
let ledState = false; // Default state

// Listen for changes in the LED state from Firebase
onValue(ledValueRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (data === true) {
        // Update UI for LED ON state
        toggleBtn.classList.remove("turn-off");
        toggleBtn.classList.add("turn-on");
        toggleBtn.innerText = 'Turn Off';
        bulb.style.color = 'yellow';
        ledState = true;
    } else if (data === false) {
        // Update UI for LED OFF state
        toggleBtn.classList.remove("turn-on");
        toggleBtn.classList.add("turn-off");
        toggleBtn.innerText = 'Turn On';
        bulb.style.color = 'rgb(152, 152, 0)';
        ledState = false;
    }
});

// Toggle LED state in Firebase when button is clicked
toggleBtn.addEventListener("click", () => {
    ledState = !ledState; // Toggle the state
    set(ledValueRef, ledState); // Update Firebase with the new state
});

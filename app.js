
// Register the Service Worker (keep this at the top)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registered!'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesContainer = document.getElementById('notes-container');

// New view control buttons
const singleColumnBtn = document.getElementById('single-column-btn');
const multiColumnBtn = document.getElementById('multi-column-btn');

// New background selector
const backgroundSelect = document.getElementById('background-select');

// --- Functions to manage the background ---
function changeBackground(imageValue) {
    // Remove any existing background classes
    document.body.classList.remove('bg1', 'bg2', 'bg3');
    if (imageValue !== 'none') {
        document.body.classList.add(imageValue);
    }
    // Save the preference
    localStorage.setItem('bgPreference', imageValue);
}

// Check for and apply the user's saved background on load
function applySavedBackground() {
    const savedBg = localStorage.getItem('bgPreference') || 'none';
    backgroundSelect.value = savedBg; // Set the dropdown to the saved value
    changeBackground(savedBg);
}

// --- Event Listeners ---
singleColumnBtn.addEventListener('click', () => switchView('single'));
multiColumnBtn.addEventListener('click', () => switchView('multi'));
backgroundSelect.addEventListener('change', (e) => {
    changeBackground(e.target.value);
});


// ... [All other existing functions like loadNotes, handleEditNote, etc., go here unchanged] ...


// --- Initial load (updated to include the new background function) ---
applySavedView();
applySavedBackground(); // Apply the saved background first
loadNotes();
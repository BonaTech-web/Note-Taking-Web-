// Select elements
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

// Load saved notes from localStorage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesList.appendChild(noteElement);
    });
}

// Create a note element
function createNoteElement(noteText) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    // Add the note text to the element
    noteElement.textContent = noteText;

    // Add a delete button to the note
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        notesList.removeChild(noteElement);
        removeNoteFromStorage(noteText);
    };
    noteElement.appendChild(deleteBtn);

    return noteElement;
}

// Function to add a note
function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please write something before adding a note!");
        return;
    }

    // Create and display the note
    const noteElement = createNoteElement(noteText);
    notesList.appendChild(noteElement);

    // Save the note to localStorage
    saveNoteToStorage(noteText);

    // Clear the input field
    noteInput.value = "";
}

// Save the note to localStorage
function saveNoteToStorage(noteText) {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}

// Remove the note from localStorage
function removeNoteFromStorage(noteText) {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes = savedNotes.filter(note => note !== noteText);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}

// Add event listener to the "Add Note" button
addNoteBtn.addEventListener("click", addNote);

// Allow pressing "Enter" to add a note
noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});

// Load notes when the page is loaded
loadNotes();
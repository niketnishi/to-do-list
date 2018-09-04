//let data = localStorage.getItem('listOfNotes') ? JSON.parse(localStorage.getItem('listOfNotes')) : [];
//
//localStorage.setItem('listOfNotes', JSON.stringify(data));
//var noteData = JSON.parse(localStorage.getItem('listOfNotes'));


// Creating localStorage which will not change on closing window
var noteData;
if (localStorage.getItem('listOfNotes')) {
    noteData = JSON.parse(localStorage.getItem('listOfNotes'));
} else {
    console.log('i am in else');
    noteData = [];
}

localStorage.setItem("listOfNotes", JSON.stringify(noteData));


document.addEventListener('DOMContentLoaded', function() {
    createAllNote();
    document.querySelector('#todo_input').onkeypress = function() {
        storeNote(event)
    }
    document.querySelector('#select_all').onclick = function() {
        selectAll()
    }
});

// Storing the notes to localStorage
function storeNote(eventObj) {
    if(eventObj.keyCode == 13) {
        var note = document.querySelector('#todo_input').value;
        if (note.length > 0) {
            let note = document.querySelector('#todo_input').value;
            createStructure(note);
            let arrayLen = noteData.length;
            noteData[arrayLen] = note;
            document.querySelector('#todo_input').value = "";
            localStorage.setItem("listOfNotes", JSON.stringify(noteData));
        } else {
            alert("Please, enter anything to remenber");
        }
    }
}
// Creating structure for the notes entered
function createStructure(note) {
    let newToDo = document.createElement("div");
    newToDo.innerHTML = '<button type="button" onclick="removeNote(this)"><i class="fa fa-close"></i></button>';
    let checkboxButton = document.createElement("input");
    checkboxButton.type = "checkbox";
    let inputData = document.createElement("span");
    inputData.textContent = note;
    checkboxButton.addEventListener('click', function() {              //adding event listener for checkbox
        scratchText(this)
    });
    newToDo.appendChild(checkboxButton);
    newToDo.appendChild(inputData);
//    newToDo.innerHTML = '<i class="fa fa-close"></i><input type="checkbox"><span>${`note`}</span>';
    document.querySelector('#todo_item').appendChild(newToDo);
}

// Invoking button action for marking all the checkbox true or false
function selectAll() {
    document.querySelectorAll('#todo_item input').forEach(item => {
        item.checked = true;
        item.parentElement.childNodes[2].style.textDecoration = "line-through";
    });
}

// Function to scratch the text based on checkbox
function scratchText(eleObj) {
    if(eleObj.checked) {
        eleObj.parentElement.childNodes[2].style.textDecoration = "line-through";
    }
    else {
        eleObj.parentElement.childNodes[2].style.textDecoration = "none";
    }
}

// Close button Action
function removeNote(item) {
    item.parentElement.parentElement.removeChild(item.parentElement);
    let itemIndex = noteData.indexOf(item.parentElement.childNodes[2].innerHTML);
    noteData.splice(itemIndex, 1);
    localStorage.setItem("listOfNotes", JSON.stringify(noteData));
}

// Function to create all the to_do items on loading the webpage
function createAllNote() {
    noteData.forEach(note =>{
            createStructure(note)
        });
}

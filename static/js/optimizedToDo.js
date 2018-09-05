// Creating localStorage which will not change on closing window
let data = localStorage.getItem('listOfNotes') ? JSON.parse(localStorage.getItem('listOfNotes')) : [];
localStorage.setItem('listOfNotes', JSON.stringify(data));

var noteData = JSON.parse(localStorage.getItem('listOfNotes'));
localStorage.setItem("listOfNotes", JSON.stringify(noteData));

// Creating an event on page loading
document.addEventListener('DOMContentLoaded', function() {
    createAllNote();
    document.querySelector('#todo_input').onkeypress = function() {
        storeNote(event);
    }
    document.querySelector('#select_all').onclick = function() {
        selectAll();
    }
});

// Storing the notes to localStorage
function storeNote(eventObj) {
    if(eventObj.keyCode == 13) {
        var inputText = document.querySelector('#todo_input').value;
        if (inputText.length > 0) {
            if (findDuplicate(inputText)) {
                let dataObj = {'text': inputText, 'is_done': false};
                noteData.push(dataObj);
                createAllNote();
                document.querySelector('#todo_input').value = "";
                localStorage.setItem("listOfNotes", JSON.stringify(noteData));
            } else {
                alert('This note has already been made!!!');
                document.querySelector('#todo_input').value = "";
            }
        } else {
            alert("Please, enter anything to remenber");
        }
    }
}

// Check for duplicate entry while recording notes
function findDuplicate(inputText) {
    let flag = 0;
    noteData.forEach(obj =>{
        if (obj.text == inputText) {
            flag = 1;
        }
    });
    if (flag == 1) {
        return false;
    } else {
        return true;
    }
}

// Function to create all the to_do items on loading the webpage
function createAllNote() {
    deleteAllNote();
    noteData.forEach(obj =>{
        createStructure(obj.text, obj.is_done);
        let textInputObj = document.querySelector('#todo_item').lastChild.childNodes[1];
        scratchText(textInputObj);
    });
}

// Deleting all the notes from local storage
function deleteAllNote() {
    let node = document.querySelector('#todo_item');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

// Creating structure for the notes entered
function createStructure(note, status) {
    let newToDo = document.createElement("div");
    newToDo.setAttribute('draggable', 'true');
    newToDo.addEventListener('dragstart', function(e) {
        startDrag(e, this);
    }, false);
    newToDo.addEventListener('dragenter', function(event) {event.preventDefault()}, false);
    newToDo.addEventListener('dragover', function(event) {event.preventDefault()}, false);
    newToDo.addEventListener('drop', function(e) {
        dropped(e, this);
    }, false);

    newToDo.innerHTML = '<button type="button" onclick="removeNote(this)"><i class="fa fa-close"></i></button>';

    let checkboxButton = document.createElement("input");
    checkboxButton.type = "checkbox";
    updateStatusOfCheckbox(checkboxButton, status);
    checkboxButton.addEventListener('click', function() {              //adding event listener for checkbox
        updateStatus(this);
    });
    newToDo.appendChild(checkboxButton);

    let inputData = document.createElement("span");
    inputData.textContent = note;
    newToDo.appendChild(inputData);

    document.querySelector('#todo_item').appendChild(newToDo);
}

// Upadate checkbox status while creation
function updateStatusOfCheckbox(obj, status) {
    if (status) {
        obj.checked = true;
    } else {
        obj.checked = false;
    }
}

// This gets triggered when click event occurs on checkbox
function updateStatus(spanObj) {
    let spanText = spanObj.parentElement.childNodes[2].innerHTML;
    noteData.forEach(obj =>{
        if (obj.text == spanText && spanObj.checked) {
            obj.is_done = true;
        }
        else if (obj.text == spanText && !spanObj.checked) {
            obj.is_done = false;
        }
    });
    localStorage.setItem("listOfNotes", JSON.stringify(noteData));
    scratchText(spanObj);
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

// Invoking button action for marking all the checkbox true or false
function selectAll() {
    if (checkCheckbox()) {
        noteData.forEach(obj =>{
            obj.is_done = true;
        });
    } else {
        noteData.forEach(obj =>{
            obj.is_done = false;
        });
    }
    localStorage.setItem("listOfNotes", JSON.stringify(noteData));
    createAllNote();
}

// Checking the status of each element in order to select and deselect all notes
function checkCheckbox(){
    let numUnChk = 0;
    noteData.forEach(obj =>{
        if (!obj.is_done) {
            numUnChk = numUnChk + 1;
        }
    });
    if (numUnChk > 0) {
        return true;
    } else {
        return false;
    }
}

// Close button Action
function removeNote(item) {
//    item.parentElement.parentElement.removeChild(item.parentElement);
    let itemText = item.parentElement.childNodes[2].innerHTML;
    let itemIndex;
    noteData.forEach(obj =>{
        if (itemText == obj.text) {
            itemIndex = noteData.indexOf(obj);
        }
    });
    noteData.splice(itemIndex, 1);
    localStorage.setItem("listOfNotes", JSON.stringify(noteData));
    createAllNote();
}

// Function for dragging divs
function startDrag(eventObj, elementObj) {
    let dragCode = elementObj.childNodes[2].innerHTML;
    eventObj.dataTransfer.setData('dragElement', dragCode);
}

// Function for dropping divs
function dropped(eventObj, elementObj) {
    let dropCode = elementObj.childNodes[2].innerHTML;
    let dragCode = eventObj.dataTransfer.getData('dragElement');
    let dropIndex;
    let dragIndex;
    noteData.forEach(obj =>{
        if (obj.text == dropCode) {
            dropIndex = noteData.indexOf(obj);
        }
        if (obj.text == dragCode) {
            dragIndex = noteData.indexOf(obj);
        }
    });
    let temp = noteData[dragIndex];
    noteData[dragIndex] = noteData[dropIndex];
    noteData[dropIndex] = temp;
    localStorage.setItem("listOfNotes", JSON.stringify(noteData));
    createAllNote();
}
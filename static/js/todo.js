//let data = localStorage.getItem('list_of_notes') ? JSON.parse(localStorage.getItem('list_of_notes')) : [];
//
//localStorage.setItem('list_of_notes', JSON.stringify(data));
//var note_data = JSON.parse(localStorage.getItem('list_of_notes'));


// Creating localStorage which will not change on closing window
var note_data;
if (localStorage.getItem('list_of_notes')) {
    note_data = JSON.parse(localStorage.getItem('list_of_notes'));
} else {
    console.log('i am in else');
    note_data = [];
}

localStorage.setItem("list_of_notes", JSON.stringify(note_data));


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
function storeNote(event_obj) {
    if(event_obj.keyCode == 13) {
        var note = document.querySelector('#todo_input').value;
        if (note.length > 0) {
            let note = document.querySelector('#todo_input').value;
            createStructure(note);
            let array_len = note_data.length;
            note_data[array_len] = note;
            document.querySelector('#todo_input').value = "";
            localStorage.setItem("list_of_notes", JSON.stringify(note_data));
        } else {
            alert("Please, enter anything to remenber");
        }
    }
}
// Creating structure for the notes entered
function createStructure(note) {
    let new_todo = document.createElement("div");
    new_todo.innerHTML = '<button type="button" onclick="removeNote(this)"><i class="fa fa-close"></i></button>';
    let checkbox_button = document.createElement("input");
    checkbox_button.type = "checkbox";
    let input_data = document.createElement("span");
    input_data.textContent = note;
    checkbox_button.addEventListener('click', function() {
        scratch_text(this)
    });
    new_todo.appendChild(checkbox_button);
    new_todo.appendChild(input_data);
//    new_todo.innerHTML = '<i class="fa fa-close"></i><input type="checkbox"><span>${`note`}</span>';
    document.querySelector('#todo_item').appendChild(new_todo);
}

// Invoking button action for marking all the checkbox true or false
function selectAll() {
    document.querySelectorAll('#todo_item input').forEach(item => {
        item.checked = true;
        item.parentElement.childNodes[2].style.textDecoration = "line-through";
    });
}

// Function to scratch the text based on checkbox
function scratch_text(ele_obj) {
    if(ele_obj.checked) {
        ele_obj.parentElement.childNodes[2].style.textDecoration = "line-through";
    }
    else {
        ele_obj.parentElement.childNodes[2].style.textDecoration = "none";
    }
}

// Close button Action
function removeNote(item) {
    item.parentElement.parentElement.removeChild(item.parentElement);
    let item_index = note_data.indexOf(item.parentElement.childNodes[2].innerHTML);
    note_data.splice(item_index, 1);
    localStorage.setItem("list_of_notes", JSON.stringify(note_data));
}

// Function to create all the to_do items on loading the webpage
function createAllNote() {
    note_data.forEach(note =>{
            createStructure(note)
        });
}
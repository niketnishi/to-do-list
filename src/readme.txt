javaScript Tutorial(ES6)

--> Selecting Elements
    -> document.getElementById('#id');
    -> document.getElementsByClassName('.class');
    -> document.getElementsByTagName('tagName');
    -> document.querySelector('h1')    --> In parameter pas the css selector as you used to select elements while styling.
    -> document.querySelectorAll('cssSelector');

--> Events in javascripts
    -> onkeypress
    -> onclick
    -> onmouseover
    -> onkeydown
    -> onkeyup
    -> onload
    -> onblur  -- for e.g. when an input field looses focus on clicking outside of the field
    -> onsubmit when submitting the form data

--> Event Listener
    -> document.addEventListener('DOMContentLoaded', function() {
          document.querySelector('button').onclick = count;       --> Note that count is a different function that is being invoked
          });

--> Dynamic alert message using 'back-ticks' around the string
    -> alert(`Counter is at ${counter}!`);

--> Note that querySelector selects only the first matched results from the DOM

--> Defining variables in ES6

    -> const    #used for defining constant variable in javascript which throw error if you try to reassign
    -> let      #scope is limited to the curly braces in which it is defined
    -> var      #scope of the variable is throughout the scope of the code

--> Getting the value from input field
    -> const name = document.querySelector('#name').value

--> Creating, Updating and removing elements and more

    -> document.createElement('elementName');
    -> document.querySelector('css_selector').innerHTML = "value";
    -> document.querySelector('css_selector').parentElement; //returns the parent element object
    -> document.querySelector('css_selector').removeChild(ele_object);
    -> document.querySelector('css_selector').lastChild;    //returns the last child of the current element
    -> document.querySelector('css_selector').childNodes[3];    //returns the third child element object
    -> document.querySelector('css_selector').hasChildNodes();
    -> document.querySelector('css_selector').setAttributes('id', 'value');
    -> document.querySelector('css_selector').getAttribute('attributeName');
    -> document.querySelector('css_selector').hasAttribute('attributeName');
    -> document.querySelector('css_selector').removeAttribute('attributeName');
    -> parentElementObject.appendChild(childElementObject);     // Appends the child object to end of the parent container.

--> Creating constant Local Storage

    ->  var noteData;
        if (localStorage.getItem('listOfNotes')) {
            noteData = JSON.parse(localStorage.getItem('listOfNotes'));
        } else {
            noteData = [];
        }
        localStorage.setItem("listOfNotes", JSON.stringify(noteData));

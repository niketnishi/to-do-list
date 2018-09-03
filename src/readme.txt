javaScript Tutorial(ES6)

document.querySelector('h1')    --> In parameter pas the css selector as you used to select elements while styling.

let variable_name       --> New way of defining variables in javascript

events in javascripts

--> onclick
--> onmouseover
--> onkeydown
--> onkeyup
--> onload
--> onblur  -- for e.g. when an input field looses focus on clicking outside of the field
--> onsubmit when submitting the form data

--> Dynamic alert message using 'back-ticks' around the string

alert(`Counter is at ${counter}!`);

--> Note that querySelector selects only the first matched results from the DOM

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').onclick = count;       --> Note that count is a different function that is being invoked
    });


--> Defining variables in ES6

-> const    #used for defining constant variable in javascript which throw error if you try to reassign
-> let      #scope is limited to the curly braces in which it is defined
-> var      #scope of the variable is throughout the scope of the code

--> Getting the value from input field
    const name = document.querySelector(#name).value

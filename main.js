
/*
 * HELPER FUNCTIONS
 */


// Generates a random integer up to but not including max
// max will be the length of the array of lines
// Arrays are 0 indexed, so the max value will be length - 1
// Math.random() returns a floating point number from 0 to 1
function randInt(max) {
    return Math.floor(Math.random() * max);
}

// Removes empty entries (blank lines) and trims whitespace
function sanitizeSplit(arr) {
    let result = [];

    arr.forEach( elem => {
        // trim leading and trailing whitespace
        elem = elem.trim();

        // just to be sure we don't get a blank or newline only entry
        // we should make sure that it has a value and that it is not a newline
        if (elem && elem != '\n') {
            result.push(elem);
        }
    });

    return result;
}

// return the sanitized content of the HTML element with the id virgil
function virgil() {
    const virgilText = document.getElementById('virgil').value;

    console.log(virgilText);

    return sanitizeSplit(virgilText.split('\n'));
}


/*
 * DO THE STUFF
 */

window.onload = function() {
    let v = '', numLines = 8, maxlines = 0;

    // first run UI setup

    // create a handle to the numLines input object in the HTML
    const numLinesInput = document.getElementById('numLines');


    // Setup an input listener on the input text
    const textInput = document.getElementById('virgil');

    textInput.addEventListener('change', event => {
        v = virgil();
        numLines = v.length;

        // UI input preparation

        // set the maximum value for the number input
        numLinesInput.max = v.length;
        // also set the default value to max
        numLinesInput.value = v.length;
        console.log(numLines, numLinesInput.max, numLinesInput.value);

    });

    // This is a local function that actually does the work
    // it is local to to window.onload because we have to wait for the
    // whole window to be ready to grab the virgil text
    // Also, this function needs access to the v and numLines values
    // which it would not have if this function were outside this scope
    function randomLines() {
        // stores the random ints
        let indices = [];
        // stores the lines
        let result = [];
        
        // generate unique indices
        for (let i = 0; i < numLines; i++) {
            let trying = true

            // this will keep trying until it gets a random int that does not
            // already exist in the array
            // If you were to run this with numLines = v.length, this may not
            // be the most efficient way to achieve this
            // Another way to do it might be to use array.pop() to remove the index
            // from the array, then update numLines each time a selection is made
            while (trying) {
                let r = randInt(v.length);

                if (indices.indexOf(r) < 0) {
                    indices.push(r);
                    trying = false;
                }
            }
        }
        
        // Push the lines' contents to the result array
        indices.forEach( elem => {
            result.push(v[elem]);
        });

        // return the result joined together with newlines
        return result.join('\n');
    }

    // Event Listeners
    // Wait for inputs from the HTML page: the number of lines and the run button

    numLinesInput.addEventListener('change', event => {
        numLines = event.target.value;
    });

    const runButton = document.getElementById('run');

    runButton.addEventListener('click', event => {
        document.getElementById('output').innerText = randomLines();
    });
}
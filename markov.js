
/* Generate a random paragraph of text from a Markov Random Chain.

   @param {Object} table - associative array mapping prefixes => list of words.
   @param {int} min - minimum number of words in the paragraph
   @param {int} max - minimum number of words in the paragraph
*/
function generateRandomParagraph(table, min, max)
{
   var textSize = randomIntFromInterval(min, max);
   var text = generateText(table, textSize);
   text = prettifyText(text);
   return text;
}


/* Generate text from a Markov Random Chain

   @param {Object} table - associative array mapping prefixes => list of words.
   @param {int} textSize - number of words to include in the generated text.
*/
function generateText(table, textSize)
{
    var key = randomKey(table);
    var text = key.split(" ");
    var prefixSize = text.length;

    for (var i=0; i < textSize-prefixSize; i++)
    {
        word = randomArrayElement(table[key])
        text.push(word);
        key = text.slice(text.length-prefixSize, text.length).join(" ");
    }

    return text.join(" ");
}


/* Build a table of prefix => words.

   This produces a table with n-gram prefixes as keys and an array of possible
   words that follow the prefix as a value. A word may be included in the array
   multiple times. The more times it's included, the more common it is that it
   follows this prefix.

   @param {Object} words - array of strings to generate the table from.
   @param {int} prefixSize - number words to include in the prefix.
*/
function buildTable(words, prefixSize)
{
    var table = {};
    var nWords = words.length;

    //make keys in table
    for (var i=prefixSize-1; i < nWords; i++)
    {
        var key = words.slice(i-prefixSize, i).join(" ");
        table[key] = new Array();
    }

    //make counts for each key
    for (var i=prefixSize; i < nWords; i++)
    {
        var key = words.slice(i-prefixSize, i).join(" ");
        var word = words[i];
        table[key].push(word);
    }

    return table;
}

/* Pick a random key from an array.

   @param {Object} choices - array of elements to choose from.
*/
function randomArrayElement(choices)
{
    return choices[Math.floor(Math.random() * choices.length)];
}

/* Pick a random key from an associative array.

   @param {Object} object - object with properties to choose from.
*/
function randomKey(object) {
    var keys = Object.keys(object);
    return keys[Math.floor(keys.length * Math.random())];
};

/* Pick a random int between an interval.

   @param {int} min - lower bound of interval.
   @param {int} max - upper bound of interval.
*/
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

/* Add some additional formatting to the text to make it prettier.

   Capitalises the first letter of a paragraph and adds a fullstop at the end.

   @param {String} text - text to prettify.
*/
function prettifyText(text)
{
    text.replace(".", ". ");
    text += ".";
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text;
}

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBTN = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quotes
function newQuotes() {
    loading();
// Pick random quote
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// If author field is blank or not
if(!quote.author) {
    authorText.textContent = 'Unkown';
} else {
authorText.textContent = quote.author;
}

// Check quote length to determin stye
if(quote.text.length > 120){
    quoteText.classList.add('long-quote');
} else {
    // Set Quote, hide loader
    quoteText.classList.remove('long-quote');
}

quoteText.textContent = quote.text;
complete();
}

// Get Quotes From API
async function getQuotes () {
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {

        const response = await fetch(apiURL);
        // json turns into json object instead of a series of strings
        apiQuotes = await response.json();
        newQuotes();

    } catch (error) {
        // Catch Error
    }
}

// Tweet quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuotes);
twitterBTN.addEventListener('click', tweetQuote);

getQuotes();
//Gets the different places to print out the qoute over
var quoteDisplay = document.getElementsByClassName("quote");
var sourceDisplay = document.getElementsByClassName("source");

//We want to change the quote every 30 seconds
let timerLength = 30000;
var timer;

//This variable holds a copy of all the quotes from the 'database'
var quotesCopy = [ ];

//Create a random index
function randomNumber(maxIndex){
  return Math.floor(Math.random()*maxIndex);
}

function setTimer() {
  //We clear the timer incase the user pushed the button and set a new timer
  clearTimeout(timer);
  timer = setTimeout(printQuote, timerLength);
}

function randomRGBColor(max){
  return 'rgb('+ randomNumber(max) +', '+ randomNumber(max) +','+ randomNumber(max) +')';
}

//Loads a random quote from the quotes.js files
function getRandomQuote(){
  //in case we have run out of quotes, get a new batch of quotes from the 'datebase'
  if (quotesCopy.length <= 0){ quotesCopy = quotesCopy.concat(quotes); }
  //returns quote while removeing it from the array
  return quotesCopy.splice(randomNumber(quotesCopy.length), 1)[0];
}

var printQuote = function() {
  //First we get a random quote
  var rnQuote = getRandomQuote();

  //Start of the HTMl that goes in the source paragraf
  var sourceHTML = rnQuote.source;

  //We tjek if we have a citation
  if (rnQuote.hasOwnProperty("citation")) { sourceHTML += '<span class="citation">' + rnQuote.citation +'</span>'; }
  //We tjek if we have a year date
  if (rnQuote.hasOwnProperty("year")) { sourceHTML += '<span class="year">' + rnQuote.year +'</span>'; }
  //We tjek for potential tags
  if (rnQuote.hasOwnProperty("tags")) { sourceHTML += '<span class="tags">' + rnQuote.tags +'</span>'; }

  //We add alle the html to the quote and source
  quoteDisplay[0].innerHTML = rnQuote.quote;
  sourceDisplay[0].innerHTML = sourceHTML;
  //Change the background color, but at a max rgb value of 200 so we dont get a white page, and cant see the quote
  document.body.style.backgroundColor = randomRGBColor(200);

  //We set a new timer since the last one has stopped running now
  setTimer();
};

//Here we add eventlisteners and set the timer
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
setTimer()

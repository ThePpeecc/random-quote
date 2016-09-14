//Gets the different places to print out the qoute over
var quoteDisplay = document.getElementsByClassName("quote");
var sourceDisplay = document.getElementsByClassName("source");

//The vaiable to hold the timer
var timer;

//This variable holds a copy of all the quotes from the 'database'
var quotesCopy = [ ];

//Create a random index
function randomNumber(maxIndex){
  return Math.floor(Math.random()*maxIndex);
}

function setTimer(timeLength) {
  //We clear the timer incase the user pushed the button and set a new timer
  clearTimeout(timer);
  timer = setTimeout(printQuote, timeLength);
}

function randomRGBColor(max){
  return 'rgb('+ randomNumber(max) +', '+ randomNumber(max) +','+ randomNumber(max) +')';
}

//Loads a random quote from the quotes.js files
function getRandomQuote(){
  //in case we have run out of quotes, get a new batch of quotes from the 'datebase'
  if (quotesCopy.length <= 0){ quotesCopy = quotesCopy.concat(quotes); }
  //returns a random quote while removeing it from the quotesCopy array
  return quotesCopy.splice(randomNumber(quotesCopy.length), 1)[0];
}

var printQuote = function() {
  //First we get a random quote
  var rnQuote = getRandomQuote();

  //Start of the HTMl that goes in the source paragraf
  var sourceHTML = "- ";

  //Add the relevant tags to the sourceHTML
  for (var attributes in rnQuote) {
    if (rnQuote.hasOwnProperty(attributes) && attributes != "quote") {
      sourceHTML += '<span class="' + attributes + '">' + rnQuote[attributes] +'</span>';
    }
  }

  //We add alle the html to the quote and source
  quoteDisplay[0].innerHTML = rnQuote.quote;
  sourceDisplay[0].innerHTML = sourceHTML;

  //Change the background color, but at a max rgb value of 200 so we dont get a white page, and cant see the quote
  document.body.style.backgroundColor = randomRGBColor(200);

  //We set a new timer since the last one has stopped running now
  setTimer(30000);
};

//Here we add eventlisteners and start the timer with 30 seconds
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
setTimer(30000);

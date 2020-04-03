const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
//Above, we use "querySelectAll" because there are multiple class of seats.

//Below, the "+" was added to turn the value from string to number

let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//the function below add how many seat were selected and total them

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');


    //below is a local storage so that when the page is reloaded, the selection stays the same
    //local storage is achieved by copying selected seats into array, mapping through array, and then  return new array indexes. 
    //this is achieved using spread operator

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf
        (seat));

        //localstorage below helps us store inform in the browswer
        //only strings can be saved. JSON.stringify is used to convert them to string

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //the function below adds total seats with their prices

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


//Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
};

//choose a particular movie to update the price

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    //setMovieData helps get index of movie and price to be stored in the localStorage
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//with the function below, all properties with class of seat will be selected 
//with the "toggle" property. It can now be toggled between empty seats and selected seats

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') &&
  !e.target.classList.contains('occupied')) {
   e.target.classList.toggle('selected');

   updateSelectedCount();
  }  
});

//initial count and total set
updateSelectedCount();
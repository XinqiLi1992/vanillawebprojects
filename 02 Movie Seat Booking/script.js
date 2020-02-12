const emptySeats = document.querySelectorAll('#seat-picker .seat:not(.occupied)');
const movieSelector = document.querySelector('#movie');
const price = document.querySelector('#price');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const storage = window.localStorage;

const setSelectedSeats = () => {
  const selectedSeats = [];
  emptySeats.forEach((seat, index) => {
    if (seat.classList.contains('selected')) {
      selectedSeats.push(index);
    }
  });
  storage.setItem('selectedSeats', JSON.stringify(selectedSeats));
}

const updateSeats = () => {
  const selectedSeats = JSON.parse(storage.getItem('selectedSeats')) || [];
  emptySeats.forEach((seat, index) => {
    if (selectedSeats.includes(index)) {
      seat.classList.add('selected');
    }
  });
}

const updateMovieSelector = () => {
  const selectedIndex = storage.getItem('selectedIndex') || 0;
  movieSelector.selectedIndex = selectedIndex;
}

const updatePrice = () => {
  const selectedSeats = JSON.parse(storage.getItem('selectedSeats')) || [];
  const numOfSeats = selectedSeats.length;
  const ticketPrice = storage.getItem('selectedPrice') || 10;
  const totalPrice = numOfSeats * ticketPrice;
  count.innerHTML = numOfSeats;
  total.innerHTML = totalPrice;
}

emptySeats.forEach((seat) => {
  seat.addEventListener('click', (e) => {
    seat.classList.toggle('selected');
    setSelectedSeats();
    updatePrice();
  });
});

movieSelector.addEventListener('change', (e) => {
  const { selectedIndex, value } = e.target;
  storage.setItem('selectedIndex', selectedIndex);
  storage.setItem('selectedPrice', value);
  updatePrice();
});

updateSeats();
updateMovieSelector();
updatePrice();
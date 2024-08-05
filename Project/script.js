// JavaScript code in script.js

// Function to filter movie boxes based on the selected location
function filterMovieBoxes(location) {
  const movieBoxes = document.querySelectorAll('.movie-box');

  // If no location is selected or "None" is selected, display all movie boxes
  if (!location || location.toLowerCase() === 'none') {
    movieBoxes.forEach(box => {
      box.style.display = 'block';
    });
    return;
  }

  // Loop through each movie box
  movieBoxes.forEach(box => {
    // Get the movie name associated with the movie box
    const movieName = box.querySelector('p').textContent.toLowerCase();
    // Check if the movie belongs to the selected location
    if (movieLocationMap[movieName] && movieLocationMap[movieName].includes(location.toLowerCase())) {
      // If it belongs to the selected location, display the movie box
      box.style.display = 'block';
    } else {
      // If it doesn't belong to the selected location, hide the movie box
      box.style.display = 'none';
    }
  });
}

// Select the location select element
const locationSelect = document.getElementById('location');

// Add a change event listener to the location select element
locationSelect.addEventListener('change', function() {
  // Get the selected location
  const selectedLocation = this.value;
  // Call the filterMovieBoxes function with the selected location
  filterMovieBoxes(selectedLocation);
});

// Initial movie location map
const movieLocationMap = {
  'hanuman': ['delhi', 'hyderabad', 'chennai', 'bangalore', 'kerala', 'none'],
  'lal salaam': ['delhi', 'chennai', 'hyderabad', 'none'],
  'fighter': ['delhi', 'none'],
  'bachelor party': ['bangalore', 'none'],
  'ozler': ['kerala', 'none']
};

// Call filterMovieBoxes with the initial selected location
filterMovieBoxes(locationSelect.value);

// Add an event listener to handle page refresh
window.addEventListener('load', function() {
  // Call filterMovieBoxes to display all movie boxes on page load
  filterMovieBoxes(locationSelect.value);
});

// Function to display the movie box corresponding to the entered movie name
function displayMovieBox(movieName) {
  const movieBoxes = document.querySelectorAll('.movie-box p');

  if (movieName.trim() === "") {
    // If search input is empty, display all movie boxes
    movieBoxes.forEach(box => {
      box.parentElement.style.display = 'block';
    });
    return;
  }

  let found = false;

  // Loop through each movie box
  movieBoxes.forEach(box => {
    // Check if the movie name matches the entered movie name
    if (box.textContent.trim().toLowerCase() === movieName.toLowerCase()) {
      // If match found, display the corresponding movie box
      box.parentElement.style.display = 'block';
      found = true;
    } else {
      // If no match found, hide the movie box
      box.parentElement.style.display = 'none';
    }
  });

  // If no movie box is found, display "Empty"
  if (!found) {
    const searchResultsContainer = document.querySelector('.search-results');
    searchResultsContainer.innerHTML = "<p>Empty</p>";
  }
}

// Select the search input element
const searchInput = document.querySelector('.search-location input[type="text"]');

// Add an input event listener to the search input
searchInput.addEventListener('input', function() {
  // Call the displayMovieBox function with the current value of the search input
  displayMovieBox(this.value);
});


// Carousel image slideshow functionality
let index = 0;
const images = document.querySelectorAll('.image-carousel img');
const totalImages = images.length;

function showNextImage() {
  images[index].style.display = 'none';
  index = (index + 1) % totalImages;
  images[index].style.display = 'inline-block';
}

// Initially display the first image
images[0].style.display = 'inline-block';

setInterval(showNextImage, 3000); // Change image every 3 seconds.

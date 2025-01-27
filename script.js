// Select form and container elements
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const movieContainer = document.querySelector("#movie-container");

// API configuration
const API_BASE_URL = "https://www.omdbapi.com/"; // Use HTTPS
const API_KEY = "527a8e8"; // Your API key

// Function to fetch movie data
async function fetchMovies(searchTerm) {
  try {
    const response = await fetch(
      `${API_BASE_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error); // Error from API response
    }
    displayMovies(data.Search);
  } catch (error) {
    console.error("Error fetching movies:", error);
    movieContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

// Function to display movies
function displayMovies(movies) {
  movieContainer.innerHTML = "";
  if (!movies || movies.length === 0) {
    movieContainer.innerHTML = '<p class="no-results">No results found.</p>';
    return;
  }

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    const posterUrl =
      movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450.png?text=No+Image"; // Placeholder image URL

    movieCard.innerHTML = `
            <img src="${posterUrl}" alt="Poster of ${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <p>Type: ${movie.Type}</p>
        `;

    movieContainer.appendChild(movieCard);
  });
}

// Event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm) {
    fetchMovies(searchTerm);
  } else {
    movieContainer.innerHTML =
      '<p class="error">Please enter a search term.</p>';
  }
});

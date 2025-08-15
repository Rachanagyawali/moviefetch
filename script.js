const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".body-section");
const inputBox = document.querySelector(".name");

// function to fetch movie details using OMDb API
const getMovieInfo = async (movie) => {
  const myApiKey = "43293603";
  const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      showMovieData(data); 
    } else {
      movieContainer.innerHTML = `<p>❌ Movie not found!</p>`;
    }

    // 👉 search result देखाइसकेपछि input खाली
    inputBox.value = "";

  } catch (error) {
    console.error("Error fetching movie:", error);
    movieContainer.innerHTML = `<p>⚠️ Error fetching movie data</p>`;
  }
};

// function to show movie data on screen
const showMovieData = (data) => {
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

  movieContainer.innerHTML = ""; // Clear previous results

  const movieElement = document.createElement("div");
  movieElement.innerHTML = `
    <h2>${Title}</h2>
    <img src="${Poster}" alt="${Title}" style="width:200px; border-radius:10px;">
    <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>
    <p><strong>Released:</strong> ${Released}</p>
    <p><strong>Runtime:</strong> ${Runtime}</p>
    <p><strong>Actors:</strong> ${Actors}</p>
    <p>${Plot}</p>
  `;

  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre");

  Genre.split(",").forEach(element => {
    const p = document.createElement("p");
    p.innerText = element.trim();
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);
  movieContainer.appendChild(movieElement);
};

// adding event listener to search form
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    getMovieInfo(movieName);
  }
});

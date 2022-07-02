// PAS FINI

const card = document.querySelector(".card");
const cards = document.querySelector(".cards");
const titre = document.querySelector(".titre");
const synopsis = document.querySelector(".synopsis");
const img = document.querySelector("img");
const inputSearch = document.querySelector("input[type=text]");
// const actionGenre = document.querySelector("#action");
// const comedieGenre = document.querySelector("#comedie");
const genres = document.querySelectorAll("input[type=checkbox]");
const years = document.querySelector("input[type=range]");


let genreSort;

let movies = [];

async function getData(inputSearchVal) {
    console.log(inputSearchVal);
  await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=910624fb6f8cd0a3279a98fbad0da08d&query=${inputSearchVal}&language=fr-FR`
  )
    .then((res) => res.json())
    .then((data) => {
      movies = data.results;
    });
  displayCards();
}

genres.forEach((genre) => {
  genre.addEventListener('click', (e) => {
    genreSort = e.target.id;
    console.log(genreSort);
    displayCards()
  })
})


function displayCards() {
  const dateFormat = (date) => {
    console.log(date);
    let [yy, mm, dd] = date.split("-");
    return [yy]
  }

  cards.innerHTML = movies
    .map(
        (movie) =>
        `
        <div class="card">
            <div class="img-div">
                <img src= 'https://image.tmdb.org/t/p/w500/${movie.poster_path}'  alt="">
            </div>
            <h5 class="titre">${movie.original_title}</h5>
            <h6 class="date">${dateFormat(movie.release_date)}<h6>
            <p class="synopsis">${movie.overview}</p>
        </div>
        `
        )
        .join("");
        console.log(movies)
}


inputSearch.addEventListener('input', (e) => {
    let inputSearchVal = e.target.value

    getData(inputSearchVal);
})


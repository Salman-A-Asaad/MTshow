// Set the variavle
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjQ5MGRkODMyODE0NGJkZGEwZTZjZGY0OGNlMGM3ZCIsInN1YiI6IjY1MTk4ZDI4OTY3Y2M3MzQyOTVjYjg0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XqagYNfa4658pWHj331dsm3GH-PYlGV7Fm7X9pWSDEM",
    },
};
const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10759: "Action & Adventure",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
};
const row = document.getElementById("row");
const pageNumber = document.getElementById("page_number");
const nextBtn = document.getElementById("next");
const preBtn = document.getElementById("pre");
const scrollTopBtn = document.getElementById("scroll-top");
let pageTopRatedTV = 1;
let totalpageTopRatedTV;
let noPoster = "img/noPoster.jpg";
const poster = "https://image.tmdb.org/t/p/w220_and_h330_face";
let moviesID = {};
const titleMovie = document.querySelector(".title-name-modal");
const overviewMovie = document.getElementById("overview");
const originalLangMovie = document.getElementById("original-lang");
const popularityMovie = document.getElementById("popularity");
const releaseDateMovie = document.getElementById("release-date");
const voteAvgMovie = document.getElementById("vote-avg");
const voteCountMovie = document.getElementById("vote-count");
const genreMovie = document.getElementById("genre");
document.getElementById("year").innerHTML = new Date().getFullYear();
pageNumber.innerHTML = pageTopRatedTV;
row.innerHTML = `<div class="d-flex justify-content-center align-items-center" style="width: 100% ; height:255px">
<div class="spinner-border text-danger" role="status">
  <span class="sr-only"></span>
</div>
</div>`;
preBtn.classList.add("disable");
// Set the function
function findTV() {
    fetch(
            `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${pageTopRatedTV}`,
            options
        )
        .then((response) => response.json())
        .then((response) => {
            totalpageTopRatedTV = response.total_pages;
            displayTopTV(response.results);
        })
        .catch((err) => console.error(err));
}

function displayTopTV(data) {
    let item = ``;
    data.forEach((element) => {
        let {
            id,
            original_language,
            name,
            first_air_date,
            poster_path,
            popularity,
            vote_average,
            vote_count,
            overview,
            genre_ids,
        } = element;
        moviesID[`${id}`] = {
            original_language: original_language,
            title: name,
            release_date: first_air_date,
            popularity: popularity,
            vote_average: vote_average,
            vote_count: vote_count,
            overview: overview,
            genre_ids: genre_ids,
        };
        item += `<div class="col-sm-6 col-md-4 col-lg-3 pb-4">
            <div class="card bg-dark align-self-stretch">
              <img src="${
                poster_path != null ? poster + poster_path : noPoster
              }" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title text-light mb-3">${name}</h5>
                <a
                id="${id}"
                  href="#"
                  class="btn btn-outline-danger text-capitalize show-more"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  >more</a
                >
              </div>
            </div>
          </div>`;
    });
    row.innerHTML = item;
    if (data.length == 0) {
        pageNumber.innerHTML = 0;
        nextBtn.classList.add("disable");
    }
}
findTV();
document.onclick = function(e) {
    if (e.target.className.includes("show-more")) {
        let id = e.target.id;
        let genreName = ``;
        titleMovie.innerHTML =
            moviesID[id].title != "" ? moviesID[id].title : "No things";
        overviewMovie.innerHTML =
            moviesID[id].overview != "" ? moviesID[id].overview : "No things";
        originalLangMovie.innerHTML = moviesID[id].original_language;
        popularityMovie.innerHTML = moviesID[id].popularity;
        releaseDateMovie.innerHTML = moviesID[id].release_date;
        voteAvgMovie.innerHTML = moviesID[id].vote_average.toFixed(1);
        voteCountMovie.innerHTML = moviesID[id].vote_count;
        moviesID[id].genre_ids.forEach((e, index) => {
            if (index == moviesID[id].genre_ids.length - 1)
                genreName += `${genres[e]}`;
            else genreName += `${genres[e]} / `;
        });
        genreMovie.innerHTML = genreName;
    }
};

function disablePreBtn() {
    if (pageTopRatedTV == 1) preBtn.classList.add("disable");
}

function disableNextBtn() {
    if (pageTopRatedTV == totalpageTopRatedTV) nextBtn.classList.add("disable");
}
// Events of page
nextBtn.onclick = function() {
    if (pageTopRatedTV < totalpageTopRatedTV) {
        pageNumber.innerHTML = ++pageTopRatedTV;
        findTV();
        disableNextBtn();
        window.scrollTo(0, 0);
    }
    if (pageTopRatedTV == 2) {
        preBtn.classList.remove("disable");
    }
};
preBtn.onclick = function() {
    if (pageTopRatedTV > 1) {
        pageNumber.innerHTML = --pageTopRatedTV;
        findTV();
        disablePreBtn();
        window.scrollTo(0, 0);
    }
    if (pageTopMovies == totalpageTopMovies - 1) {
        nextBtn.classList.remove("disable");
    }
};
scrollTopBtn.onclick = function() {
    window.scrollTo(0, 0);
};
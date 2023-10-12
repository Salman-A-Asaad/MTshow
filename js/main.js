// Set the variable
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjQ5MGRkODMyODE0NGJkZGEwZTZjZGY0OGNlMGM3ZCIsInN1YiI6IjY1MTk4ZDI4OTY3Y2M3MzQyOTVjYjg0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XqagYNfa4658pWHj331dsm3GH-PYlGV7Fm7X9pWSDEM",
  },
};
let links = document.querySelectorAll(".bar-links");
let upcomingLink = document.getElementById("upcoming");
let topLink = document.getElementById("top");
let trendingLink = document.getElementById("trending");
let aboutLink = document.getElementById("about");
let searchMovieBtn = document.getElementById("search-movie-btn");
let searchTvBtn = document.getElementById("search-tv-btn");
let inputForm = document.getElementById("input-form");
let swiperUpcoming = document.getElementById("swiper-upcoming");
let swiperMovieTop = document.getElementById("swiper-movies-top");
let swiperTvTop = document.getElementById("swiper-tv-top");
let swiperMovieTrend = document.getElementById("swiper-movies-trend");
let swiperTvTrend = document.getElementById("swiper-tv-trend");
document.getElementById("year").innerHTML = new Date().getFullYear();
let pageTopRatedMovies = 1;
let totalPageTopRatedMovies;
let totalPageSearchTV;
let pageSearchTV = 1;
let pageTopRatedTV = 1;
let totalPageTopRatedTV;
const poster = "https://image.tmdb.org/t/p/w220_and_h330_face/";
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
var swiper = new Swiper(".slider", {
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    788: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  },
});
// Set the function
function changeLinkOfList() {
  if (window.scrollY >= upcomingLink.offsetTop) {
    links.forEach((ele) => {
      ele.classList.remove("active-a");
    });
    links[0].classList.add("active-a");
  }
  if (window.scrollY >= topLink.offsetTop - 100) {
    links.forEach((ele) => {
      ele.classList.remove("active-a");
    });
    links[1].classList.add("active-a");
  }
  if (window.scrollY >= trendingLink.offsetTop - 100) {
    links.forEach((ele) => {
      ele.classList.remove("active-a");
    });
    links[2].classList.add("active-a");
  }
  if (window.scrollY >= aboutLink.offsetTop - 100) {
    links.forEach((ele) => {
      ele.classList.remove("active-a");
    });
    links[3].classList.add("active-a");
  }
}

function upComingMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      displayUpComingMovies(response.results);
    })
    .catch((err) => console.error(err));
}

function displayUpComingMovies(data) {
  let item = ``;
  data.forEach((element) => {
    let { title, release_date, poster_path } = element;
    item += `<div class="swiper-slide slide p-2 rounded-2 position-relative">
            <img class="rounded-2" src="${poster + poster_path}" alt="" />
            <h6 class="mt-2 fw-bold text-capitalize text-danger">${title}</h6>
            <p class="position-absolute date-release text-light fs-2 d-flex justify-content-center align-items-center fw-bold text-capitalize">
            ${release_date}</p>
                    </div>`;
  });
  swiperUpcoming.innerHTML = item;
}

function topRatingMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageTopRatedMovies}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      topRatingMovies = response.total_pages;
      displayTopRatingMovies(response.results);
    })
    .catch((err) => console.error(err));
}

function displayTopRatingMovies(data) {
  let item = ``;
  data.forEach((element) => {
    let { title, release_date, poster_path } = element;
    item += `<div class="swiper-slide slide p-2 rounded-2 position-relative">
            <img class="rounded-2" src="${poster + poster_path}" alt="" />
            <h6 class="mt-2 fw-bold text-capitalize text-danger">${title}</h6>
            <p class="position-absolute date-release text-light fs-2 d-flex justify-content-center align-items-center fw-bold text-capitalize">
            ${release_date}</p>
                    </div>`;
  });
  swiperMovieTop.innerHTML = item;
}

function topRatingTV() {
  fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${pageTopRatedTV}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      totalPageTopRatedTV = response.total_pages;
      displayTopRatingTV(response.results);
    })
    .catch((err) => console.error(err));
}

function displayTopRatingTV(data) {
  let item = ``;
  data.forEach((element) => {
    let { name, first_air_date, poster_path } = element;
    item += `<div class="swiper-slide slide p-2 rounded-2 position-relative">
            <img class="rounded-2" src="${poster + poster_path}" alt="" />
            <h6 class="mt-2 fw-bold text-capitalize text-danger">${name}</h6>
            <p class="position-absolute date-release text-light fs-2 d-flex justify-content-center align-items-center fw-bold text-capitalize">
            ${first_air_date}</p>
                    </div>`;
  });
  swiperTvTop.innerHTML = item;
}

function trendingWeekMovies() {
  fetch(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
    options
  )
    .then((response) => response.json())
    .then((response) => displaytTrendingWeekMovies(response.results))
    .catch((err) => console.error(err));
}

function displaytTrendingWeekMovies(data) {
  let item = ``;
  data.forEach((element) => {
    let { title, release_date, poster_path } = element;
    item += `<div class="swiper-slide slide p-2 rounded-2 position-relative">
            <img class="rounded-2" src="${poster + poster_path}" alt="" />
            <h6 class="mt-2 fw-bold text-capitalize text-danger">${title}</h6>
            <p class="position-absolute date-release text-light fs-2 d-flex justify-content-center align-items-center fw-bold text-capitalize">
            ${release_date}</p>
                    </div>`;
  });
  swiperMovieTrend.innerHTML = item;
}

function trendingWeekTV() {
  fetch("https://api.themoviedb.org/3/trending/tv/week?language=en-U", options)
    .then((response) => response.json())
    .then((response) => displaytTrendingWeekTV(response.results))
    .catch((err) => console.error(err));
}

function displaytTrendingWeekTV(data) {
  let item = ``;
  data.forEach((element) => {
    let { name, first_air_date, poster_path } = element;
    item += `<div class="swiper-slide slide p-2 rounded-2 position-relative">
            <img class="rounded-2" src="${poster + poster_path}" alt="" />
            <h6 class="mt-2 fw-bold text-capitalize text-danger">${name}</h6>
            <p class="position-absolute date-release text-light fs-2 d-flex justify-content-center align-items-center fw-bold text-capitalize">
            ${first_air_date}</p>
                    </div>`;
  });
  swiperTvTrend.innerHTML = item;
}
// Trigger the function
upComingMovies();
topRatingMovies();
topRatingTV();
trendingWeekMovies();
trendingWeekTV();
// Events of page
searchMovieBtn.onclick = function () {
  localStorage.setItem("searchM", inputForm.value);
  inputForm.value = "";
};
searchTvBtn.onclick = function () {
  localStorage.setItem("searchT", inputForm.value);
  inputForm.value = "";
};
window.addEventListener("scroll", () => {
  changeLinkOfList();
});

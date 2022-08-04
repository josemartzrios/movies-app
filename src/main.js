import { API_KEY } from "./secret.js";
import * as node from "./nodes.js";


// trabajo con axios para hacer mas limpia mi peticion
// agregue un script en HTML para poder utilizar AXIOS
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }, 
});

// funciones para no repetir código

function createMovies(movies, container){
    container.innerHTML = '';

    // vamos a recorrer cada movie y 
    // recrear el HTML de trending para imprimir datos en pantalla
    movies.forEach(movie => {

        // creo mi div MovieContainer 
        // y le agrego su clase 'movie-container'
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        // creo mi elemento img y le agrega su clase 'movie-img';
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');

        // le agrego un atributo de alt accediendo a movie.title
        movieImg.setAttribute('alt', movie.title);
        // le agrego el atributo src accediendo al endpoint y valor de mi API 
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        // agrego a mi elemento movieContainer mi
        // mi otro elemento movieImg ya con sus atributos
        movieContainer.appendChild(movieImg);

        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container){
    container.innerHTML = "";

    categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = '#category=' + category.id + '-' + category.name;
        })
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);   
    });
}

// PETICIÓN SIN AXIOS
export async function getTrendingPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;

    createMovies(movies, node.trendingMoviesPreviewList);
}

// PETICIÓN CON AXIOS
export async function getTCategoriesPreview(){
    const { data } = await api('genre/movie/list');

    const categories = data.genres;

    createCategories(categories, node.categoriesPreviewList);

}

export async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;

    createMovies(movies, node.genericSection);

}

export async function getTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, node.genericSection);
}

export async function getMovieById(id){
    const { data: movie } = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    node.headerSection.style.background =  `
    
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ), 
        url(${movieImgUrl})
    `;


    node.movieDetailTitle.textContent = movie.title;
    node.movieDetailDescription.textContent = movie.overview;
    node.movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, node.movieDetailCategoriesList);

    getRelatedMoviesId(id);
}

export async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, node.relatedMoviesContainer);
    node.relatedMoviesContainer.scrollTo(0, 0);
}

// // HAY ERROR AQUI, CLASE 13
// export async function getMoviesBySearch(query) {
//   const { data } = await api('search/movie', {
//     params: {
//       query,
//     },
//   });
//   const movies = data.results;

//   createMovies(movies, node.genericSection);
// }


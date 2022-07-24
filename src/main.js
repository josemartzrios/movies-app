import { API_KEY } from "./secret.js";


async function getTrendingPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;
    // console.log({ data, movies })

    // vamos a recorrer cada movie y 
    // recrear el HTML de trending para imprimir datos en pantalla
    movies.forEach(movie => {

        const trendingPreviewMoviesContainer = document.querySelector(
        '#trendingPreview .trendingPreview-movieList');

        // creo mi div MovieContainer 
        // y le agrego su clase 'movie-container'
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

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

        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });

}

getTrendingPreview();
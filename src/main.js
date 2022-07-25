import { API_KEY } from "./secret.js";


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

// PETICIÓN SIN AXIOS
export async function getTrendingPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;
    // console.log({ data, movies })

    // vamos a recorrer cada movie y 
    // recrear el HTML de trending para imprimir datos en pantalla
    movies.forEach(movie => {

        const trendingMoviesPreviewList = document.querySelector(
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

        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}


// PETICIÓN CON AXIOS
export async function getTCategoriesPreview(){
    const { data } = await api('genre/movie/list');

    const categories = data.genres;
   
    categories.forEach(category => {

        const categoriesPreviewList = document.querySelector(
        '#categoriesPreview .categoriesPreview-list');

        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

       
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);   
    });
}


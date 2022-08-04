import { getTCategoriesPreview, getTrendingPreview, getMoviesByCategory, getTrendingMovies, getMovieById } from "./main.js";
import * as node from "./nodes.js";

node.searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + node.searchFormBtn.value;
});

node.trendingBtn.addEventListener('click', () => {
    location.hash = '#trends=';
});

node.arrowBtn.addEventListener('click', () => {
    if(document.domain !== 'localhost'){
        location.hash = '#home';
    } else {
        history.back();
    }
    // location.reload();
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

// hash es un metodo que contiene nuestra URL
// Aca creamos una funcion para registrar cada cambio en la URL
function navigator(){
    console.log(location);

    if(location.hash.startsWith('#trends')){
        trendsPage();

    } else if(location.hash.startsWith('#search=')){
        searchPage();
    
    } else if(location.hash.startsWith('#movie=')){
        movieDetailsPage();
    
    }else if(location.hash.startsWith('#category=')){
        categoriesPage();
    
    } else{
        homePage();
    }
}

function homePage(){
    console.log('home');


    node.headerSection.classList.remove('header-container--long');
    node.headerSection.style.background = '';
    node.arrowBtn.classList.add('inactive');
    node.arrowBtn.classList.remove('header-arrow--white');
    node.headerTitle.classList.remove('inactive');
    node.headerCategoryTitle.classList.add('inactive');
    node.searchForm.classList.remove('inactive');

    node.trendingPreviewSection.classList.remove('inactive');
    node.categoriesPreviewSection.classList.remove('inactive');
    node.genericSection.classList.add('inactive');
    node.movieDetailSection.classList.add('inactive');

    getTrendingPreview();
    getTCategoriesPreview();
}

function categoriesPage(){
    console.log('Categories');

    node.headerSection.classList.remove('header-container--long');
    node.headerSection.style.background = '';
    node.arrowBtn.classList.remove('inactive');
    node.arrowBtn.classList.remove('header-arrow--white');
    node.headerTitle.classList.add('inactive');
    node.headerCategoryTitle.classList.remove('inactive');
    node.searchForm.classList.add('inactive');

    node.trendingPreviewSection.classList.add('inactive');
    node.categoriesPreviewSection.classList.add('inactive');
    node.genericSection.classList.remove('inactive');
    node.movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');


    node.headerCategoryTitle.innerHTML = decodeURIComponent(categoryName);

    window.scrollTo(0, 0);

    getMoviesByCategory(categoryId);
    
}

function movieDetailsPage(){

    node.headerSection.classList.add('header-container--long');
    // node.headerSection.style.background = '';
    node.arrowBtn.classList.remove('inactive');
    node.arrowBtn.classList.add('header-arrow--white');
    node.headerTitle.classList.add('inactive');
    node.headerCategoryTitle.classList.add('inactive');
    node.searchForm.classList.add('inactive');

    node.trendingPreviewSection.classList.add('inactive');
    node.categoriesPreviewSection.classList.add('inactive');
    node.genericSection.classList.add('inactive');
    node.movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function searchPage(){
    console.log('Searching baby');

    node.headerSection.classList.remove('header-container--long');
    node.headerSection.style.background = '';
    node.arrowBtn.classList.remove('inactive');
    node.arrowBtn.classList.remove('header-arrow--white');
    node.headerTitle.classList.add('inactive');
    node.headerCategoryTitle.classList.add('inactive');
    node.searchForm.classList.remove('inactive');

    node.trendingPreviewSection.classList.add('inactive');
    node.categoriesPreviewSection.classList.add('inactive');
    node.genericSection.classList.remove('inactive');
    node.movieDetailSection.classList.add('inactive');

    // ['#search', 'buscador']
    const [_, query] = location.hash.split('=');
    // getMoviesBySearch(query);
}

function trendsPage(){
    console.log('Trending');

    node.headerSection.classList.remove('header-container--long');
    node.headerSection.style.background = '';
    node.arrowBtn.classList.remove('inactive');
    node.arrowBtn.classList.remove('header-arrow--white');
    node.headerTitle.classList.add('inactive');
    node.headerCategoryTitle.classList.remove('inactive');
    node.searchForm.classList.add('inactive');

    node.trendingPreviewSection.classList.add('inactive');
    node.categoriesPreviewSection.classList.add('inactive');
    node.genericSection.classList.remove('inactive');
    node.movieDetailSection.classList.add('inactive');

    node.headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();
}
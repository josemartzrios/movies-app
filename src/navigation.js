import { getTCategoriesPreview, getTrendingPreview } from "./main.js";
import * as node from "./nodes.js";

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
}

function movieDetailsPage(){
    console.log('Movies babyy');
}

function searchPage(){
    console.log('Searching baby')
}

function trendsPage(){
    console.log('Trending')
}
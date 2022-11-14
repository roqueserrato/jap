const categorias = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem('catID') + ".json";

//declaracion de constantes y variables
const ORDER_ASC_BY_NAME = "ascendente";
const ORDER_DESC_BY_NAME = "descendente";
const ORDER_BY_PROD_COUNT = "relevante";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


//funcion ordenar
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}



//funcion q guarda el producto seleccionado el LS y redirecciona
function setCatID(id) {
    localStorage.setItem("producto", id);
    window.location = "product-info.html"
}

//funcion q muestra los elementos del json (con los filtros)
function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let category = currentCategoriesArray.products[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}-${category.currency} ${category.cost}</h4>
                            <small class="text-muted">${category.soldCount} Vendidos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray.products = categoriesArray;
    }

    currentCategoriesArray.products = sortCategories(currentSortCriteria, currentCategoriesArray.products);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(categorias).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});





//funcion y dom que lleva a mi perfil
    function iraperfil(){
        window.location.href = "my-profile.html";
    };

//funcion que hace el menu    
document.addEventListener("DOMContentLoaded", function(){
    let correo = localStorage.getItem("correo")
    let htmlContentToAppend = "";

    htmlContentToAppend +=     
    `
    <div class="dropdown show">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ${correo}
    </a>
  
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <div id="miCarrito">
    <a  class="dropdown-item" >Mi carrito</a>
    </div>
      <a class="dropdown-item id="miPerfil" onclick="iraperfil()" >Mi perfil</a>
      <div id="cerrarsesion">
        <a  class="dropdown-item" >Cerrar Sesion</a>
      </div>
    </div>
  </div>
    `
    document.getElementById("correo").innerHTML = htmlContentToAppend;


    //funcion que cierra sesion
    const cerrarsesion = document.getElementById("cerrarsesion");

    cerrarsesion.addEventListener("click", function(){
      window.location.href = "login.html";
      window.localStorage.removeItem("correo");
    });

    //funcion y dom que lleva al carrito
    const irAlCarrito = document.getElementById("miCarrito");
    
    irAlCarrito.addEventListener("click", function(){
    window.location.href = "cart.html";
    });
});

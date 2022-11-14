const product_info = "https://japceibal.github.io/emercado-api/products/"+ localStorage.getItem("producto") + ".json";
const product_comentarios = "https://japceibal.github.io/emercado-api/products_comments/"+ localStorage.getItem("producto") + ".json";
let currentProductsArray = [];
let currentComentarioArray = [];
let currentRelacionadosArray = [];

const estrellita_comp = '<i class = "fa fa-star  checked"></i>';
const estrellita_vacia = '<i class = "fa fa-star"></i>';



function setCatID(id) {
    localStorage.setItem("catID", id);
}



function showCategoriesList(){

    let htmlContentToAppend = "";
   
    let products = currentProductsArray;
            htmlContentToAppend +=    
            
            `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active mx-auto justify-content-center w-75">
                <div class="">

                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="${products.images[0]}" class="d-block w-100">
                  </div>
                  <div class="carousel-item">
                    <img src="${products.images[1]}" class="d-block w-100">
                  </div>
                  <div class="carousel-item">
                    <img src="${products.images[2]}" class="d-block w-100">
                  </div>
                  <div class="carousel-item">
                  <img src="${products.images[3]}" class="d-block w-100">
                </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>


                        <div class="col">
                             <small class="justify-content-xl-end text-muted">${products.soldCount} Vendidos</small>
                             <h1 class=" display-1 mb-1">${products.name}</h1>
                         </div>

                        <h3 class=" mb-1">${products.description}</h3>
                        <h5 class="mt-3 mb-2">Precio: ${products.currency} ${products.cost}</h5>
                        <button type="button" onclick="agregarAlCarrito(${products.id})" id="agregarAlCarrito" class="my-2 btn btn-outline-success">Agregar al carrito</button>
                        <div id="alertacorrecta">
                        </div>
                     </div>
                </div>
                </div>
            </div>
            ` 
        document.getElementById("infoDelProducto").innerHTML = htmlContentToAppend;
    }
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(product_info).then(function(resultObj){
            if (resultObj.status === "ok"){
                currentProductsArray = resultObj.data
                showCategoriesList()
            }
    })});


    function showComentarioList(){

        let htmlContentToAppend = "";
        for(let i = 0; i < currentComentarioArray.length; i++){
        let comentario = currentComentarioArray[i];


        let estrellas = "";
        for(let e = 0 ; e < 5 ; e++){
                if (e < comentario.score){
                    estrellas += estrellita_comp;
                } else {
                    estrellas += estrellita_vacia;
                }
        }
                htmlContentToAppend += `
                <div onclick="setCatID(${comentario.id})" class=" list-group-item list-group-item-action cursor-active mx-auto justify-content-center w-75">
                    <div class="row">
                        <div class="">
                            <div class=" ">
                                <h4 class=" mb-1">${comentario.user}</h4>
                                <small class="d-flex justify-content-end text-muted">${comentario.dateTime}</small>
                            </div>
                            <p class="col mb-1">${comentario.description}</p>
                        </div>
                        <p class="d-flex justify-content-end mb-1">${estrellas}</p>
                    </div>
                </div>
                `
            document.getElementById("comentariosDelProducto").innerHTML = htmlContentToAppend;
        }
    }

    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(product_comentarios).then(function(resultObj){
            if (resultObj.status === "ok"){
                currentComentarioArray = resultObj.data
                showComentarioList();
            }
    })});


    function estrellitas(){
        let puntaje = currentComentarioArray.score;
        for(let i =0;i<puntaje;i++){
            document.write(estrellita_comp);
        }
    }





    //mostrar productos relacionados
    function relacionados(){

        let htmlContentToAppend = "";
        for(let i = 0; i < currentRelacionadosArray.relatedProducts.length; i++){
            let relacionado = currentRelacionadosArray.relatedProducts[i];
    
                htmlContentToAppend +=  `
                <div onclick="irRelacionado(${relacionado.id})" id="${relacionado.name}" class="card " style="width: 18rem;">
                    <img class="card-img-top" src="${relacionado.image}" >
                    <div class="card-body">
                        <h5 class="card-title">${relacionado.name}</h5>
                    </div>
                </div>`
    
            document.getElementById("productosRelacionados").innerHTML = htmlContentToAppend;
        }
    } 

    //dom de mostrar relacionados
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(product_info).then(function(resultObj){
            if (resultObj.status === "ok"){
                currentRelacionadosArray = resultObj.data
                relacionados();
            }
    })});



    //funcion que te lleva a los relacionados
    function irRelacionado(id){
            localStorage.setItem("producto", id);
            window.location.href = "product-info.html";
        };
        

    

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

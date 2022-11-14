document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
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

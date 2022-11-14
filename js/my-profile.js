let primerNombre = document.getElementById("PrimerNombre");
let segundoNombre = document.getElementById("SegundoNombre");
let primerApellido = document.getElementById("PrimerApellido");
let segundoApellido = document.getElementById("SegundoApellido");
let telefono = document.getElementById("telefono");
let email = document.getElementById("email");
let guardarCambios = document.getElementById("guardarcambios");
let formulario = document.getElementById("formulario");
let imagen = document.querySelector("#imagenActual");





//FUNCION Y DOM DE CARGAR PAGINA CON DATOS EXISTENTES (si hay)
function mostrarPerfil(){
    primerNombre.value = localStorage.getItem('primerNombre');
    segundoNombre.value = localStorage.getItem('segundoNombre');
    primerApellido.value = localStorage.getItem('primerApellido');
    segundoApellido.value = localStorage.getItem('segundoApellido');  
    email.value = localStorage.getItem('correo');   
    telefono.value = localStorage.getItem('telefono');


    let imagen_memoria = localStorage.getItem('pfp');
    if (imagen_memoria != null){
       imagen.setAttribute('src', localStorage.getItem('pfp'));
    } else        
    imagen.setAttribute('src', "img/placeholder_pfp.png");
}

document.addEventListener("DOMContentLoaded", function(){
    mail = localStorage.getItem('correo');
    if (mail=== null){
        window.stop();
        window.location.href = "login.html";
    }
    else mostrarPerfil();
});



//FUNCION QUE VERIFICA LOS DATOS INGRESADOS
function verificarDatos(){
  formulario.classList.add('was-validated');
  return formulario.checkValidity();
}



//FUNCION QUE ALMACENA LOS DATOS INGRESADOS DE SER CORRECTOS
guardarCambios.onclick = function(){
  if (verificarDatos()){
      localStorage.setItem('primerNombre', primerNombre.value);
      localStorage.setItem('segundoNombre', segundoNombre.value);
      localStorage.setItem('primerApellido', primerApellido.value);
      localStorage.setItem('segundoApellido', segundoApellido.value);
      localStorage.setItem('correo', email.value);
      localStorage.setItem('telefono', telefono.value);
  }
}






//PONER IMAGEN DE PERFIL (DESAFIATE)
let archivo = document.querySelector("#inputGroupFile04");
archivo.addEventListener("change", function(){
    let reader = new FileReader();
    reader.addEventListener("load", () =>{
      localStorage.setItem('pfp', reader.result);
      imagen.setAttribute('src', reader.result)
    });
   reader.readAsDataURL(this.files[0]);
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

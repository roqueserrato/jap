const carrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const carrito_extra = "https://japceibal.github.io/emercado-api/products/"+ localStorage.getItem("carro") + ".json";
let currentCarritoArray = [];
let boolTOTAL = true;



function listaCarrito(){
 let htmlContentToAppend = "";

 for(let i = 0; i < currentCarritoArray.articles.length; i++){
    let carro = currentCarritoArray.articles[i];
 htmlContentToAppend +=    
            
 `
 <div class="card mb-3">
 <div class="card-body">
   <div class="d-flex justify-content-between">
     <div class="d-flex flex-row align-items-center">
       <div>
         <img
           src="${carro.image}"
           class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
       </div>
       <div class="ms-3">
         <h5>${carro.name}</h5>
         <p class="small mb-0">${carro.currency}  ${carro.unitCost}</p>
       </div>
     </div>
     <div class="d-flex flex-row align-items-center">

       <div style="width: 50px;" class="d-flex float mx-5">
         <input id="cantidadess" min="0" name="quantity" oninput="calculate(${carro.unitCost})" value="${carro.count}" type="number"
           class="form-control form-control-sm" />
       </div>

       <div id="subtotaler" style="width: 80px;">
       <h5 id="subtotalIndividual" class="mb-0">U$D ${carro.unitCost*carro.count}</h5>
       </div>
     </div>
   </div>
 </div>
</div>
 ` 
 document.getElementById("listadelcarrito").innerHTML = htmlContentToAppend;

}  }  

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(carrito).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCarritoArray = resultObj.data
            listaCarrito();
            calculaSubtotal();
        }
})});


//FUNCION QUE ACTUALIZA PRECIO INDIVIDUAL EN TIEMPO REAL
function calculate(a){
    const botono = document.querySelector('input').value;
    let subtotal = (botono*a);
    document.getElementById("subtotaler").innerHTML = `<h5 id="subtotalIndividual" class="mb-0">U$D ${subtotal}</h5>`;
    calculaSubtotal();
};




//FUNCION PARA SELECCIONAR MEDIO DE PAGO Y DESACTIVAR NO SELECCIONADO
let modal = document.getElementById("modalPago");
modal.oninput = function(){
  let  transferenciaInput = document.getElementById("transferenciabancaria");
  let  tarjetaInput = document.getElementById("tarjetadecredito");

  if (transferenciaInput.checked === true){
    document.getElementById('tarjetadecredito1').value = '';
    document.getElementById('tarjetadecredito2').value = '';
    document.getElementById('tarjetadecredito3').value = '';
    document.getElementById('tarjetadecredito1').disabled = true;
    document.getElementById('tarjetadecredito2').disabled = true;
    document.getElementById('tarjetadecredito3').disabled = true;
    document.getElementById('transferenciabancaria1').disabled = false;
  };
  if (tarjetaInput.checked === true){
    document.getElementById('transferenciabancaria1').value = '';
    document.getElementById('transferenciabancaria1').disabled = true;
    document.getElementById('tarjetadecredito1').disabled = false;
    document.getElementById('tarjetadecredito2').disabled = false;
    document.getElementById('tarjetadecredito3').disabled = false;
  };
};




function verificarPago(){
  modal.classList.add('was-validated');
  return modal.checkValidity();
}


function verificarDireccion(){
  let direccion = document.getElementById("direccionenvio");  
  direccion.classList.add('was-validated');
  return direccion.checkValidity();
  };




//FUNCIONES PARA CALCULOS DE SUBTOTAL, ENVIO Y TOTAL
function calculaSubtotal(){
    const botono = document.querySelector('input').value;
    let subtotal = (botono*15200);
    let envioPremium = document.getElementById("envioPremium");
    let envioExpress = document.getElementById("envioExpress");
    let envioStandard = document.getElementById("envioStandard");
    let envio = 0;

  if (envioPremium.checked === true){
    envio = subtotal*0.15;
  }
  if (envioExpress.checked === true){
    envio = subtotal*0.07;
  }
  if (envioStandard.checked === true){
    envio = subtotal*0.05;
  }
 
  let total = envio+subtotal;

 let htmlContentToAppend2 = "";
 htmlContentToAppend2 +=             
 `
                          <div class="d-flex justify-content-between">
                            <p class="mb-2">Subtotal</p>
                            <p id="subtotal" class="mb-2">U$D ${subtotal}</p>
                          </div>

                          <div class="d-flex justify-content-between">
                            <p class="mb-2">Envío</p>
                            <p id="envio" class="mb-2">U$D ${envio}</p>
                          </div>

                          <div class="d-flex justify-content-between mb-4">
                            <p class="mb-2">Total</p>
                            <p id="total" class="mb-2">U$D ${total} </p>
                          </div>
 ` 
 document.getElementById("sumass").innerHTML = htmlContentToAppend2;

 if (subtotal===0){
  boolTOTAL = false;
    document.getElementById("alertaaa").innerHTML = `
      <div class="alert alert-danger" role="alert">
      La cantidad debe ser mayor a cero
      </div>
      `
  }else {
    boolTOTAL = true;
    document.getElementById("alertaaa").innerHTML = `` ;
  }
}; 

document.getElementById("direccionenvio").oninput = function(){
  calculaSubtotal();
}



//FUNCION QUE ACTIVA EL BOTON COMPRAR
let comprar = document.getElementById("botoncomprar");
comprar.onclick = function(){
  verificarDireccion();
  verificarPago();
  if(verificarDireccion() && verificarPago() && boolTOTAL){
    document.getElementById("alertaaa").innerHTML = `
      <div class="alert alert-success" role="alert">
      Has comprado con exito!
      </div>`
  } ;

}



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

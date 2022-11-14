function showAlertemail() {
    document.getElementById("validationServerUsername").classList.add("is-invalid");
  }
  
  function showAlertpassword() {
    document.getElementById("validationServerPassword").classList.add("is-invalid");
  } 

  const boton = document.getElementById('ingresar');
  let password = document.getElementById('validationServerPassword');
  let email = document.getElementById('validationServerUsername');


  boton.addEventListener('click', ()=> { 
    if (email.value == '' ){
        showAlertemail();
    }

    if (password.value ==''){
        showAlertpassword();
    }    
//si el email y la contraseña no son invalidos reservo el email en el localStorage y dirijo a index
   if(email.value != '' && password.value !=''){
    window.localStorage.setItem("correo", email.value);   
    window.location.href = 'index.html';
    }
  })

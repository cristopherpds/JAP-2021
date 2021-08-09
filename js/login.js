const userName = document.getElementById('inputUserName');
const password = document.getElementById('inputPassword');
const form = document.getElementById('form-signin');

const saveUser = (userName) =>{
  localStorage.setItem('user', userName);
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (userName.value !== '' && password.value !== '') {
      window.location.href = 'index.html';
    } else /*if (userName.value === '' && password.value === '')*/ {
      console.log('Porfavor rellene los campos');
    }
  });
});

/* esto puede ayudar a que no se pueda acceder via url sin pasar por el login
if (document.referrer !== 'login.html') {
        location.href == 'login.html';
      }*/
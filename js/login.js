const userName = document.getElementById('inputUserName');
const password = document.getElementById('inputPassword');
const form = document.getElementById('form-signin');


//guarda nombre de usuario en localStorage
const saveUser = (userName) => {
  sessionStorage.setItem('user', userName);
}

//Google SignIn
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  /*console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present
  console.log(profile);
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);*/
  if (profile.getName() !== '' && profile.getImageUrl() !== '' && profile.getEmail() !== '') {
    //sessionStorage.setItem('googleUser', profile.getName());
    window.location.href = 'home.html';
  } else {
    console.log('No fue posible iniciar sesion con Google');
  }
}

//Google singOut
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function onLoad() {
      gapi.load('auth2', function () {
        gapi.auth2.init();
      });
    }

const checkUser = () => {
  let errorUser = document.getElementById('errorUser');
  let errorPassword = document.getElementById('errorPassword');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (userName.value !== '' && password.value !== '') {
      saveUser(userName.value)
      window.location.href = 'home.html';
    } else {
      errorUser.style.display = 'block';
      errorUser.innerHTML = `Ingresa un usuario valido`;
      errorUser.style.color = 'red';
      userName.style.border = '2px solid red'
      errorPassword.style.display = 'block';
      errorPassword.innerHTML = `Ingresa una contraseña valida`;
      password.style.border = '2px solid red'
      errorPassword.style.color = 'red';
      console.log('Porfavor rellene los campos');
    }
    userName.addEventListener('focus', (e) => {
      userName.style.border = '1px solid #ced4da'
      errorUser.style.display = 'none';
    });
    password.addEventListener('focus', (e) => {
      password.style.border = '1px solid #ced4da'
      errorPassword.style.display = 'none';
    });
  });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  checkUser();
  saveUser(userName.value)
});

/* esto puede ayudar a que no se pueda acceder via url sin pasar por el login
if (document.referrer !== '') {
        location.href == 'login.html';
      }*/
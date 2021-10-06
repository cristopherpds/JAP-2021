const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_URL2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  const getUserName = sessionStorage.getItem('user') || undefined;
  console.log(getUserName);
  if (getUserName != undefined) {
    document.getElementById('navBar').innerHTML += `
    <div class="btn-group">
        <button type="button" class="btn btn-secondary">${getUserName}</button>
        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only"></span>
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="cart.html">Ver mi carrito</a>
          <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" id="userLogout" href="index.html">Cerrar sesión</a>
        </div>
      </div>
    `
    let close = document.getElementById('userLogout');
    close.addEventListener('click', (e) => {
      sessionStorage.removeItem('user');
      signOut()
    })
  } else {
    document.getElementById("navBar").innerHTML +=
      `
    <div class="btn-group">
        <a class="py-2 d-none d-md-inline-block" href="index.html">
        <button type="button" class="btn btn-secondary">Iniciar Sesión</button>
        </a>
    </div>
    `
  }

  /*const getUserName = localStorage.getItem('user') || undefined;
  const getUserGoogleName = localStorage.getItem('userGoogle');
  if(getUserName!== undefined){
    document.getElementById("welcome").innerHTML += 
    `<h1 class="text-uppercase text-muted  font-weight-bold">Bienvenido ${getUserName}!!! 😄</h1>` || ''
  }else{
    `<h1 class="text-uppercase text-muted  font-weight-bold">Bienvenido!!! 😄</h1>`
  }
  
  console.log(getUserGoogleName);*/
});
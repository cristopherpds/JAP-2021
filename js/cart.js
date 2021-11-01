//let articles = {};
let cost = 0;
let quantity = 0;
let quote = 40;
let shippingCost = 0.15;


//Esta funcin muestra los productos del carrito
const showCartProductsAndTotalCost = (array) => {
  let htmlToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let art = array[i];
    htmlToAppend = `
        <tr id="arts${i}">
            <td ><img src="` + art.src + `" class="img-thumbnail" style="width:100px"></td>
            <td><p>`+ art.name + `</p></td>
            <td><p>`+ "UYU " + exchangeRate(art) + `</p></td>
            <td><input id="quantity${i}" type="number" min="1" placeholder="` + art.count + `" style="width:50px" min="1" class="form-control text-center cant" ></td>
            <td ><strong id="subT${i}" class="sub">  ` + art.count * exchangeRate(art) + `</strong></td>
            <td><i class="gg-trash remove"></i></td>
        </tr>
        `
    document.getElementById('cart-products').innerHTML += htmlToAppend;
  }

  addEvents(array);
  removeArticle(array)
}
/*const showCart = (array) => {
  let htmlToAppend = '';
  for (let i = 0; i < array.articles.length; i++) {
    let product = array.articles[i];
    htmlToAppend += `
    <tr>
      <td><img style= width:100px; src="${product.src}" alt=""</td>
      <td>${product.name}</td>
      <td>${product.currency} ${array.articles[i].unitCost}</td>
        <td>
          <input class="form-control" style= width:90px; type="number" id="productCount"  value=${product.count} min="1"/>
        </td>
      <td><span id"productSubtotal">${productSubTotal(product)}</span></td>
      </tr>
    `

    document.getElementById("cart-products").innerHTML = htmlToAppend;

    updateSubtotal(array)

    document.getElementById("productCount").addEventListener('change', () => {
      updateSubtotal(array);
      productSubTotal(product)
    });
  }
}*/

const exchangeRate = (coin) => {
  if (coin.currency == "USD") {
    cost = coin.unitCost * quote
  } else {
    cost = coin.unitCost;
  }
  return cost
}

const addEvents = (articles) => {
  let arrayCant = document.getElementsByClassName('cant');
  for (let i = 0; i < arrayCant.length; i++) {
    let canti = document.getElementById('quantity' + i);
    canti.addEventListener('change', () => {
      quantity = canti.value;
      let subtotal = quantity * exchangeRate(articles[i]);
      document.getElementById('subT' + i).innerHTML = subtotal
      cartTotalCost();
    });
  }
}

const removeArticle = () => {
  let trash = document.getElementsByClassName('remove');
  for (let i = 0; i < trash.length; i++) {
    trash[i].addEventListener('click', () => {
      document.getElementById('arts' + i).innerHTML = "";
      cartTotalCost();
    });
  }
}

const cartTotalCost = () => {
  let arraySubtotales = document.getElementsByClassName('sub');
  let totalCost = 0;
  for (let i = 0; i < arraySubtotales.length; i++) {
    let subIndividual = arraySubtotales[i];
    totalCost += parseFloat(subIndividual.innerText);
  }
  
  let shippingAmount = shippingCost * totalCost;
  let withShipping = totalCost * (1 + shippingCost);
  let htmlSub = `<strong class="text-muted">UYU` + " " + Math.round(totalCost) + `</strong>`
  let htmlShipping = `<strong class="text-muted">UYU` + " " + Math.round(shippingAmount) + `</strong>`
  let htmlTotal = `<strong style="color: #000">UYU` + " " + Math.round(withShipping) + `</strong>`

  document.getElementById("subtotal").innerHTML = htmlSub;
  document.getElementById("envio").innerHTML = htmlShipping;
  document.getElementById("total").innerHTML = htmlTotal;
}
/*const updateSubtotal = (array) => {
  for (let i = 0; i < array.articles.length; i++) {
    let product = array.articles[i];
    let productUnitCost = product.unitCost;
    let productCurrency = product.currency;

    let count = document.getElementById('productCount').value;
    let subtotal = count * productUnitCost;

    document.getElementById('subtotal').innerHTML = `${productCurrency}&nbsp &nbsp${subtotal}`;
    document.getElementById('total').innerHTML = `${productCurrency}&nbsp &nbsp${subtotal}`;
  }
}*/

function productSubTotal(product) {
  return product.unitCost * product.count;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL2).then(resObj => {
    if (resObj.status === 'ok') {
      let array = resObj.data;
      console.log(array.articles);
      //showCart(array)
      showCartProductsAndTotalCost(array.articles);
      cartTotalCost();
    }
  });
});
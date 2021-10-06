//Esta funcin muestra los productos del carrito
const showCart = (array) => {
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
}

const updateSubtotal = (array) => {
  for (let i = 0; i < array.articles.length; i++) {
    let product = array.articles[i];
    let productUnitCost = product.unitCost;
    let productCurrency = product.currency;

    let count = document.getElementById('productCount').value;
    let subtotal = count * productUnitCost;

    document.getElementById('subtotal').innerHTML = `${productCurrency}&nbsp &nbsp${subtotal}`;
    document.getElementById('total').innerHTML = `${productCurrency}&nbsp &nbsp${subtotal}`;
  }
}

function productSubTotal(product){
  return product.unitCost * product.count;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL2).then(resObj => {
    if (resObj.status === 'ok') {
      let array = resObj.data;
      showCart(array)
    }
  });
});
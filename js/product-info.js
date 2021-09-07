let product = {};


const showImagesGallery = (array) => {
  let htmlContentToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend += `
    <div class="col-lg-3 col-md-4 col-6">
      <div class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
      </div>
    </div>
    `
  }
  document.getElementById('productsImagesWrapper').innerHTML = htmlContentToAppend;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then((resObj) => {
    if (resObj.status === 'ok') {
      let product = resObj.data;
      console.log(product);

      let productNameHTML = document.getElementById('productName');
      let productDescriptionHTML = document.getElementById('productDescription');
      let productCostHTML = document.getElementById('productCost');
      let productCurrencyHTML = document.getElementById('productCurrency');
      let productSoldCountHTML = document.getElementById('productSoldCount');
      let productCategoryHTML = document.getElementById('productCategory');

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCostHTML.innerHTML = product.cost;
      productCurrencyHTML.innerHTML = product.currency;
      productSoldCountHTML.innerHTML = product.soldCount;
      productCategoryHTML.innerHTML = product.category;

      showImagesGallery(product.images);
    }
  });
});
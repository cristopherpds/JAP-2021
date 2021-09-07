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

const showStars = (productInfo) => {
  for (let i = 0; i < productInfo.length; i++) {
    const product = productInfo[i];
    document.getElementsByClassName("starsContainer")[i].innerHTML += `<span class="fa fa-star checked"></span>`.repeat(product.score);
    document.getElementsByClassName("starsContainer")[i].innerHTML += `<span class="fa fa-star"></span>`.repeat(5 - product.score);
  }
}

const showReviews = (productInfo) => {
  let reviewsHtmlContentToAppend = [];
  for (let i = 0; i < productInfo.length; i++) {
    let product = productInfo[i];
    reviewsHtmlContentToAppend += `
    <div class="p-4 my-2">
      <div class="d-flex justify-content-between">
        <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${product.user}</h5>
        <div class="starsContainer">
        </div>
      </div>
            <p class="pt-2">${product.description}</p>
            <p class="text-right">${product.dateTime}</p>
            <hr>
    </div>
    `
  }
  document.getElementById('reviewContainer').innerHTML = reviewsHtmlContentToAppend;
  showStars(productInfo);
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then((resObj) => {
    if (resObj.status === 'ok') {
      let product = resObj.data;
      //console.log(product);

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
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(resultObj => {
    let productComments = resultObj.data;
    console.log(productComments);
    showReviews(productComments);
  });


});
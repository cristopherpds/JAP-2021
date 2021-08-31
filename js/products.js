const PRODUCTS_ASC = "AZ";
const PRODUCTS_DES = "ZA";
const PRODUCTS_RELEVANCE = "Relevancia"
let currentProductsArray = [] 
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

const sortProducts = (criteria, array) => {
    let result = [];
    if (criteria === PRODUCTS_ASC) {
        result = array.sort((a, b) => {
            return a.cost - b.cost;
        });
    } else if (criteria === PRODUCTS_DES) {
        result = array.sort((a, b) => {
            return b.cost - a.cost;
        });
    } else if (criteria === PRODUCTS_RELEVANCE) {
        result = array.sort((a, b) => {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1;}
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


const showProductsList = () => {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let products = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.soldCount) <= maxCount))){

            htmlContentToAppend += `
		<div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name + `</h4>
                            <small class="text-muted">` + products.soldCount + ` artículos.</small>
                        </div>
						<div>
                    <p>`+ products.description + `</p>
                    <p> A tan solo `+ products.currency + "   " + products.cost + `</p>
                    </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

const sortAndShowProducts = (sortCriteria, productsArray) =>{
    //funcion para ordenar y mostrar products
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){//compara si productsArray es diferente a undefined
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //mustra los products ordenados
    showProductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then((resObj) => {
        if (resObj.status === 'ok') {
            sortAndShowProducts(PRODUCTS_ASC, resObj.data)
        }
    });

    //funcion que al click ordena de forma ascendnete
    document.getElementById("sortAsc").addEventListener("click",()=>{
        sortAndShowProducts(PRODUCTS_ASC);
    });

    // funcion que al click ordena de forma descendente
    document.getElementById("sortDesc").addEventListener("click",()=>{
        sortAndShowProducts(PRODUCTS_DES);
    });

    // funcion que al click ordena por relevancia
    document.getElementById("sortBySoldCount").addEventListener("click",()=>{
        sortAndShowProducts(PRODUCTS_RELEVANCE);
    });

    // funcion que al click resetea el filtro de cantidad
    document.getElementById("clearRangeFilter").addEventListener("click", ()=>{
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });


    document.getElementById("rangeFilterCount").addEventListener("click",
    ()=>{
        //Obtengo el minimo y maximo de los intervalos para filtrar por cantidad de productos
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        //Verifica si minCount y maxCount son undefined o vacios y los parsea devolviendo un entero
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});
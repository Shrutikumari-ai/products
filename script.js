const API = "https://dummyjson.com/products?limit=194";

let allProducts = [];

const container = document.getElementById("products");
const search = document.getElementById("search");
const category = document.getElementById("category");
const sort = document.getElementById("sort");
const reset = document.getElementById("reset");

// Fetch Products
async function getProducts() {
    try {
        let response = await fetch(API);
        let data = await response.json();

        allProducts = data.products;

        loadCategories();
        displayProducts(allProducts);

    } catch (error) {
        console.log(error);
    }
}

getProducts();

// Display Products
function displayProducts(products) {

    container.innerHTML = "";

    if(products.length === 0){
        container.innerHTML = "<h2>No Products Found</h2>";
        return;
    }

    products.forEach(product => {

        container.innerHTML += `
        <div class="card">
            <img src="${product.thumbnail}">
            <h3>${product.title}</h3>
            <h4>₹ ${product.price}</h4>
            <p>${product.category}</p>
        </div>
        `;

    });

}

// Load Categories
function loadCategories(){

    category.innerHTML = `<option value="">All Categories</option>`;

    let categories = [...new Set(allProducts.map(product => product.category))];

    categories.forEach(item=>{

        category.innerHTML += `
        <option value="${item}">
            ${item}
        </option>
        `;

    });

}

// Apply Filters
function applyFilters(){

    let filteredProducts = [...allProducts];

    // Search
    if(search.value.trim() !== ""){
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(search.value.toLowerCase())
        );
    }

    // Category
    if(category.value !== ""){
        filteredProducts = filteredProducts.filter(product =>
            product.category === category.value
        );
    }

    // Sort
    if(sort.value === "low"){
        filteredProducts.sort((a,b)=>a.price-b.price);
    }
    else if(sort.value === "high"){
        filteredProducts.sort((a,b)=>b.price-a.price);
    }

    displayProducts(filteredProducts);

}

// Events
search.addEventListener("input", applyFilters);
category.addEventListener("change", applyFilters);
sort.addEventListener("change", applyFilters);

// Reset
function resetFilters() {
    search.value = "";
    category.value = "";
    sort.value = "";

    displayProducts(allProducts);
}










  


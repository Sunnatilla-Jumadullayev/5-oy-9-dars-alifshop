const elWrapper = document.querySelector(".wrapper");
const loader = document.querySelector(".loader");
const elBtn = document.querySelector(".btn");
const elCategory = document.querySelector(".nav__list");
const BASE_URL = `https://dummyjson.com`;

// limit
let limitCount = 30;
let offset = 1;
// sinxron malumot ilish
async function getData(endpoint, count) {
  const response = await fetch(
    `${BASE_URL}/${endpoint}?limit=${limitCount * count}`
  );
  response
    .json()
    .then((res) => createProduct(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loader.style.display = "none";
    });
}
getData("products", offset);
console.log(loader);
//create product card

function createProduct(data) {
  while (elWrapper.firstChild) {
    elWrapper.firstChild.remove();
  }
  data.products.forEach((product) => {
    const elCard = document.createElement("div");
    elCard.classList.add("card");
    elCard.innerHTML = `
        <img src=${product.images[0]} alt="" />
        <p class="card__name">${product.title}</p>
        <p class="card__title"><i>${product.category}</i></p>
        <p class="credit">${product.warrantyInformation}</p>
        <p class="prise"><del></del></p>
        <p class="action__prise">${product.price} $</p>
        <div class="basket">buy now</div>
    `;
    elWrapper.appendChild(elCard);
  });
  console.log(data.products[0]);
}
// limit kopayish

// category
async function getCategory(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  response.json().then((res) => createCategory(res));
}

getCategory(`products/category-list`);

function createCategory(data) {
  data.forEach((item) => {
    const li = document.createElement("li");
    const elData = document.createElement("data");
    li.classList.add("nav__item");
    elData.innerHTML = item;
    elData.setAttribute("value", `/category/${item}`);
    elData.addEventListener("click", (e) => {
      const val = e.target.value;
      getData(`products${val}`, offset);
    });
    li.appendChild(elData);
    elCategory.appendChild(li);

    console.log(elData);
  });
}
elBtn.addEventListener("click", () => {
  offset++;
  getData(`products`, offset);
});

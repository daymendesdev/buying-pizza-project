const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

let pizzaItem = '';

function formatPrice(price) {
    return `${price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`;
}

pizzaJson.map((item, index) => {
    let pizzaModels = c('.models .pizza-item').cloneNode(true);
    pizzaModels.querySelector('.pizza-item--img img').src = item.img;
    pizzaModels.querySelector('.pizza-item--price').innerHTML = formatPrice(item.price);
    pizzaModels.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaModels.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaModels.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        c('.pizzaWindow').style.display = 'flex';
    })

    c('main .container').appendChild(pizzaModels);
});
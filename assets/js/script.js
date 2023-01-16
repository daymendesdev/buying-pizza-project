let modalQt = 1;
let modalKey = 0;
let pizzaList = [];

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

let pizzaItem = '';

function formatPrice(price) {
    return `${price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`;
}

function closeModal() {
    c('.pizzaWindow').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindow').style.display = 'none';
    }, 500);
}

pizzaJson.map((item, index) => {
    let pizzaModels = c('.models .pizza-item').cloneNode(true);

    pizzaModels.setAttribute('data-key', index);
    pizzaModels.querySelector('.pizza-item--img img').src = item.img;
    pizzaModels.querySelector('.pizza-item--price').innerHTML = formatPrice(item.price);
    pizzaModels.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaModels.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaModels.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
        c('.pizzaWindow').style.display = 'flex';

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.PizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = formatPrice(pizzaJson[key].price);
        c('.pizzaInfo--size.selected').classList.remove('selected');

        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = `${pizzaJson[key].sizes[sizeIndex]}`;
        });
        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindow').style.opacity = 0;
        c('.pizzaWindow').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindow').style.opacity = 1;
        }, 200)
    });

    c('main .container').appendChild(pizzaModels);
});

cs('.pizzaInfo--cancelButton, .pizzaInfo--CancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})

cs('.pizzaInfo--qtminus, .pizzaInfo--qtplus').forEach((item) => {
    item.addEventListener('click', () => {
        switch (item.innerHTML) {
            case '-':
                if (modalQt > 1) {
                    modalQt--;
                }
            break;
            case '+':
                modalQt++;
            break;
        }
        c('.pizzaInfo--qt').innerHTML = modalQt;
    })
});

cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

c('.menu-opener').addEventListener('click', (e) => {
    if (pizzaList.length > 0) {
        c('aside').style.left = '0';
    }
});

c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
})

c('.pizzaInfo--addButton').addEventListener('click', (e) => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = pizzaList.findIndex(item => item.identifier === identifier);
    if (key > -1) {
        pizzaList[key].qt += modalQt;
    } else {
        pizzaList.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        });
    }
    console.log(pizzaList);
    closeModal();
    updateCart();
});
// Adding items to cart
const cartBtn = document.querySelector('.cart_btn');
const cartItems = document.querySelector('.cart_items');
const itemsContainer = document.querySelector('.cart_item_list');
const item = document.querySelectorAll('.item');
const deleteItem = document.querySelector('.delete_item');

cartBtn.addEventListener('click', () => {
    cartItems.classList.toggle('show_cart_items');
});

// Grabbing already existing items
const products = [];

item.forEach((itemElement, index) => {
    const itemName = itemElement.querySelector('.item_name').innerText;
    const itemPriceText = itemElement.querySelector('.item_price').innerText;
    const itemImage = itemElement.querySelector('.item_photo img').getAttribute('src');

    // Extracting only numbers from the price
    const itemPrice = parseFloat(itemPriceText.replace(/[^0-9.]/g, ''));

    products.push({
        id: index + 1,
        name: itemName,
        image: itemImage,
        price: itemPrice,
    });
});

console.log(products)

// Cart items
const cartItemsArray = [];

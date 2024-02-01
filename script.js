// Adding items to cart
const cartIcon = document.querySelector('.cart_btn');
const cartItems = document.querySelector('.cart_items');
const itemsContainer = document.querySelector('.cart_item_list');
const item = document.querySelectorAll('.item');

cartIcon.addEventListener('click', () => {
    cartItems.classList.toggle('show_cart_items');
});

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

// add_to_cart fuction added to all add to cart btns
document.querySelectorAll('.add_to_cart').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        addToCart(products[index]);
    });
});

function addToCart(product) {
    // Create a new cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart_item');

    // Populate the cart item with product details
    cartItem.innerHTML = `
        <button aria-labelledby="delete-item-label" class="delete_item"><img src="icons/close.svg" alt="Delete"></button>
        <div class="cart_item_details">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
        </div>
        <img src="${product.image}" alt="${product.name}" class="item_image">
    `;

    // Add the cart item to the cartItems container
    itemsContainer.appendChild(cartItem);

    // Add event listener to remove the item from the cart
    const deleteItem = cartItem.querySelector('.delete_item');
    deleteItem.addEventListener('click', () => {
        cartItem.remove();
    });
}

// clear all items in the cart
const clearCartItems = document.querySelector('.clear_btn');

clearCartItems.addEventListener('click', () => {
    products.length = 0;
    itemsContainer.innerHTML = '';
})
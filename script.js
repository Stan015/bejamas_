// adding items to cart
const cartBtn = document.querySelector('.cart_btn'); // gets header cart icon
const cartItems = document.querySelector('.cart_items'); // gets div that contains close cart btn, items container and clear btn
const itemsContainer = document.querySelector('.cart_item_list'); // gets items list container div
const item = document.querySelectorAll('.item'); // gets all items on the cart
const deleteItem = document.querySelector('.delete_item'); // gets delete item btn

// toggle open and close of cart
cartBtn.addEventListener('click', () => {
    cartItems.classList.toggle('show_cart_items');
});
//

itemsContainer = []

item = {}

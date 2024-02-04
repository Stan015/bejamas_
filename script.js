// Adding items to cart
const cartIcon = document.querySelector('.cart_btn');
const cartItems = document.querySelector('.cart_items');
const itemsContainer = document.querySelector('.cart_item_list');
const item = document.querySelectorAll('.item');
const deleteItem = document.querySelector('.delete_item');

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

// instance of Notyf library
const notyf = new Notyf({
    duration: 2500,
    ripple: false,

    // types: [
    //     {
    //         type: 'warning',
    //         background: 'orange',
    //         icon: '⚠'
    //     }
    // ]
});
//

// add_to_cart function added to all add to cart btns
document.querySelectorAll('.add_to_cart').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        addToCart(products[index]);

        notyf.success('Added to cart')
        //
    });
});

function addToCart(product) {
    // Check if the product is already in the cart
    const existingCartItem = itemsContainer.querySelector(`.cart_item[data-id="${product.id}"]`);

    if (existingCartItem) {
        // Increment the quantity and update the total price
        const quantityElement = existingCartItem.querySelector('.quantity');
        const quantity = parseInt(quantityElement.innerText, 10) + 1;
        quantityElement.innerText = quantity;

        // Update the total price
        const totalPriceElement = existingCartItem.querySelector('.total_price');
        const totalPrice = parseFloat(totalPriceElement.innerText.replace(/[^0-9.]/g, ''));
        const updatedTotalPrice = (product.price * quantity).toFixed(2);
        totalPriceElement.innerText = `$${updatedTotalPrice}`;

        // Update the total sum
        updateTotalSum();
    } else {
        // Create a new cart item element
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart_item');
        cartItem.setAttribute('data-id', product.id);

        // Populate the cart item with product details
        cartItem.innerHTML = `
            <button aria-labelledby="delete-item-label" class="delete_item"><img src="icons/close.svg" alt="Delete"></button>
            <div class="cart_item_details">
                <h3>${product.name}</h3>
                <p class="total_price">$${product.price.toFixed(2)}</p>
            </div>
            <div class="quantity">1</div>
            <img src="${product.image}" alt="${product.name}" class="item_image">
        `;

        // Add the cart item to the cartItems container
        itemsContainer.appendChild(cartItem);

        // Event listener to remove one item from the cart
        const deleteItem = cartItem.querySelector('.delete_item');
        deleteItem.addEventListener('click', () => {
            decrementCartItem(cartItem);

            notyf.error({
                message: 'An item got deleted from cart',
                background: 'orange'
            })
        });

        // Update the total sum
        updateTotalSum();
    }
}

function decrementCartItem(cartItem) {
    // Decrement the quantity
    const quantityElement = cartItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.innerText, 10);

    if (quantity > 1) {
        quantityElement.innerText = quantity - 1;

        // Update the total price
        const totalPriceElement = cartItem.querySelector('.total_price');
        const productPrice = parseFloat(cartItem.querySelector('.total_price').innerText.replace(/[^0-9.]/g, ''));
        const updatedTotalPrice = (productPrice / quantity * (quantity - 1)).toFixed(2);
        totalPriceElement.innerText = `$${updatedTotalPrice}`;
    } else {
        // If quantity is 1 or less, remove the entire cart item
        cartItem.remove();
    }

    // Update the total sum
    updateTotalSum();
}

// Total cart items price 
function calculateTotalSum() {
    let cartItems = itemsContainer.querySelectorAll('.cart_item');
    let totalSum = 0;
    let totalQuantity = 0;

    cartItems.forEach(cartItem => {
        const totalPriceElement = cartItem.querySelector('.total_price');
        const totalPrice = parseFloat(totalPriceElement.innerText.replace(/[^0-9.]/g, ''));
        totalSum += totalPrice;

        const quantityElement = cartItem.querySelector('.quantity');
        const quantity = parseInt(quantityElement.innerText, 10);
        totalQuantity += quantity;
    });

    return { totalSum: totalSum.toFixed(2), totalQuantity };
}

function updateTotalSum() {
    const { totalSum, totalQuantity } = calculateTotalSum();
    const totalSumElement = document.querySelector('.total_items_price');
    const totalQuantityElement = document.querySelector('.total_quantity');

    totalSumElement.innerText = `Total Price: $${totalSum}`;
    totalQuantityElement.innerText = totalQuantity;
}
//

// Clear all items in the cart
const clearCartItems = document.querySelector('.clear_btn');

clearCartItems.addEventListener('click', () => {
    let cartItems = itemsContainer.querySelectorAll('.cart_item');
    cartItems.forEach(item => item.remove());

    // Update the total sum
    updateTotalSum();
});
//

// Checkout cart items
const checkoutBtn = document.querySelector('.checkout_btn');

checkoutBtn.addEventListener('click', () => {
    const checkoutStatus = document.createElement('div');
    checkoutStatus.classList.add('chechout_msg');
    const totalSumElement = document.querySelector('.total_items_price')
     
    if (totalSumElement.innerHTML === 'Total Price: $0.00') {
        checkoutStatus.innerHTML = `
            <p>Your cart is empty. <br>Continue shopping to add items to cart. 🙃</p>
        `;

        notyf.error('Your cart is empty')
    } else {
        checkoutStatus.innerHTML = `
            <p>Yehh! Items added to your checkout list! <br>Next step is under construction 😃</p>
        `;
    }

    document.body.appendChild(checkoutStatus);

    setTimeout(() => {
        checkoutStatus.remove();
    }, 2500);
});
//

//toggle product options (mobile view)
const mobileSort = document.querySelector('.mobile_sort_icon');
const productTypes = document.querySelector('.product_type');
const closeProductOptions = document.querySelector('.close_sort_list');

mobileSort.addEventListener('click', () => {
    productTypes.classList.add('show_product_options')
});

closeProductOptions.addEventListener('click', () => {
    productTypes.classList.remove('show_product_options')
});
//
export function addToCart(id, products, cart) {
    let product = products.find((product) => product.id == id);
    for (let product of products) {
        if (product.id == id) {
            product.quantity++;
        }
    }
    if (cart.length == 0) {
        cart.push(product);
    } else {
        let response = cart.find((ele) => ele.id == id);
        if (response === undefined) cart.push(product);
        else {
            for (let product of cart) {
                if (product.id == id) {
                    product.quantity++;
                }
            }
        }
    }
    return { products, cart };
}
export function removeItem(id, products, cart) {
    for (let product of products) {
        if (product.id == id) {
            if (product.quantity > 0) product.quantity--;
        }
    }

    for (let product of cart) {
        if (product.id == id) {
            product.quantity--;
            if (product.quantity == 0) {
                cart = deleteItem(id, cart);
                return { products, cart };
            } else {
                return { products, cart };
            }
        }
    }
}
function deleteItem(id, cart) {
    cart = cart.filter((item) => item.id != id);
    return cart;
}

import { getFromDb } from "../../utilities/fakedb";

export const ProductsAndCartLoader = async () => {
    const loadProducts = await fetch('products.json');
    const products = await loadProducts.json();

    const savedCart = getFromDb();
    let initialCart = [];
    for (const id in savedCart) {
        const selectedProduct = products.find(product => product.id === id)
        const quantity = savedCart[id]
        if (selectedProduct) {
            selectedProduct.quantity = quantity
            initialCart.push(selectedProduct)
        }
    }
    return { products, initialCart };
}

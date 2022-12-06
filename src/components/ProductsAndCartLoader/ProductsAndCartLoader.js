import { getFromDb } from "../../utilities/fakedb";

export const ProductsAndCartLoader = async () => {
    const loadProducts = await fetch('https://ema-john-server-nabinchowdhury.vercel.app/products');
    const { count, products } = await loadProducts.json();
    // console.log(products)

    const savedCart = getFromDb();
    let initialCart = [];
    for (const id in savedCart) {
        const selectedProduct = products.find(product => product._id === id)
        const quantity = savedCart[id]
        if (selectedProduct) {
            selectedProduct.quantity = quantity
            initialCart.push(selectedProduct)
        }
    }
    return { products, initialCart };
}

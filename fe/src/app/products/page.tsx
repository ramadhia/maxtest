import ProductList from "@/app/products/components/ProductList";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "Products Page",
};

const ProductPage = () => {
    return (
        <ProductList />
    )
}

export default ProductPage;
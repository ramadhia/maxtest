export type Product = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    stock: number;
}

export type FetchProduct = {
    products: Product[];
}
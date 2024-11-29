export interface OrderItem {
    id: number;
    qty: number;
    price: number;
    sub_total: number;
}

export interface Order{
    order_key?: string;
    customer_name: string;
    customer_email: string;
    products: OrderItem[];
    total_order?: number;
}
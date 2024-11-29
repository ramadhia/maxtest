'use client'

import { useCartStore, CartItem } from '@/store/useCartStore';
import { useFetchProducts, useCreateOrder } from "@/lib/actions/products";
import Error from "@/app/products/error";
import { Product } from "@/types/products";
import { Order } from "@/types/order";
import { CFG_CUSTOMER_NAME, CFG_CUSTOMER_EMAIL } from "@/lib/config";

import { Alert } from "flowbite-react";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {
    AlertDialog, AlertDialogAction,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";


export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
    const { data: fetchStock, isLoading, error: errorFetchProduct } = useFetchProducts();
    const totalQty: number = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subTotal: string = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const [openDialog, setOpenDialog] = useState(false);
    const [checkoutDisabled, setCheckoutDisabled] = useState<boolean>(false);

    // Check availability of product stock
    const checkStockAvailability = useCallback((productId: number, quantity: number): boolean => {
        const product: Product | undefined = fetchStock?.find(p => p.id === productId);
        if (!product) return false;
        return product.stock >= quantity;
    }, [fetchStock]);

    // Disable checkout if any item is out of stock
    useEffect(() => {
        const isStockEmpty: boolean = !cartItems.every(item => checkStockAvailability(item.id, item.quantity));
        console.log(isStockEmpty);
        setCheckoutDisabled(isStockEmpty)
    }, [cartItems, checkStockAvailability]);

    // Use create order hook
    const { mutate: createOrder, error: errorCreateOrder } = useCreateOrder();

    useEffect(() => {
        if (errorCreateOrder) {
            setCheckoutDisabled(true)
        }
    }, [errorCreateOrder]);

    const handleOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const orderData: Order = {
            customer_name: CFG_CUSTOMER_NAME,
            customer_email: CFG_CUSTOMER_EMAIL,
            products: cartItems.map(item => ({
                id: item.id,
                qty: item.quantity,
                price: item.price,
                sub_total: item.quantity * item.price
            })),
        };

        createOrder(orderData, {
            onSuccess: (e: Order) => {
                clearCart()
                console.log(`Order created: ${e.order_key}`);
                setOpenDialog(true);
            }
        })
    };

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cool !</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your order has been created successfully.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {/*<AlertDialogCancel>Close</AlertDialogCancel>*/}
                        <AlertDialogAction className='bg-blue-500'>Ok</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {isLoading && (
                    <p>Trying to get data products...</p>
                )}
                {errorCreateOrder && (
                    <Error error={errorCreateOrder} />
                )}
                {errorFetchProduct && (
                    <Error error={errorFetchProduct} />
                )}
                {!isLoading && cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <div className="mt-3">
                            <button onClick={clearCart} className="px-4 py-2 bg-red-500 text-white rounded">
                                Clear Cart
                            </button>
                        </div>
                        <form onSubmit={handleOrder}>
                            <div className="flex flex-row">
                                <div key="row-pertama" className="basis-3/4">
                                    {cartItems.map((item: CartItem) => {
                                        const isOutOfStock: boolean = !checkStockAvailability(item.id, item.quantity);

                                        return (
                                            <div key={item.id} className="pr-5">
                                                <div className="flex items-center justify-between border-b py-2">
                                                    <div>
                                                        <h2 className="font-semibold">{item.name}</h2>
                                                        <p>${item.price.toFixed(2)} x {item.quantity}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                                className="px-2 py-1 border rounded"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="mx-2">{item.quantity}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="px-2 py-1 border rounded"
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="ml-4 text-red-500"
                                                            >
                                                                Remove
                                                            </button>
                                                    </div>
                                                </div>

                                                {/* Show alert if the item is out of stock */}
                                                {!isLoading && isOutOfStock && (
                                                    <Alert color="failure">
                                                        <strong>Out of stock</strong> for {item.name}. Reduce quantity or remove it.
                                                    </Alert>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div key="row-kedua" className="basis-1/4 flex items-center">
                                    <div className="w-full max-w-sm p-6 bg-gray-50 rounded-lg shadow-md">
                                        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex justify-between text-gray-700">
                                                <span>Subtotal</span>
                                                <span className="font-medium">${subTotal}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-700">
                                                <span>Subtotal Qty</span>
                                                <span className="font-medium">{totalQty}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-700">
                                                <span>Shipping estimate</span>
                                                <span className="font-medium">$0</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-semibold text-gray-900">
                                                <span>Order total</span>
                                                <span>${subTotal}</span>
                                            </div>
                                        </div>
                                        <button
                                            disabled={checkoutDisabled}
                                            type="submit"
                                            className={`w-full mt-6 px-4 py-2 text-white rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 
                                            ${
                                                checkoutDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                                            }`}
                                       >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

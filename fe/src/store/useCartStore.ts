'use client'

import { create } from "zustand";
import { persist, createJSONStorage} from "zustand/middleware"

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type CartState = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
};

export const useCartStore = create(
    persist<CartState>(
        (set) => ({
            cartItems: [],
            addToCart: (item: CartItem) =>
                set((state: CartState): {cartItems: CartItem[]} => {

                    const existingItem: CartItem | undefined = state.cartItems.find((i: CartItem): boolean => i.id === item.id);
                    if (existingItem) {
                        return {
                            cartItems: state.cartItems.map((i: CartItem): CartItem =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        };
                    }
                    return { cartItems: [...state.cartItems, item] };
                }),
            removeFromCart: (id: number) =>
                set((state: CartState): {cartItems: CartItem[]} => ({
                    cartItems: state.cartItems.filter((cartItems: CartItem): boolean => cartItems.id !== id),
                })),
            updateQuantity: (id: number, quantity: number) =>
                set((state: CartState) => ({
                    cartItems: state.cartItems.map((item: CartItem): CartItem =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })),
            clearCart: () => {
                set((state: CartState) => ({
                    cartItems: state.cartItems = []
                }));
                localStorage.removeItem("cart-store");
            }
        }),
        {
            name: "cart-store",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => {
                console.log('hydration starts')

                return (state, error) => {
                    if (error) {
                        console.log('an error happened during hydration', error)
                    } else {
                        console.log('hydration finished')
                    }
                }
            },
        }
    )
);

if (typeof window !== 'undefined') {
    window.addEventListener('storage', () => {
        useCartStore.persist.rehydrate(); // Refresh state dari localStorage
    });
}

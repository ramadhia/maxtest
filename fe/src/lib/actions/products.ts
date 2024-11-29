import { Product } from "@/types/products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Order } from "@/types/order";
import { CFG_BACKEND_HOST, CFG_BACKEND_PORT } from "@/lib/config";

const f = async (e: string, init?: RequestInit): Promise<Response> => {
    const path: string = `http://${CFG_BACKEND_HOST}:${CFG_BACKEND_PORT}/${e}`
    return await fetch(path, init);
}

export const useFetchProducts = (): {
    data: Product[] | undefined,
    isLoading: boolean,
    error: Error | null,
} => {
    return useQuery({
        queryKey: ['product'],
        queryFn: async (): Promise<Product[]> => {
            const r: Response = await f('api/products', {
                cache: 'no-store',
                method: 'GET'
            });
            if (!r.ok) {
                throw new Error("Failed to fetch products");
            }

            return r.json();
        },
    })
}

export const useCreateOrder = (): {
    mutate: (
        orderData: Order,
        options?: { onSuccess?: (data: Order) => void }
    ) => void;
    error: Error | null;
} => {
    const mutation = useMutation({
        mutationFn: async (orderData: Order): Promise<Order> => {
            const r: Response = await f('api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            if (!r.ok) {
                const errorData = await r.json();
                throw new Error(`Failed to create order: ${errorData.error}`);
            }
            return r.json();
        },
    });

    return {
        mutate: (orderData, options) => {
            mutation.mutate(orderData, {
                onSuccess: options?.onSuccess
            });
        },
        error: mutation.error,
    };
};
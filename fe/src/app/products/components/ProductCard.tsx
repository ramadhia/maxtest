'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Tooltip,
    CheckBadge,
    ShieldCheck,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent
} from "@/components/";
import { Product } from "@/types/products";
import { useCartStore } from "@/store/useCartStore";
import { useToast } from "@/hooks/use-toast";

import Image from "next/image";

export const ProductCard = ({ product }: { product: Product }) => {
    const verified: number[] = [1, 4, 6, 7];
    const trusted: number[] = [ 2, 5, 9, 10, 13, 14];

    const { addToCart } = useCartStore();
    const { toast } = useToast()


    const btnAdd = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
        }

        const id = toast({
            description: `${product.name} successfully added to the cart!`,
        }).id
        console.log(id)
        addToCart({...cartItem, quantity: 1})
    }

    return (
        <>
            <Card className="w-full group relative">
                <CardHeader className="p-0">
                    <div className="rounded-md relative w-full h-60">
                        <Image
                            fill={true}
                            src={product.image_url}
                            alt={product.name}
                            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-3">
                    <CardTitle className="font-medium text-sm flex flex-row h-6.5 spac tracking-wide">
                        {verified.includes(product.id) && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="inline-block"><CheckBadge/></div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Verified Seller</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}

                        {trusted.includes(product.id) && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="inline-block"><ShieldCheck/></div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Trusted Seller</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                        <span className="mx-1 truncate">{product.name}</span>
                    </CardTitle>
                    <div className="flex flex-row justify-between">
                        <p className="text-medium font-semibold mt-1">${product.price.toFixed(2)}</p>
                        {/*{<button onClick={buyButton} className="rounded-md bg-blue-200 text-white text-sm px-4 py-1">Buy</button>}*/}
                        <button
                            onClick={btnAdd}
                            className="px-4 py-1 bg-blue-500 text-white text-sm rounded"
                        >
                            Add to Cart
                        </button>
                        {/*{product.stock > 0 && <button onClick={buyButton} className="rounded-md bg-blue-200 text-white text-sm px-4 py-1">Buy</button>}*/}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

'use client'

import { useFetchProducts } from "@/lib/actions/products";
import { ProductCard, ProductNotFound } from "@/app/products/components";
import Loading from "@/app/products/loading";
import Error from "@/app/products/error";

import React from "react";

const ProducList = () => {
    const { data: fetchData ,isLoading, error } = useFetchProducts();
    const isEmpty = !fetchData || fetchData?.length === 0

    return (
        <>
            {error && <Error error={error}/>}

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {isLoading && <Loading/>}

                {fetchData?.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>

            {/* Condition if product not found */}
            {!isLoading && isEmpty && ( <ProductNotFound /> )}
        </>
    )
}

export default ProducList;
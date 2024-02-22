import React, { createContext, useEffect, useState } from 'react'

export const productContext = createContext();
const ProductsContext = ({ children }) => {
    const [products, setProducts] = useState([]);
    async function populate() {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/dashboard/product/getProducts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (data.status === true) {
            setProducts(data.products);
        }
    }
    useEffect(() => {
        populate();
    }, []);
    return (
        <productContext.Provider value={{ products, setProducts }}>
            {children}
        </productContext.Provider>
    )
}

export default ProductsContext;;
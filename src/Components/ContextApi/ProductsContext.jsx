import React, { createContext, useEffect, useState } from 'react'

export const productContext = createContext();
const ProductsContext = ({ children }) => {
    const [products, setProducts] = useState([]);
    async function populate() {
        const response = await fetch(process.env.REACT_APP_DATABASE_URL + "/dashboard/product/getProducts", {
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
        <productContext.Provider value={{ products }}>
            {children}
        </productContext.Provider>
    )
}

export default ProductsContext;;
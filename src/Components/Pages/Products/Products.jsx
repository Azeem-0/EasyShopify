import ReactPaginate from "react-paginate";
import { useState, useEffect, useContext } from "react";
import { Filter } from "./Filter";
import Product from "./Product";
import { motion } from 'framer-motion';
import "./Products.css";
import { sContext } from "../../ContextApi/SearchBarContext";
import { nContext } from "../../ContextApi/NotificationContext";
import TokenValidity from "../../Authentication/TokenValidity";
import { ToastContainer } from "react-toastify";
import { productContext } from "../../ContextApi/ProductsContext";
function Products() {
    const { notify } = useContext(nContext);
    const { products } = useContext(productContext);
    const { search, setSearch } = useContext(sContext);
    var [filter, setFilter] = useState({
        quantity: { value: 'head' },
        price: { value: 'head' },
        category: { value: 'head' }
    })
    const [message, setMessage] = useState("Fetching Products...");
    const [product, setProduct] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState();
    const productsPerPage = 4;
    const pagesVisited = pageNumber * productsPerPage;
    const displayProducts = product.slice(pagesVisited, pagesVisited + productsPerPage).map((ele, ind) => {
        return <Product key={ind} imageUrl={ele.imageUrl} productId={ele._id} name={ele.name} quantity={ele.quantity} rating={ele.averageRating} price={ele.price} />
    })

    async function getProductsFromContext() {
        if (products.length === 0) {
            setMessage("No Products found in the dashboard");
        }
        else {
            setProduct(products);
            setPageCount(Math.ceil(products.length / productsPerPage));
        }
    }
    async function searchProduct() {
        try {
            let searchResults = [];
            const regExpression = new RegExp(`.*${search}.*`, 'i');
            products.forEach(element => {
                const matches = regExpression.test(element.name);
                if (matches) {
                    searchResults.push(element);
                }
            });
            if (searchResults.length === 0) {
                setMessage("No Such Product Found in the Dashboard");
            }
            setProduct(searchResults);
            setPageCount(Math.ceil(searchResults.length / productsPerPage));
        }
        catch (err) {
            console.log(err.message);
            notify("There might be some issue... Please Try Again!");
        }
    }
    async function filterProducts(event) {
        try {
            const { quantity, price, category } = filter;
            let name, value;
            if (event && event.target) {
                name = event.target.name;
                value = event.target.value;
            }
            setFilter((prevValue) => {
                return { ...prevValue, [name]: { value: value } }
            })
            const filteredProducts = products.filter(product => {
                let priceMatch = true, quantityMatch = true, categoryMatch = true, nameMatch = true;
                if (search !== '') {
                    const regExpression = new RegExp(`.*${search}.*`, 'i');
                    nameMatch = regExpression.test(product.name);

                }
                if ((price.value !== 'head' && (name !== 'price')) || (name === 'price' && value !== 'head')) {
                    let maxPrice = Number.parseInt(name === 'price' ? value : price.value);
                    const minPrice = maxPrice - 1000;
                    maxPrice = maxPrice === 4000 ? Math.pow(10, 1000) : maxPrice - 1;
                    priceMatch = product.price >= minPrice && product.price <= maxPrice;
                }
                if ((quantity.value !== 'head' && name !== 'quantity') || (name === 'quantity' && value !== 'head')) {
                    let maxQuantity = Number.parseInt(name === 'quantity' ? value : quantity.value)
                    const minQuantity = maxQuantity - 10;
                    maxQuantity = maxQuantity === 30 ? Math.pow(10, 1000) : maxQuantity - 1;
                    quantityMatch = product.quantity <= maxQuantity && product.quantity >= minQuantity;
                }
                if ((category.value !== 'head' && name !== 'category') || (name === 'category' && value !== 'head')) {
                    const categoryExpression = name === 'category' ? new RegExp(`.*${value}.*`, 'i') : new RegExp(`.*${category.value}.*`, 'i');
                    categoryMatch = categoryExpression.test(product.category);
                }
                return nameMatch && priceMatch && quantityMatch && categoryMatch;
            });
            setProduct(filteredProducts);
            if (filteredProducts.length === 0) {
                setMessage("No Such Products in the dashboard");
            }
            setPageCount(Math.ceil(filteredProducts.length / productsPerPage));
        }
        catch (err) {
            notify("Error while filtering... Please refresh and try again.");
        }
    }
    function resetFilters() {
        setFilter({
            quantity: { value: 'head' },
            price: { value: 'head' },
            category: { value: 'head' }
        })
        const priceElement = document.querySelector(".price-select");
        const quantityElement = document.querySelector(".quantity-select");
        const categoryElement = document.querySelector(".category-select");
        if (priceElement) {
            priceElement.selectedIndex = 0;
        }
        if (quantityElement) {
            quantityElement.selectedIndex = 0;
        }
        if (categoryElement) {
            categoryElement.selectedIndex = 0;
        }
        setProduct(products);
        setSearch("");
        setPageCount(Math.ceil(products.length / productsPerPage));
    }
    useEffect(() => {
        TokenValidity().then((res) => {
            if (res === false) {
                localStorage.removeItem('token');
            }
            search !== '' ? searchProduct() : getProductsFromContext();
        })
    }, [search, products]);

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
        <div id="products-section">
            <div id="filter-products">
                <Filter
                    title="Filter by quantity"
                    name='quantity'
                    filter={filterProducts}
                />
                <Filter
                    title="Filter by Category"
                    name='category'
                    filter={filterProducts}
                />
                <Filter
                    title="Filter by price"
                    name='price'
                    filter={filterProducts}
                />
                <button onClick={resetFilters}>Reset Filters</button>
            </div>
            <div id="product-items-section">
                <div className="products">{product.length === 0 ? <p className="message products-message">{message}</p> : displayProducts}</div>
                <ReactPaginate
                    previousLabel='<'
                    nextLabel='>'
                    pageCount={pageCount}
                    onPageChange={({ selected }) => {
                        setPageNumber(selected)
                    }}
                    previousClassName="previousButton"
                    nextClassName="nextButton"
                    containerClassName="containerButtons"
                />
            </div>
        </div>
    </motion.div>
}
export default Products;
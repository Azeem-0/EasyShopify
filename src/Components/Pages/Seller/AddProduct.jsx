import { useContext, useRef, useState } from "react";
import seller from "../../../Images/seller.jpg";
import Lottie from "lottie-react";
import spinner from "../../../assests/imageSpinner.json";
import axios from "axios";
import { motion } from 'framer-motion';
import { nContext } from "../../ContextApi/NotificationContext";
import productPicture from '../../../Images/productPicture.png';
import ImageComponent from "../../utilities/ImageComponent";
import "./AddProduct.css";
import { ToastContainer } from "react-toastify";
function AddProduct() {
  const fileRef = useRef(null);
  const [fileChoosed, setFileChoosed] = useState('Choose Image');
  const { notify } = useContext(nContext);
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    message: false,
    imageUrl: "",
  });
  async function addProduct(event) {
    const formElement = document.querySelector(".adding-form");
    event.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/dashboard/product/addproducts`,
        product
      );
      formElement.reset();
      const data = response.data;
      notify(data.message);
      if (data.status === true) {
        setProduct({ message: data.message });
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  }
  const postImage = async (e) => {
    setLoader(true);
    const pic = e.target.files[0];
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "ecommerce");
    data.append("cloud_name", "dlyhm4e8q");
    fetch("https://api.cloudinary.com/v1_1/dlyhm4e8q/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url.toString());
        setProduct((prevValue) => {
          return { ...prevValue, imageUrl: data.url.toString() };
        });
        setLoader(false);
        setFileChoosed('Image Selected');
      }).catch((err) => {
        setLoader(false);
        notify(err);
      });
  };
  function change(event) {
    const { name, value } = event.target;
    setProduct((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }
  const handleFileClick = () => {
    fileRef.current.click();
  }
  return (
    <motion.div
      className="adding-products"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
      <div className="adding-products-heading" style={{ textAlign: "center" }}>
        <ImageComponent src={seller} blur="LXCjton$IVbH.TaeR*j[t-WWj[oL" />
        <h1>Exquisite Emporium</h1>
        <p>Embark on a Journey of Opulent Discoveries</p>
      </div>
      <form
        className="adding-form"
        onSubmit={addProduct}
        method="POST"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={change}
          required
        ></input>
        <input
          name="description"
          rows="2"
          placeholder="Description"
          onChange={change}
          required
        ></input>
        <input
          type="text"
          placeholder="Category"
          name="category"
          onChange={change}
          required
        ></input>
        <input
          type="text"
          placeholder="Price"
          name="price"
          onChange={change}
          required
        ></input>
        <input
          type="text"
          placeholder="Quantity"
          name="quantity"
          onChange={change}
          required
        ></input>
        <input ref={fileRef} className="file-input" type="file" onChange={postImage} required />
        <span id="image-input">
          <button type="button" onClick={handleFileClick}>
            <img src={productPicture} alt="productPicture" />
          </button>
          <p>{fileChoosed}</p>
        </span>
        <button type="submit">{loader ? <Lottie className="image-spinner" animationData={spinner} loop={true} /> : "Submit"}</button>
      </form>
    </motion.div>
  );
}

export default AddProduct;

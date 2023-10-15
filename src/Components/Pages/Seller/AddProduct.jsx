import { useContext, useState } from "react";
import seller from "../../../Images/seller.jpg";
import Lottie from "lottie-react";
import spinner from "../../../assests/imageSpinner.json";
import axios from "axios";
import { nContext } from "../../ContextApi/NotificationContext";
import ImageComponent from "../../utilities/ImageComponent";
import "./AddProduct.css";
import { ToastContainer } from "react-toastify";
function AddProduct() {
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
        `${process.env.REACT_APP_DATABASE_URL}/dashboard/product/addproducts`,
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
  return (
    <div className="adding-products">
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
        <input className="file-input" type="file" onChange={postImage} required />
        <button type="submit">{loader ? <Lottie className="image-spinner" animationData={spinner} loop={true} /> : "Submit"}</button>
      </form>
    </div>
  );
}

export default AddProduct;

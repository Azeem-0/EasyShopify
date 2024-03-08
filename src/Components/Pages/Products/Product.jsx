import { useContext, useState } from "react";
import { nContext } from '../../ContextApi/NotificationContext';
import axios from "axios";
import Lottie from "lottie-react";
import imageSpinner from "../../../assests/imageSpinner.json";
import ImageComponent from "../../utilities/ImageComponent";
function Product(props) {
  const { notify } = useContext(nContext);
  const [spinner, setSpinner] = useState(false);
  const { name, price, quantity, rating } = props;
  async function addToCart() {
    try {
      setSpinner(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/dashboard/product/addUserProducts`,
        {
          pId: props.productId,
          from: "cart",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      notify(data.message);
    } catch (error) {
      notify("Something went wrong. Please refresh the page and try again.");
    }
    setSpinner(false);
  }
  return (
    <div className="product">
      <ImageComponent
        src={`${props.imageUrl}`}
        blur="LXCjton$IVbH.TaeR*j[t-WWj[oL"
      />
      <h2>{name}</h2>
      <p>Available Stock : {quantity}</p>
      <p>₹ {price}</p>
      <p>Rating : {parseFloat(rating.toFixed(1))}/5</p>
      <button name="cart" onClick={addToCart}>
        {spinner ? <Lottie className="image-spinner" animationData={imageSpinner} loop={true} /> : 'Add To Cart'}
      </button>
    </div>
  );
}
export default Product;

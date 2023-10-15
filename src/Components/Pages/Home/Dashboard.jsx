import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import Footer from "../Footer/Footer";
import pData from "../../../Components/utilities/topPicksData";
import image1 from "../../../Images/Dashboard1.jpg";
import image2 from "../../../Images/Dashboard2.jpg";
import image3 from "../../../Images/Dashboard3.jpg";
import image4 from "../../../Images/Dashboard4.jpg";
import image5 from "../../../Images/Dashboard5.jpg";
import ImageComponent from "../../utilities/ImageComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Dashboard.css';
import { sContext } from "../../ContextApi/SearchBarContext";

const AutoplaySlider = withAutoplay(AwesomeSlider);

function Toppicks(props) {
    const { setSearch } = useContext(sContext);
    const navigate = useNavigate();
    const searchProduct = (e) => {
        const message = e.target.name;
        setSearch(message);
        navigate("/products");
    }
    return <div className="top-picks-card">
        <ImageComponent src={props.image} blur="LXCjton$IVbH.TaeR*j[t-WWj[oL" />
        <h4>{props.heading}</h4>
        <button name={props.heading} onClick={searchProduct}>Explore</button>
    </div>
}
const ToppicksHead = (props) => {
    const { topPicks, screen } = props;
    return screen ? <AutoplaySlider play={true} interval={5000}>
        < div >
            <div className="top-picks-cards">
                {topPicks.slice(0, 3).map((ele, ind) => {
                    return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
                })}
            </div>
        </div >
        <div>
            <div className="top-picks-cards">
                {topPicks.slice(4, 7).map((ele, ind) => {
                    return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
                })}
            </div>
        </div>
        <div>
            <div className="top-picks-cards">
                {topPicks.slice(8, 11).map((ele, ind) => {
                    return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
                })}
            </div>
        </div></AutoplaySlider > :
        <AutoplaySlider infinite play={true} cancelOnInteraction={true} interval={1000}>
            {topPicks.map((ele, ind) => {
                return <div key={ind}><Toppicks key={ind} heading={ele.heading} image={ele.img} /></div>
            })}
        </AutoplaySlider>
}

function Dashboard() {
    const [screen, setScreen] = useState(false);
    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setScreen(false);
        }
        else {
            setScreen(true);
        }
    }, []);
    return <div id="dashboard">
        <div className="head-background">
            <Carousel autoPlay={true} infiniteLoop={true} interval={2000}>
                <div>
                    <ImageComponent src={image1} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                </div>
                <div>
                    <ImageComponent src={image2} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                </div>
                <div>
                    <ImageComponent src={image3} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                </div>
            </Carousel>
            <div className="home-heading">
                <div>
                    <h1>Fashion, Tech, Lifestyle</h1>
                    <h1 style={{ backgroundColor: '#ffb8b8', display: 'inline' }}>All in One Place</h1>
                </div>
                <p>Your Ultimate Shopping Destination.</p>
                <a href="#top-picks">Shop Now</a>
            </div>
        </div>
        <div id="top-picks">
            <h1>TOP PICKS!</h1>
            <ToppicksHead screen={screen} topPicks={pData} />
        </div>
        <div id="new-arrivals">
            <div id="new-arrivals-head">
                <ImageComponent src={image4} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>New Arrivals</h1>
                    <p>Explore our latest collection of new arrivals.</p>
                </div>
            </div>
            <ToppicksHead screen={screen} topPicks={pData} />
        </div>
        <div id="summer-sales">
            <div id="summer-sales-head">
                <ImageComponent src={image5} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>Summer Sales</h1>
                    <p>Save 20% on Summer Styles,Limited Offer.</p>
                </div>
            </div>
            <div id="top-picks">
                <ToppicksHead screen={screen} topPicks={pData} />
            </div>
        </div>
        <Footer />
    </div>
}

export default Dashboard;
import { React, useState, useEffect, useContext, useNavigate, AwesomeSlider, withAutoplay, Footer, pData, image1, image2, image3, image4, image5, image6, image7, ImageComponent, Carousel, sContext, summerData, winterData, electronicData } from './DashboardImports';
import 'react-awesome-slider/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Dashboard.css';

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
    return screen ? <AutoplaySlider>
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
            <Carousel autoPlay={true} infiniteLoop={true} interval={10000}>
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
        <div id="dashboard-dynamics">
            <div id="dashboard-dynamics-head">
                <ImageComponent src={image4} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>New Arrivals</h1>
                    <p>Explore our latest collection of new arrivals.</p>
                </div>
            </div>
            <ToppicksHead screen={screen} topPicks={pData} />
        </div>
        <div id="dashboard-dynamics">
            <div id="dashboard-dynamics-head">
                <ImageComponent src={image5} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>Summer Sales</h1>
                    <p>Save 20% on Summer Styles,Limited Offer.</p>
                </div>
            </div>
            <div id="top-picks">
                <ToppicksHead screen={screen} topPicks={summerData} />
            </div>
        </div>
        <div id="dashboard-dynamics">
            <div id="dashboard-dynamics-head">
                <ImageComponent src={image6} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>Winter Sales</h1>
                    <p>Save upto 50% on Winter Styles,Limited Offer.</p>
                </div>
            </div>
            <div id="top-picks">
                <ToppicksHead screen={screen} topPicks={winterData} />
            </div>
        </div>
        <div id="dashboard-dynamics">
            <div id="dashboard-dynamics-head">
                <ImageComponent src={image7} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>Electronics</h1>
                    <p>Save upto 50% on Electronics,Limited Offer.</p>
                </div>
            </div>
            <div id="top-picks">
                <ToppicksHead screen={screen} topPicks={electronicData} />
            </div>
        </div>
        <Footer />
    </div>
}

export default Dashboard;
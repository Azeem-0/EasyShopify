import { React, useContext, useNavigate, Footer, pData, image1, image2, image3, image4, image5, image6, image7, ImageComponent, sContext, summerData, winterData, electronicData, Carousel2 } from './DashboardImports';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Dashboard.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';


const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 3,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 1,
        partialVisibilityGutter: 30
    }
};

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
    const { topPicks } = props;
    return <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={true}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
    >
        {topPicks.map((ele, ind) => {
            return <div>
                <Toppicks key={ind} heading={ele.heading} image={ele.img} />
            </div>
        })}
    </Carousel>
}

function Dashboard() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const headingStylings = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }
    return <div id="dashboard">
        <div className="head-background">
            <Carousel2 autoPlay={true} infiniteLoop={true} interval={10000}>
                <div>
                    <ImageComponent src={image1} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                </div>
                <div>
                    <ImageComponent src={image2} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                </div>
                <div>
                    <ImageComponent src={image3} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                </div>
            </Carousel2>
            <div className="home-heading">
                <motion.div
                    ref={ref}
                    style={headingStylings}
                >
                    <h1>Fashion, Tech, Lifestyle</h1>
                    <h1 style={{ backgroundColor: '#ffb8b8', display: 'inline' }}>All in One Place</h1>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >Your Ultimate Shopping Destination.</motion.p>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, ease: [0.17, 0.67, 0.83, 0.67] }}
                    onClick={() => {
                        window.scrollTo(600, 600);
                    }}
                >Shop Now</motion.button>
            </div>
        </div>
        <div id="top-picks">
            <h1>TOP PICKS!</h1>
            <ToppicksHead topPicks={pData} />
        </div>
        <div id="dashboard-dynamics">
            <div id="dashboard-dynamics-head">
                <ImageComponent src={image4} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>New Arrivals</h1>
                    <p>Explore our latest collection of new arrivals.</p>
                </div>
            </div>
            <ToppicksHead topPicks={pData} />
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
                <ToppicksHead topPicks={summerData} />
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
                <ToppicksHead topPicks={winterData} />
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
                <ToppicksHead topPicks={electronicData} />
            </div>
        </div>
        <Footer />
    </div >
}

export default Dashboard;
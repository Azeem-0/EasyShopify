import { React, useContext, useNavigate, Footer, pData, image1, image2, image3, image4, image5, image6, image7, ImageComponent, sContext, summerData, winterData, electronicData } from './DashboardImports';
import './Dashboard.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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
    return !screen ? <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
            clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        autoplay={{
            delay: 5000,
            disableOnInteraction: true,
        }}>
        <SwiperSlide>
            <div className="top-picks-cards">
                {topPicks.slice(0, 3).map((ele, ind) => {
                    return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
                })}
            </div>
        </SwiperSlide >
        <SwiperSlide>
            <div className="top-picks-cards">
                {topPicks.slice(3, 6).map((ele, ind) => {
                    return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
                })}
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="top-picks-cards">
                {topPicks.slice(6, 10).map((ele, ind) => {
                    return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
                })}
            </div>
        </SwiperSlide>
    </Swiper > :
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}>
            {topPicks.map((ele, ind) => {
                return <SwiperSlide key={ind}><Toppicks key={ind} heading={ele.heading} image={ele.img} /></SwiperSlide>
            })}
        </Swiper>
}

function Dashboard() {
    const ref = useRef(null);
    const [screen, setScreen] = useState(false);
    const isInView = useInView(ref, { once: true });
    const headingStylings = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }
    useEffect(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 1000) {
            setScreen(true);
        }
    })
    return <motion.div
        id="dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <div className="head-background">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
            >
                <SwiperSlide><ImageComponent src={image1} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' /></SwiperSlide>
                <SwiperSlide><ImageComponent src={image2} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' /></SwiperSlide>
                <SwiperSlide><ImageComponent src={image3} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' /></SwiperSlide>
            </Swiper>
            <div className="home-heading">
                <motion.div
                    ref={ref}
                    style={headingStylings}
                >
                    <h1>Fashion, Tech, Lifestyle</h1>
                    <h1 style={{ backgroundColor: '#ffb8b8', padding: '0em 15px', display: 'inline' }}>All in One Place</h1>
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
                        window.scrollTo(500, 500);
                    }}
                >Shop Now</motion.button>
            </div>
        </div>
        <div id="top-picks">
            <h1>TOP PICKS!</h1>
            <ToppicksHead topPicks={pData} screen={screen} />
        </div>
        <div className="dashboard-dynamics">
            <div className="dashboard-dynamics-head">
                <ImageComponent src={image4} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>New Arrivals</h1>
                    <p>Explore our latest collection of new arrivals.</p>
                </div>
            </div>
            <ToppicksHead topPicks={pData} screen={screen} />
        </div>
        <div className="dashboard-dynamics">
            <div className="dashboard-dynamics-head">
                <ImageComponent src={image5} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>Summer Sales</h1>
                    <p>Save 20% on Summer Styles,Limited Offer.</p>
                </div>
            </div>
            <div id="top-picks">
                <ToppicksHead topPicks={summerData} screen={screen} />
            </div>
        </div>
        <div className="dashboard-dynamics">
            <div className="dashboard-dynamics-head">
                <ImageComponent src={image6} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>Winter Sales</h1>
                    <p>Save upto 50% on Winter Styles,Limited Offer.</p>
                </div>
            </div>
            <div id="top-picks">
                <ToppicksHead topPicks={winterData} screen={screen} />
            </div>
        </div>
        <div className="dashboard-dynamics">
            <div className="dashboard-dynamics-head">
                <ImageComponent src={image7} blur='LXCjton$IVbH.TaeR*j[t-WWj[oL' />
                <div>
                    <h1>Electronics</h1>
                    <p>Save upto 50% on Electronics,Limited Offer.</p>
                </div>
            </div>
            <div id="top-picks">
                <ToppicksHead topPicks={electronicData} screen={screen} />
            </div>
        </div>
        <Footer />
    </motion.div >
}

export default Dashboard;
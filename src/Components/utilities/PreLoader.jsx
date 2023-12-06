import Lottie from 'lottie-react';
import preLoader from "../../assests/preLoader2.json";
import React from 'react';

const PreLoader = () => {
    return (
        <Lottie
            className="loader-lottie"
            animationData={preLoader}
            loop={true}
        />
    )
}

export default PreLoader;
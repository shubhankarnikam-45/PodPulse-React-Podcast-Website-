import React from 'react';

import '../Home/Home.css'

// import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import HeroImage from '../../Images/hero.png'
import Header from '../common/Header';
import { auth } from '../../firebase';
const Home = () => {

    //
    const navigate = useNavigate();

    //current user get by the firebase.
    const user = auth.currentUser;

    return (
        <>
            <Header />
            <div className="hero">
                <div className="left">
                    <h1>Listen, Create, and Share Podcasts with PodPulse.</h1>
                    <div className='texts'>
                        <p>PodPulse:
                            Unlock your creativity and ignite your passion for podcasts with this innovative web application.</p>

                        <p>You can effortlessly establish your own podcast channel, explore podcasts across diverse genres and categories, and distribute your podcasts globally.</p>

                        <p>Experience the freedom, simplicity, and enjoyment of PodPulse. Join today and embark on your podcasting journey!</p>
                    </div>
                    {
                        user ? (<Button text={"Logout"} onClick={() => navigate('/logout')} width={200} />) : (<Button text={"Sign Up/Login"} onClick={() => navigate('/sign')} width={200} />)
                    }

                </div>
                <div className="right">
                    <img src={HeroImage} alt="Podify" />
                </div>
            </div>
        </>

    )
}

export default Home
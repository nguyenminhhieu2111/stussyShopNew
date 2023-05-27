import React from 'react';
import Announcement from '../components/Announcement';
import Categorie from '../components/Categorie';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Letter from '../components/Letter';
import Products from '../components/Products';
import Slider from '../components/Slider';

const Home = () => {
    return (
        <div>
           <Announcement/>
           <Header/>
           <Slider></Slider>
           <Categorie/>
           <Products/>
           <Letter/>
           <Footer/>
        </div>
    );
};

export default Home;
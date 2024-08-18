import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../components/index';
import Typewriter from '../components/Typewriter';
import Back_ani from '../components/Back_ani';
import { useSelector } from 'react-redux';

function Home_page() {
    console.log("Cuurent user" , useSelector(state => state.auth.user_data))


    return (
        <div 
            className="w-full min-h-screen flex items-center justify-center text-center bg-cover bg-no-repeat bg-center"
        >
            <Back_ani />
            <Container>
                <div className="bg-white bg-opacity-80 p-6 md:p-8 rounded-xl shadow-xl flex flex-col items-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 md:mb-4">
                        Inkspire 🖋️
                    </h1>
                    <p className="text-lg md:text-xl text-gray-800 mb-6 md:mb-8">
                        <Typewriter wordss={["thoughts", "ideas", "stories"]} />
                    </p>
                    <Link to="/all-posts">
                        <Button 
                            bgColor="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-md md:text-lg font-semibold"
                            className="relative bottom-2 right-0 md:right-6"
                        >
                            Get Started
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
}

export default Home_page;

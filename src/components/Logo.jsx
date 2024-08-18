import React from 'react';
import logo_image from '../assets/inkspire.png'

function Logo({
  width = '100px',
  image =  logo_image ,
}) {
  return (
    <img 
      src={image} 
      alt="Logo" 
      style={{ width }} 
      className="block object-contain"
    />
  );
}

export default Logo;

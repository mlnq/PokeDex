import React, { useEffect, useRef } from 'react'
import logo from './logo.png'; 
import FastAverageColor from 'fast-average-color';

interface Props{
  style?:any;
}

function Header({style}:Props) {
  const imageRef = useRef(null);
//   const container = document.querySelector('.image-container');
//   useEffect(
//     ()=>{
//         const fac = new FastAverageColor();
//         //@ts-ignore
//         fac.getColorAsync(ima)
//         .then((color:any) => {
//           //@ts-ignore
//           console.log('Average color', color);
//         })
//         .catch(e => {
//             console.log(e);
//         });

//         console.log(color);
//     }
// )
  return <img id={'logo_'} ref={imageRef} src={logo} alt="Logo" style={{...style}} />;
}

export default Header;
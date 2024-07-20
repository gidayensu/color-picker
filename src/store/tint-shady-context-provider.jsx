import { createContext, useEffect, useState, useMemo } from "react";
import { copyColorToClipBoard, randomColor } from "../components/common/colorFunctions.js";
import PropTypes from "prop-types";


const HEX_REGEX = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;

export const TintShadyContext = createContext(null);


export default function TintShadyContextProvider ({children}) {
  const newRandomColor = randomColor();
  const initialColor = localStorage.getItem("color") || newRandomColor;
  const [colorDetails, setColorDetails] = useState ({
    color: initialColor,
    choosingColor: false,
    currentShadeOrTint: '', 
    tintShadePercent: 8,
    wrongColor: null
  })
  const [imageUploaded, setImageUploaded] = useState(false); 
  
  useEffect(()=> {
    const color = colorDetails.color;
    if (color!==newRandomColor) {
      localStorage.setItem('color', color)
  }
    
  }, [colorDetails, newRandomColor])
  
 
  const colorChoiceHandler = (color) => {
    
    if(typeof(color)==='string'&& color.includes('rgb')) {
      
        const rgb = color;
        const hex = '#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('');
      
        setColorDetails(prevColorDetails=>({...prevColorDetails, color: hex, wrongColor: false}))  
    } 
        
    if(color.hex) {
      
        setColorDetails(prevColorDetails=>({...prevColorDetails, color: color.hex, wrongColor: false})) 
} 
    if (HEX_REGEX.test(color)) {
      
        color.includes('#') ? 
        setColorDetails(prevColorDetails=>({...prevColorDetails, color: color, wrongColor: false}))  
        : 
        setColorDetails(prevColorDetails=>({...prevColorDetails, color: '#'+color, wrongColor: false})) 
        
    } 
    if(!HEX_REGEX.test(color) && !color.hex && !(typeof(color)==='string'&& color.includes('rgb'))) {
      setColorDetails(prevColorDetails=>({...prevColorDetails, wrongColor: true}))  
    }
     
      

  };

  const colorSelected = ()=> {
    return colorDetails.color === initialColor 
  }

  const choosingColorHandler = () => {
    setColorDetails(prevColorDetails=> ({
      ...prevColorDetails, choosingColor: !colorDetails.choosingColor}))
  };

  const imageUploadedHandler = ()=> {
    setImageUploaded(()=>!imageUploaded)
  }

  const copyToClipBoardHandler = (color) => {
    copyColorToClipBoard(color);
    setColorDetails(prevColorDetails=> ({
      ...prevColorDetails, currentShadeOrTint: color}))
}

  const tintShadePercentHandler = (percent) => {
    const numberPercent = parseFloat(percent)
    setColorDetails(prevColorDetails=> ({
      ...prevColorDetails, tintShadePercent: numberPercent}))
    
}
    
    
const wrongColorHandler = (wrongColorStatus)=> {
  setColorDetails(prevColorDetails=> ({
    ...prevColorDetails, wrongColor: wrongColorStatus}))
}

const contextValue = useMemo(()=> ({
  initialColor,
  imageUploaded,
  colorDetails,
  colorChoice: colorChoiceHandler,
  colorSelected,
  choosingColorHandler,
  imageUploadedHandler,
  copyToClipBoardHandler,
  tintShadePercentHandler,
  wrongColorHandler,
}), [
  initialColor,
  imageUploaded,
  colorDetails,
  colorChoiceHandler,
  colorSelected,
  choosingColorHandler,
  imageUploadedHandler,
  copyToClipBoardHandler,
  tintShadePercentHandler,
  wrongColorHandler,
]) 
  return <TintShadyContext.Provider value = {contextValue}>
    {children}
  </TintShadyContext.Provider>
}

TintShadyContext.propTypes = {
  children: PropTypes.node.isRequired,
}
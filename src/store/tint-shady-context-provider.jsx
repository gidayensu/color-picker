import { createContext, useState } from "react";
import copyToClipBoard from "../components/common/copyToClipboard";

const HEX_REGEX = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;

export const TintShadyContext = createContext(null);


export default function TintShadyContextProvider ({children}) {

  const initialColor = "#ffff";

  const [color, setColor] = useState(initialColor);
  const [choosingColor, setChoosingColor] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false); 
  const [currentShadeOrTint, setcurrentShadeOrTint] = useState('');
  const [tintShadePercent, setTintShadePercent] = useState(8);
  const [wrongColor, setWrongColor] = useState(false);
  
  
  
 
  const colorChoiceHandler = (color) => {
    if(typeof(color)==='string'&& color.includes('rgb')) {
        const rgb = color;
        const hex = '#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('');
        setColor(hex);
    } else {
        
        if(color.hex) {
        setColor(color.hex)
} else {
    if (HEX_REGEX.test(color)) {
        setWrongColor(false);
        color.includes('#') ? setColor(color) : setColor('#'+color)
        
    } else {
        setWrongColor(true);
    }
     
      
}
;}
  };

  const colorSelected = ()=> {
    return color === initialColor ? false : true;
  }

  const choosingColorHandler = () => {
    setChoosingColor(() => !choosingColor);
  };

  const imageUploadedHandler = ()=> {
    setImageUploaded(()=>!imageUploaded)
  }

  const copyToClipBoardHandler = (color) => {
    copyToClipBoard(color);
    setcurrentShadeOrTint(color);        
}

  const tintShadePercentHandler = (percent) => {
    const numberPercent = parseFloat(percent)
    setTintShadePercent(numberPercent);
    
}
    
    
const wrongColorHandler = (wrongColorStatus)=> {
    setWrongColor(wrongColorStatus)
}

const contextValue = {
    initialColor,
    color,
    currentShadeOrTint,
    choosingColor,
    imageUploaded,
    wrongColor,
    tintShadePercent,
    colorChoice: colorChoiceHandler,
    colorSelected,
    choosingColorHandler,
    imageUploadedHandler,
    copyToClipBoardHandler,
    tintShadePercentHandler,
    wrongColorHandler,
}
  return <TintShadyContext.Provider value = {contextValue}>
    {children}
  </TintShadyContext.Provider>
}
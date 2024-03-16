import { createContext, useState } from "react";
import copyToClipBoard from "../components/common/copyToClipboard";

export const TintShadyContext = createContext({
    color: '',
    shadeOrTint: '',
    colorChoice: ()=>{},
    colorSelected: ()=>{},
    choosingColor: ()=>{},
    copyColor: ()=>{},
}
);


export default function TintShadyContextProvider ({children}) {

    const initialColor = "#ffff";

  const [color, setColor] = useState(initialColor);
  const [choosingColor, setChoosingColor] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false); 
  const [currentShadeOrTint, setcurrentShadeOrTint] = useState('');
 
 
  const colorChoiceHandler = (color) => {
    if(typeof(color)==='string'&& color.includes('rgb')) {
        const rgb = color;
        const hex = '#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('');
        setColor(hex);
    } else 
    setColor(color.hex);
  };

  const colorSelected = ()=> {
    return color === initialColor ? false : true;
  }

  const choosingColorHandler = () => {
    setChoosingColor(() => !choosingColor);
  };


  const copyToClipBoardHandler = (color) => {
    copyToClipBoard(color);
    setcurrentShadeOrTint(color);        
}

const contextValue = {
    color: color,
    shadeOrTint: currentShadeOrTint,
    colorChoice: colorChoiceHandler,
    colorSelected: colorSelected,
    choosingColor: choosingColorHandler,
    copyColor: copyToClipBoardHandler
}
  return <TintShadyContext.Provider value = {contextValue}>
    {children}
  </TintShadyContext.Provider>
}
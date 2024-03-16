import { useState } from "react";
import ColorPicker from "./color-pickers/ColorPicker.jsx";
import DragAndDrop from "./color-pickers/DragAndDrop.jsx";
import Tints from "./Tints-and-shades/Tints.jsx";
import Shades from "./Tints-and-shades/Shades.jsx";

import { LuCopy, LuCopyCheck } from "react-icons/lu";
import copyToClipBoard from "./common/copyToClipboard.js";

export default function Home() {
  
  const initialColor = "#ffff";

  const [color, setColor] = useState(initialColor);
  const [choosingColor, setChoosingColor] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  
  const [currentShadeOrTint, setcurrentShadeOrTint] = useState('');
 
  const copyToClipBoardHandler = (color) => {
    copyToClipBoard(color);
    setcurrentShadeOrTint(color);        
}

  const colorChoiceHandler = (color) => {
    if(typeof(color)==='string'&& color.includes('rgb')) {
        const rgb = color;
        const hex = '#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('');
        setColor(hex);
    } else 
    setColor(color.hex);
  };

  const choosingColorHandler = () => {
    setChoosingColor(() => !choosingColor);
  };

  
  const endChoosingColorHandler = () => {
    
    setChoosingColor(() => !choosingColor);
  };

  const colorSelected = ()=> {
    return color === initialColor ? false : true;
  }

  return (
    <>
      
      <div className="flex justify-center items-center text-center">
        <p className="md:text-4xl w-[600px] m-8 text-2xl">
          <span className="font-bold text-teal-600"> Tints </span> and
          <span className="font-bold text-teal-700"> Shades </span> of a <span>Color </span>
        </p>
      </div>
      <div className="grid justify-center justify-items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div>
        {!choosingColor && (
          <DragAndDrop
            handleColorPick={colorChoiceHandler}
            setImageUploaded={setImageUploaded}
          />
        )}
        {!choosingColor && !imageUploaded && (
          <div className="flex gap-3 items-center justify-center mt-2">
            <span className="w-20 h-[1px] bg-slate-500"></span>
            <p className="text-sm"> OR</p>
            <span className="w-20 h-[1px] bg-slate-500"></span>
          </div>
        )}
        {!imageUploaded && !choosingColor && (
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 md:w-96 w-64 px-4 mt-2 md:h-12 h-10 rounded-lg "
            onClick={choosingColorHandler}
          >
            Choose Color
          </button>
        )}
        </div>
        
        </div>
        {choosingColor && (
          <ColorPicker
          />
        )}
        {colorSelected() && (
          <>
          <h1 className="text-center font-bold text-4xl mt-4 mb-4">COLOR</h1>
        
        
          <span
            onClick={()=>copyToClipBoardHandler(color)}
            className="text-center p-8 rounded cursor-pointer"
            style={{
              backgroundColor: `${color}`,
            }}
          >
            {color}
            {color === currentShadeOrTint ? <LuCopyCheck/> : <LuCopy/>}
          </span>
          </>
        )}
        <Tints 
          color={color} 
          currentTint={currentShadeOrTint} 
          copyToClipBoardHandler={copyToClipBoardHandler} 
        />
        <Shades 
          color={color}
          currentShade={currentShadeOrTint} 
          copyToClipBoardHandler={copyToClipBoardHandler}  
        />
      </div>

    </>
  );
}

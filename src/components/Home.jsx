import { useState } from "react";
import ColourPicker from "./ColourPicker.jsx";
import DragAndDrop from "./DragAndDrop.jsx";
import Tints from "./Tints.jsx";
import Shades from "./Shades.jsx";

import { LuCopy, LuCopyCheck } from "react-icons/lu";
import copyToClipBoard from "./copyToClipboard.js";

export default function Home() {
  
  const initialColor = "#ffff";

  const [color, setColor] = useState(initialColor);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  
  const [currentShadeOrTint, setcurrentShadeOrTint] = useState('');
 
  const copyToClipBoardHandler = (color) => {
    copyToClipBoard(color);
    setcurrentShadeOrTint(color);        
}

  const handleColourChoice = (color) => {
    if(typeof(color)==='string'&& color.includes('rgb')) {
        const rgb = color;
        const hex = '#' + rgb.slice(4,-1).split(',').map(x => (+x).toString(16).padStart(2,0)).join('');
        setColor(hex);
    } else 
    setColor(color.hex);
  };

  const onClickHandler = () => {
    setButtonClicked(() => !buttonClicked);
  };

  
  const cancelHandler = () => {
    
    setButtonClicked(() => !buttonClicked);
  };

  const colourSelected = ()=> {
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
        {!buttonClicked && (
          <DragAndDrop
            handleColorPick={handleColourChoice}
            setImageUploaded={setImageUploaded}
          />
        )}
        {!buttonClicked && !imageUploaded && (
          <div className="flex gap-3 items-center justify-center mt-2">
            <span className="w-20 h-[1px] bg-slate-500"></span>
            <p className="text-sm"> OR</p>
            <span className="w-20 h-[1px] bg-slate-500"></span>
          </div>
        )}
        {!imageUploaded && !buttonClicked && (
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 md:w-96 w-64 px-4 mt-2 md:h-12 h-10 rounded-lg "
            onClick={onClickHandler}
          >
            Choose Colour
          </button>
        )}
        </div>
        
        </div>
        {buttonClicked && (
          <ColourPicker
            color={color}
            handleColourChoice={handleColourChoice}
            confirm={onClickHandler}
            cancel={cancelHandler}
          />
        )}
        {colourSelected() && (
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

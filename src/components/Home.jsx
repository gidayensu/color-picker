import { useState } from "react";
import ColourPicker from "./ColourPicker.jsx";
import DragAndDrop from "./DragAndDrop.jsx";
import Tints from "./Tints.jsx";
import Shades from "./Shades.jsx";

export default function HomeButtons() {
  
  const initialColor = "#ffff";

  const [color, setColor] = useState(initialColor);
  const [buttonClicked, setButtonClicked] = useState(false);
  

  const handleOnChangeComplete = (color) => {
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

  const confirm = ()=> {

  }
  const cancelHandler = () => {
    
    setButtonClicked(() => !buttonClicked);
  };

  const status = ()=> {
    return color === initialColor ? false : true;
  }

  return (
    <>
      <div className="grid justify-center justify-items-center">
      <DragAndDrop handleColorPick={handleOnChangeComplete} />
      {!buttonClicked && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClickHandler}>Choose Colour</button>
      )}
      {buttonClicked && (
        <ColourPicker
          color={color}
          handleOnChangeComplete={handleOnChangeComplete}
          confirm={onClickHandler}
          cancel={cancelHandler}
        />
      )}
      {status() && <h1 className="text-center font-bold text-4xl mt-4 mb-4">COLOR</h1>}
      {status() && <span className="text-center p-8 rounded cursor-pointer" style ={{
        backgroundColor: `${color}`
      }}>{color}</span>}
      <Tints color={color} status={status} />
      <Shades color={color} status={status} />
      </div>
    </>
  );
}

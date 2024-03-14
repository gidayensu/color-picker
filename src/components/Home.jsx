import { useState } from "react";
import ColourPicker from "./ColourPicker.jsx";
import DragAndDrop from "./DragAndDrop.jsx";
import Tints from "./Tints.jsx";
import Shades from "./Shades.jsx";
import Footer from "./Footer.jsx";

export default function HomeButtons() {
  
  const initialColor = "#ffff";

  const [color, setColor] = useState(initialColor);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

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

  // const confirm = ()=> {

  // }
  const cancelHandler = () => {
    
    setButtonClicked(() => !buttonClicked);
  };

  const status = ()=> {
    return color === initialColor ? false : true;
  }

  return (
    <div className="">
      <div className="flex justify-center items-center text-center">
        <p className="text-4xl w-[600px]">
          Find the <span className="font-bold"> Tints </span> and{" "}
          <span className="font-bold"> Shades </span> of Colour from a Colour
          Picker or an Image
        </p>
      </div>
      <div className="grid justify-center justify-items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div>
        {!buttonClicked && (
          <DragAndDrop
            handleColorPick={handleOnChangeComplete}
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
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 w-96 px-4 mt-2 h-12 rounded-lg"
            onClick={onClickHandler}
          >
            Choose Colour
          </button>
        )}
        </div>
        {/* <div className="mt-2  ">
          <img className="w-[625px] rounded-xl border-8 border-black " src="https://cdn.dribbble.com/userupload/9642219/file/original-bbc14076ab83a19936f1fef39fe57024.gif" alt="image of bouncing colour balls" loop/>

          <img className="w-[300px] absolute top-64 right-44 rounded-xl border-8 border-black " src="https://cdn.dribbble.com/userupload/4144040/file/original-97cbc563585cfbecff918e0c19b08f11.gif" alt="image of bouncing colour balls" loop/>
        </div> */}
        </div>
        {buttonClicked && (
          <ColourPicker
            color={color}
            handleOnChangeComplete={handleOnChangeComplete}
            confirm={onClickHandler}
            cancel={cancelHandler}
          />
        )}
        {status() && (
          <h1 className="text-center font-bold text-4xl mt-4 mb-4">COLOR</h1>
        )}
        {status() && (
          <span
            className="text-center p-8 rounded cursor-pointer"
            style={{
              backgroundColor: `${color}`,
            }}
          >
            {color}
          </span>
        )}
        <Tints color={color} status={status} />
        <Shades color={color} status={status} />
      </div>
      <Footer />
    </div>
  );
}

import { useContext, useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { TintShadyContext } from "../store/tint-shady-context-provider.jsx";
import ColorPicker from "./color-pickers/ColorPicker.jsx";
import DragAndDrop from "./color-pickers/DragAndDrop.jsx";
import Shades from "./Tints-and-shades/Shades.jsx";
import Tints from "./Tints-and-shades/Tints.jsx";

import { rgbColorValidator } from "./common/colorFunctions.js";

export default function Home() {
  const [wrongPercent, setWrongPercent] = useState(false);
  const {
    imageUploaded,
    colorDetails,
    choosingColorHandler,
    tintShadePercentHandler,
    colorChoice,
    copyToClipBoardHandler,
  } = useContext(TintShadyContext);

  const tintShadePercentCheck = (e) => {
    const convertedString = parseFloat(e.target.value);

    if (convertedString && convertedString <= 100 && convertedString >= 1) {
      
      tintShadePercentHandler(convertedString);
      setWrongPercent(false);
    } else {
      setWrongPercent(true);
    }
  };

  const colorChoiceCheck = (event) => {
    const enteredColor = event.target.value;
    if (enteredColor.includes("rgb")) {
      rgbColorValidator(enteredColor) ? colorChoice(enteredColor) :   colorChoice("");
    } else {
      colorChoice(enteredColor);
    }
  };

  const handleOnKeyDown = (e)=> {
    {
      if (e.key === 'Enter' || e.key === ' ') {
        copyToClipBoardHandler(colorDetails.color);
      }
    }
  }
  

  return (
    <>
      <div className="flex justify-center items-center text-center">
        <p className="md:text-4xl w-[600px] m-8 text-2xl">
          <span className="font-bold text-teal-600"> Tints </span> and
          <span className="font-bold text-teal-700"> Shades </span> of a
          <span>Color </span>
        </p>
      </div>
      <div className="grid justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div>
            {!colorDetails.choosingColor && <DragAndDrop />}
            {!colorDetails.choosingColor && !imageUploaded && (
              <div className="flex gap-3 items-center justify-center mt-2">
                <span className="w-20 h-[1px] bg-slate-500"></span>
                <p className="text-sm"> OR</p>
                <span className="w-20 h-[1px] bg-slate-500"></span>
              </div>
            )}
            {!imageUploaded && !colorDetails.choosingColor && (
              <div className="flex flex-wrap justify-center items-center mt-2 gap-4 ">
                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 md:w-80 w-64 px-4  md:h-12 h-10 rounded-lg"
                  onClick={choosingColorHandler}
                >
                  Choose Color
                </button>
                <div className="flex flex-row mb-5 md:mb-0 justify-center items-center  gap-3">
                  <input
                    type="text"
                    className={` ${
                      colorDetails.wrongColor
                        ? "border-2 border-red-500"
                        : "border-2 border-teal-700"
                    } mt-4 md:mt-0  h-12 w-52 rounded-lg p-5 tracking-widest`}
                    defaultValue={colorDetails.color}
                    placeholder="enter a color code"
                    onChange={colorChoiceCheck}
                  />
                  {colorDetails.wrongColor && (
                    <div className="md:mb-4 mt-[95px] md:mr-36 mr-30  absolute flex flex-row">
                      <div className="w-1 h-5 bg-red-500"></div>
                      <div className="flex items-center w-50 h-5 bg-red-200 text-[12px] text-red-500 font-bold tracking-wide p-2">
                        <p>enter a correct hex or rgb color code</p>
                      </div>
                    </div>
                  )}

                  <input
                    placeholder={colorDetails.tintShadePercent + "%"}
                    defaultValue={colorDetails.tintShadePercent + "%"}
                    className={`text-center text-sm mt-4 md:mt-0 md:w-32 w-16 h-12 rounded-lg border-2 ${
                      wrongPercent
                        ? "border-2 border-red-500"
                        : "border-2 border-teal-700"
                    } `}
                    type="number"
                    maxLength="3"
                    onChange={tintShadePercentCheck}
                  />

                  {wrongPercent && (
                    <div className="md:mb-4 mt-[95px] md:ml-40 ml-52 -mr-2 absolute flex flex-row">
                      <div className="w-1 h-5 bg-red-500"></div>
                      <div className="flex items-center w-50 h-5 bg-red-200 text-[12px] text-red-500 font-bold tracking-wide p-2">
                        <p>1.00 - 100</p>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="hidden rounded-full w-12 h-12 shadow-sm"
                  style={{
                    backgroundColor: `${colorDetails.color}`,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
        {colorDetails.choosingColor && <ColorPicker />}

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center font-bold text-4xl mt-8 mb-4">COLOR</h1>

          <div
            onClick={() => copyToClipBoardHandler(colorDetails.color)}
            tabIndex = {0}
            onKeyDown = {handleOnKeyDown}
            className="text-center p-8 h-44 cursor-pointer w-44"
            style={{
              backgroundColor: `${colorDetails.color}`,
            }}
          >
            {colorDetails.color.toUpperCase()}
            {
                <div className="flex justify-center items-center gap-4 text-2xl cursor-pointer">             
                    {colorDetails.color === colorDetails.currentShadeOrTint ? 
                            
                    <div className="flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-10 w-10 h-10">
                    <LuCopyCheck /> 
                    </div>
                    : <div className="flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-10 w-10 h-10"> 
                      <LuCopy  onClick={()=>copyToClipBoardHandler(colorDetails.color)}/> 
                      </div>
                      }
                    
                </div>
                }

            
          </div>
        </div>

        <Tints />
        <Shades />
      </div>
    </>
  );
}

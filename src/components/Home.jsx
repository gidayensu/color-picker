import { useState } from "react";
import ColorPicker from "./color-pickers/ColorPicker.jsx";
import DragAndDrop from "./color-pickers/DragAndDrop.jsx";
import Tints from "./Tints-and-shades/Tints.jsx";
import Shades from "./Tints-and-shades/Shades.jsx";
import { useContext } from "react";
import { TintShadyContext } from "../store/tint-shady-context-provider.jsx";
import { LuCopy, LuCopyCheck } from "react-icons/lu";


export default function Home() {
  const {
    initialColor,    
    imageUploaded,
    colorDetails, 
    choosingColorHandler, 
    colorSelected, 
    tintShadePercentHandler, 
    colorChoice, 
    copyToClipBoardHandler, 
    } = useContext(TintShadyContext);


  
  return (
    <>
      
      <div className="flex justify-center items-center text-center">
        <p className="md:text-4xl w-[600px] m-8 text-2xl">
          <span className="font-bold text-teal-600"> Tints </span> and
          <span className="font-bold text-teal-700"> Shades </span> of a <span>Color </span>
        </p>
      </div>
      <div className="grid justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div>
        {!colorDetails.choosingColor && (
          <DragAndDrop />
        )}
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
              <input type="text" className={` ${colorDetails.wrongColor ? 'border-2 border-red-500' : 'border-2 border-teal-700'} mt-4 md:mt-0  h-12 w-52 rounded-lg p-5 tracking-widest`} defaultValue={colorDetails.color===initialColor ? "enter colour code" : colorDetails.color} placeholder="enter a colour code" onChange={(event)=>colorChoice(event.target.value)}/>
              {colorDetails.wrongColor && 
                <div className="md:-mt-[25px] mt-[95px] md:mr-0 mr-20  absolute flex flex-row"> 
                    <div className="w-1 h-5 bg-red-500">
                    </div>
                    <div className="flex items-center w-50 h-5 bg-red-200 text-[12px] text-red-500 font-bold tracking-wide p-2">
                      <p>enter a correct hex color code</p>
                    </div>
                </div>}
                <input placeholder="%" defaultValue={`${colorDetails.tintShadePercent}%`} className=" text-center text-sm mt-4 w-16 h-12 rounded-lg border-2 border-teal-700" type="number" onChange={(event)=>tintShadePercentHandler(event.target.value)}/>

                
                </div>
              <div className="hidden rounded-full w-12 h-12 shadow-sm" style={{
                backgroundColor: `${colorDetails.color}`
              }}>
                
              </div>
          </div>
        )}
        </div>
        
        </div>
        {colorDetails.choosingColor && (
          <ColorPicker/>
        )}
        {colorSelected() && (
          <div className="flex flex-col justify-center items-center">
          <h1 className="text-center font-bold text-4xl mt-4 mb-4">COLOR</h1>
        
        
          <span
            onClick={()=>copyToClipBoardHandler(colorDetails.color)}
            className="text-center p-8 rounded cursor-pointer w-32"
            style={{
              backgroundColor: `${colorDetails.color}`,
            }}
          >
            {colorDetails.color}
            {colorDetails.color === colorDetails.currentShadeOrTint ? <LuCopyCheck/> : <LuCopy/>}
          </span>
          </div>
        )}
        <Tints />
        <Shades/>
      </div>

    </>
  );
}

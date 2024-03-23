import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { HiOutlineEyeDropper } from "react-icons/hi2";
import Values from "values.js";
import { useContext } from "react";
import { TintShadyContext } from "../../store/tint-shady-context-provider";

export default function TintShadeGenerator( {typeOfVariation} ) {
  const {colorDetails, copyToClipBoardHandler, wrongColorHandler, colorChoice}  = useContext(TintShadyContext)
  let tints = []
  let shades = []

  
  
  try {
   tints = new Values(`${colorDetails.color}`).tints(colorDetails.tintShadePercent);
   shades = new Values(`${colorDetails.color}`).shades(colorDetails.tintShadePercent);
  
  } catch (error) {
      wrongColorHandler(true)
      
      return error;
  }
  const currentVariation = typeOfVariation === 'SHADES' ? shades : tints;
  const variationShade = typeOfVariation === 'SHADES';
  

  
  return (
    
      <div className="mb-4 w-[90vw] flex flex-col justify-center">
          <h1 className="text-4xl font-bold my-8 text-center">{typeOfVariation}</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {currentVariation.map((variation, index) => (
              <div key={index}>
                { 
                `#${variation.hex}` === colorDetails.currentShadeOrTint ? 
                <span className={`${variationShade ? 'bg-white text-black': 'bg-black text-white'} w-20 absolute mt-6 md:ml-7 ml-10 text-center text-sm`}>copied</span>: ''}
                
              <li className={`bg-gray-200  text-center h-64 ${variationShade ? 'text-white': 'text-black'}  text-[17px] flex flex-col gap-5 items-center justify-center p-8`}  style={{
                backgroundColor: `#${variation.hex}`
              }}>
                {
                <div className="flex flex-row flex-nowrap gap-4 text-2xl cursor-pointer">             
                    {`#${variation.hex}` === colorDetails.currentShadeOrTint ? 
                    
                    <div className="flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-10 w-10 h-10">
                    <LuCopyCheck /> 
                    </div>
                    : <div className="flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-10 w-10 h-10"> 
                      <LuCopy  onClick={()=>copyToClipBoardHandler(`#${variation.hex}`)}/> 
                      </div>
                      }
                    <div className="flex justify-center items-center rounded-full hover:bg-black hover:bg-opacity-10 w-10 h-10">
                    <HiOutlineEyeDropper onClick={()=>colorChoice(variation.hex)}/>
                    </div>
                </div>
                }

                <p className="cursor-pointer hover:bg-black hover:bg-opacity-10 w-20" onClick={()=>copyToClipBoardHandler(`#${variation.hex}`)}>{`#${variation.hex.toUpperCase()}`}</p>
              
              </li>
              </div>
              
            ))}
          </ul>
        </div>
  );
}

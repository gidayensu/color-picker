import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { HiOutlineEyeDropper } from "react-icons/hi2";
import Values from "values.js";
import { useContext } from "react";
import { TintShadyContext } from "../../store/tint-shady-context-provider";

export default function TintShadeGenerator( {typeOfVariation} ) {
  const {initialColor, color, currentShadeOrTint, tintShadePercent, copyToClipBoardHandler, wrongColorHandler, colorChoice}  = useContext(TintShadyContext)
  let tints = []
  let shades = []

  console.log(tintShadePercent)
  try {
   tints = new Values(`${color}`).tints(tintShadePercent);
   shades = new Values(`${color}`).shades(tintShadePercent);
  } catch (error) {
      wrongColorHandler(true)
      
      return error;
  }
    let currentVariation = null;
    let variationShade = false;

    
  if (typeOfVariation === 'SHADES') {
    currentVariation = shades
    variationShade = true;
  } else {
    currentVariation = tints;
  }
  

  
  return (
    <>
      
      <div className={`${color === initialColor ? 'animate-pulse': '' } mb-4`}>
          <h1 className="text-4xl font-bold my-8 text-center">{typeOfVariation}</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
            {currentVariation.map((variation, index) => (
              <div key={index}>
                {color!==initialColor && 
                `#${variation.hex}` === currentShadeOrTint ? 
                <span className={`${variationShade ? 'bg-white text-black': 'bg-black text-white'} w-20 absolute mt-6 md:ml-7 ml-10 text-center text-sm`}>copied</span>: ''}
                
              <li className={`bg-gray-200 text-center h-64 ${variationShade ? 'text-white': 'text-black'}  text-[17px] flex flex-col gap-5 items-center justify-center p-8`}  style={{
                backgroundColor: `#${variation.hex}`
              }}>
                {color !== initialColor && 
                <div className="flex flex-row flex-nowrap gap-4 text-2xl cursor-pointer">             
                    {`#${variation.hex}` === currentShadeOrTint ? <LuCopyCheck/> : <LuCopy  onClick={()=>copyToClipBoardHandler(`#${variation.hex}`)}/>}
                    <HiOutlineEyeDropper onClick={()=>colorChoice(variation.hex)}/>
                </div>
                }

                {<span >{color === initialColor? 'choose colour' : `#${variation.hex}`}</span>}
              
              </li>
              </div>
              
            ))}
          </ul>
        </div>
      
    </>
  );
}

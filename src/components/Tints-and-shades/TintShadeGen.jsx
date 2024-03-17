import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { HiOutlineEyeDropper } from "react-icons/hi2";
import Values from "values.js";
import { useContext } from "react";
import { TintShadyContext } from "../../store/tint-shady-context-provider";

export default function TintShadeGenerator( {typeOfVariation} ) {
  const {initialColor, color, shadeOrTint, copyColor, wrongColorHandler, colorChoice}  = useContext(TintShadyContext)
  let tints = []
  let shades = []
  try {
   tints = new Values(`${color}`).tints(8);
   shades = new Values(`${color}`).shades(8);
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
      
      <div className={`m-6 ${color === initialColor ? 'animate-pulse': '' } `}>
          <h1 className="text-4xl font-bold my-8 text-center">{typeOfVariation}</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {currentVariation.map((variation, index) => (
              <div key={index} className="flex items-center justify-center">
                {color!==initialColor && 
                `#${variation.hex}` === shadeOrTint ? 
                <span className={`${variationShade ? 'bg-white text-black': 'bg-black text-white'} w-20 absolute mb-24 rounded-full text-center text-sm`}>copied</span>: ''}
                
              <li className={`bg-gray-200 text-center rounded ${variationShade ? 'text-white': 'text-black'} cursor-pointer text-[17px] flex flex-col gap-5 items-center justify-center p-8`}  style={{
                backgroundColor: `#${variation.hex}`
              }}>
                {color !== initialColor && 
                <div className="flex flex-row flex-nowrap gap-4">             
                    {`#${variation.hex}` === shadeOrTint ? <LuCopyCheck/> : <LuCopy onClick={()=>copyColor(`#${variation.hex}`)}/>}
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

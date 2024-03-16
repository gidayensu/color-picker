import { LuCopy, LuCopyCheck } from "react-icons/lu";
import Values from "values.js";
import { useContext } from "react";
import { TintShadyContext } from "../../store/tint-shady-context-provider";

export default function TintShadeGenerator( {typeOfVariation} ) {
  const {initialColor, color, shadeOrTint, copyColor}  = useContext(TintShadyContext)
  const tints = new Values(`${color}`).tints(8);
  const shades = new Values(`${color}`).shades(8);
    let currentVariation = null;
    let variationShade = false;

    console.log(typeOfVariation)
  if (typeOfVariation === 'SHADES') {
    currentVariation = shades
    variationShade = true;
  } else {
    currentVariation = tints;
  }
  

  
  return (
    <>
      
      <div className={`m-6 ${color === '#ffff' ? 'animate-pulse': '' } `}>
          <h1 className="text-4xl font-bold my-8 text-center">{typeOfVariation}</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {currentVariation.map((variation, index) => (
              <div key={index} className="flex items-center justify-center">
                {color!=="#ffff" && `#${variation.hex}` === shadeOrTint ? <span className={`${variationShade ? 'bg-white text-black': 'bg-black text-white'} w-20 absolute mb-24 rounded-full text-center text-sm`}>copied</span>: ''}
                
              <li onClick={()=>copyColor(`#${variation.hex}`)} className={`bg-gray-200 text-center rounded ${variationShade ? 'text-white': 'text-black'} cursor-pointer text-[17px] flex flex-col gap-5 items-center justify-center p-8`}  style={{
                backgroundColor: `#${variation.hex}`
              }}>
                {color !== initialColor && <span>             
                {`#${variation.hex}` === shadeOrTint ? <LuCopyCheck/> : <LuCopy/>}
                </span>}
                {<span >{color === initialColor? 'choose colour' : `#${variation.hex}`}</span>}
              
              </li>
              </div>
              
            ))}
          </ul>
        </div>
      
    </>
  );
}

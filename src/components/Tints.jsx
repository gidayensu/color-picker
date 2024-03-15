
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import Values from "values.js";

export default function Tints({ color, currentTint, copyToClipBoardHandler }) {
  
  const tints = new Values(`${color}`).tints(8);
  
  return (
    <>
      
      <div className={`m-6 ${color === '#ffff' ? 'animate-pulse': '' } `}>
          <h1 className="text-4xl font-bold my-8 text-center">TINTS</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {tints.map((tint, index) => (
              <div key={index} className="flex items-center justify-center">
                {`#${tint.hex}` === currentTint ? <span className="bg-black w-20 absolute mb-24 rounded-full text-center text-white text-sm">copied</span>: ''}
                
              <li onClick={()=>copyToClipBoardHandler(`#${tint.hex}`)} className="bg-gray-200 text-center rounded text-black cursor-pointer text-[17px] flex flex-col gap-4 items-center justify-center p-10"  style={{
                backgroundColor: `#${tint.hex}`
              }}>
                {color !== '#ffff' && <span className="">             
                {`#${tint.hex}` === currentTint ? <LuCopyCheck/> : <LuCopy/>}
                </span>}
                {<span className="">{color === '#ffff'? 'choose colour' : `#${tint.hex}`}</span>}
              
              </li>
              </div>
              
            ))}
          </ul>
        </div>
      
    </>
  );
}

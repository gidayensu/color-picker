import { SketchPicker, SwatchesPicker } from 'react-color';
import { useContext } from 'react';
import { TintShadyContext } from '../../store/tint-shady-context-provider';

export default function ColorPicker () {
    const {color, colorChoice, choosingColorHandler} = useContext(TintShadyContext);
    
    return (
    <>  <div className="flex justify-center flex-col md:flex-row items-center gap-3 ">
            <SketchPicker 
                color = {color} 
                
                onChangeComplete={colorChoice} 
            />
           <div className='md:block hidden'>
            <SwatchesPicker 
                color = {color} 
                
                onChangeComplete={colorChoice} 
            />
            </div> 
            <button className="bg-teal-500 hover:bg-teal-700 h-10 w-20 text-white font-bold px-5 rounded mr-2 text-sm" onClick={choosingColorHandler}>
                Close
            </button>
        </div>
    </>
    );
}
